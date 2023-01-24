export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      exercises: {
        Row: {
          description: string | null
          id: number
          image: string | null
          muscle: string | null
          muscleId: number | null
          name: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          image?: string | null
          muscle?: string | null
          muscleId?: number | null
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          image?: string | null
          muscle?: string | null
          muscleId?: number | null
          name?: string | null
        }
      }
      muscles: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
      }
      profiles: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          roles: string[]
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          roles?: string[]
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          roles?: string[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
