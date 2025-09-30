// Local: src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Pega a URL e a Chave do arquivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Cria e exporta o cliente Supabase para ser usado no resto do projeto
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// (Opcional, mas recomendado) Define o tipo de dados para um "Lead"
// Isso ajuda a evitar erros de digitação no futuro
export interface Lead {
  id?: string
  nome: string
  email: string
  telefone?: string
  tipo_veiculo?: string
  modelo?: string
  ano?: string
  created_at?: string
}