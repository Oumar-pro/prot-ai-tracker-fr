export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      food_analyses: {
        Row: {
          allergies: string[] | null
          calories: number | null
          carbs: number | null
          confidence: number | null
          created_at: string
          fats: number | null
          fiber: number | null
          health_score: number | null
          id: string
          image_url: string | null
          ingredients: string[] | null
          name: string
          portion_size: string | null
          portion_weight: number | null
          proteins: number | null
          recommendations: string[] | null
          sugar: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          allergies?: string[] | null
          calories?: number | null
          carbs?: number | null
          confidence?: number | null
          created_at?: string
          fats?: number | null
          fiber?: number | null
          health_score?: number | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          name: string
          portion_size?: string | null
          portion_weight?: number | null
          proteins?: number | null
          recommendations?: string[] | null
          sugar?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          allergies?: string[] | null
          calories?: number | null
          carbs?: number | null
          confidence?: number | null
          created_at?: string
          fats?: number | null
          fiber?: number | null
          health_score?: number | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          name?: string
          portion_size?: string | null
          portion_weight?: number | null
          proteins?: number | null
          recommendations?: string[] | null
          sugar?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          accomplishments: string[] | null
          birth_date: Json | null
          created_at: string
          desired_weight: number | null
          diet: string | null
          exercise_frequency: string | null
          gender: string | null
          goal: string | null
          goal_speed: number | null
          has_app_experience: boolean | null
          height: number | null
          height_unit: string | null
          id: string
          obstacles: string[] | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          accomplishments?: string[] | null
          birth_date?: Json | null
          created_at?: string
          desired_weight?: number | null
          diet?: string | null
          exercise_frequency?: string | null
          gender?: string | null
          goal?: string | null
          goal_speed?: number | null
          has_app_experience?: boolean | null
          height?: number | null
          height_unit?: string | null
          id?: string
          obstacles?: string[] | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          accomplishments?: string[] | null
          birth_date?: Json | null
          created_at?: string
          desired_weight?: number | null
          diet?: string | null
          exercise_frequency?: string | null
          gender?: string | null
          goal?: string | null
          goal_speed?: number | null
          has_app_experience?: boolean | null
          height?: number | null
          height_unit?: string | null
          id?: string
          obstacles?: string[] | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
