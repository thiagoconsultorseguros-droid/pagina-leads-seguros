import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Lead {
  id?: string
  nome: string
  email: string
  telefone: string
  tipo_veiculo: string
  modelo?: string
  ano?: string
  created_at?: string
}