import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verificar se as variáveis de ambiente estão disponíveis
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Some features may not work.')
}

// Criar cliente apenas se as variáveis estiverem disponíveis
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

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