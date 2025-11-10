import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Content } from '../types';

interface ContentState {
  watchlist: number[];
  viewingHistory: Map<number, number>;
  loading: boolean;
  error: string | null;
  addToWatchlist: (contentId: number) => Promise<void>;
  removeFromWatchlist: (contentId: number) => Promise<void>;
  updateViewingProgress: (contentId: number, progress: number) => Promise<void>;
  fetchUserData: (profileId: string) => Promise<void>;
}

export const useContentStore = create<ContentState>((set, get) => ({
  watchlist: [],
  viewingHistory: new Map(),
  loading: false,
  error: null,
  addToWatchlist: async (contentId: number) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('watchlist')
        .insert([{ content_id: contentId }]);
      
      if (error) throw error;
      set((state) => ({ watchlist: [...state.watchlist, contentId] }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  removeFromWatchlist: async (contentId: number) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('content_id', contentId);
      
      if (error) throw error;
      set((state) => ({
        watchlist: state.watchlist.filter((id) => id !== contentId),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  updateViewingProgress: async (contentId: number, progress: number) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('viewing_history')
        .upsert([{ content_id: contentId, progress }]);
      
      if (error) throw error;
      set((state) => ({
        viewingHistory: new Map(state.viewingHistory.set(contentId, progress)),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  fetchUserData: async (profileId: string) => {
    set({ loading: true, error: null });
    try {
      // Fetch watchlist
      const { data: watchlistData, error: watchlistError } = await supabase
        .from('watchlist')
        .select('content_id')
        .eq('profile_id', profileId);
      
      if (watchlistError) throw watchlistError;
      
      // Fetch viewing history
      const { data: historyData, error: historyError } = await supabase
        .from('viewing_history')
        .select('content_id, progress')
        .eq('profile_id', profileId);
      
      if (historyError) throw historyError;
      
      const watchlist = watchlistData.map((item) => item.content_id);
      const viewingHistory = new Map(
        historyData.map((item) => [item.content_id, item.progress])
      );
      
      set({ watchlist, viewingHistory });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));