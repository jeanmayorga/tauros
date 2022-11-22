export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      exercises: {
        Row: {
          id: number;
          name: string | null;
          description: string | null;
          image: string | null;
          muscle: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
          description?: string | null;
          image?: string | null;
          muscle?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
          description?: string | null;
          image?: string | null;
          muscle?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          first_name: string | null;
          last_name: string | null;
          email: string | null;
          phone: string | null;
          roles: string[];
        };
        Insert: {
          id: string;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          roles?: string[];
        };
        Update: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          roles?: string[];
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
