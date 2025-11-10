export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          avatar_url: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          name: string
          avatar_url?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          avatar_url?: string
          created_at?: string
        }
      }
      watchlist: {
        Row: {
          id: string
          profile_id: string
          content_id: number
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          content_id: number
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          content_id?: number
          created_at?: string
        }
      }
      viewing_history: {
        Row: {
          id: string
          profile_id: string
          content_id: number
          progress: number
          last_watched: string
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          content_id: number
          progress?: number
          last_watched?: string
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          content_id?: number
          progress?: number
          last_watched?: string
          created_at?: string
        }
      }
    }
  }
}