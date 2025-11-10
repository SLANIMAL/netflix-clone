import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  avatar_url: string;
  created_at: string;
}

interface ProfileState {
  profiles: Profile[];
  selectedProfile: Profile | null;
  loading: boolean;
  error: string | null;
  fetchProfiles: () => Promise<void>;
  createProfile: (name: string, avatar_url: string) => Promise<void>;
  updateProfile: (id: string, updates: Partial<Profile>) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
  selectProfile: (profile: Profile | null) => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profiles: [],
  selectedProfile: null,
  loading: false,
  error: null,
  fetchProfiles: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at');
      
      if (error) throw error;
      set({ profiles: data as Profile[] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  createProfile: async (name: string, avatar_url: string) => {
    set({ loading: true, error: null });
    try {
      const user = useAuthStore.getState().user;
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .insert([{ name, avatar_url, user_id: user.id }])
        .select()
        .single();
      
      if (error) throw error;
      set((state) => ({ profiles: [...state.profiles, data as Profile] }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateProfile: async (id: string, updates: Partial<Profile>) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      set((state) => ({
        profiles: state.profiles.map((p) => (p.id === id ? { ...p, ...data } : p)),
        selectedProfile: state.selectedProfile?.id === id ? { ...state.selectedProfile, ...data } : state.selectedProfile,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteProfile: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      set((state) => ({
        profiles: state.profiles.filter((p) => p.id !== id),
        selectedProfile: state.selectedProfile?.id === id ? null : state.selectedProfile,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  selectProfile: (profile) => {
    set({ selectedProfile: profile });
  },
}));