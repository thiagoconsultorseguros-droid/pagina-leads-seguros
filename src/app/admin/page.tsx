"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, Users, Car, Bike, Mail, Phone, Calendar, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Lead {
  id: string
  nome: string
  email: string
  telefone: string
  tipo_veiculo: 'carro' | 'moto'
  modelo?: string
  ano?: number
  created_at: string
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const { data, error: supabaseError } = await supabase
        .from('leads_seguros')
        .select('*')
        .order('created_at', { ascending: false })

      if (supabaseError) {
        throw new Error('Erro ao carregar leads')
      }

      setLeads(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  const getVehicleIcon = (tipo: string) => {
    return tipo === 'carro' ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />
  }

  const stats = {
    total: leads.length,
    carros: leads.filter(lead => lead.tipo_veiculo === 'carro').length,
    motos: leads.filter(lead => lead.tipo_veiculo === 'moto').length,
    hoje: leads.filter(lead => {
      const today = new Date().toDateString()
      const leadDate = new Date(lead.created_at).toDateString()
      return today === leadDate
    }).length
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Painel de Leads</h1>
                <p className="text-gray-600">Gerencie os leads capturados na página de seguros</p>
              </div>
            </div>
            <Button onClick={fetchLeads} disabled={loading} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Leads</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Leads Hoje</p>
                  <p className="text-3xl font-bold text-green-600">{stats.hoje}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Carros</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.carros}</p>
                </div>
                <Car className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Motos</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.motos}</p>
                </div>
                <Bike className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Leads Recentes</CardTitle>
            <CardDescription>
              Lista de todos os leads capturados, ordenados por data
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Carregando leads...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchLeads} variant="outline">
                  Tentar Novamente
                </Button>
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum lead encontrado ainda.</p>
                <p className="text-sm text-gray-500">Os leads aparecerão aqui quando forem capturados.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{lead.nome}</h3>
                          <Badge variant={lead.tipo_veiculo === 'carro' ? 'default' : 'secondary'}>
                            {getVehicleIcon(lead.tipo_veiculo)}
                            <span className="ml-1 capitalize">{lead.tipo_veiculo}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>{lead.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{lead.telefone}</span>
                          </div>
                          {lead.modelo && (
                            <div className="flex items-center space-x-2">
                              {getVehicleIcon(lead.tipo_veiculo)}
                              <span>
                                {lead.modelo} {lead.ano && `(${lead.ano})`}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(lead.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instruções */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Como acessar seus leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• <strong>Página principal:</strong> Acesse / para ver o formulário de captação</p>
              <p>• <strong>Painel admin:</strong> Acesse /admin para ver esta página de leads</p>
              <p>• <strong>Banco de dados:</strong> Os leads são salvos na tabela 'leads_seguros' do Supabase</p>
              <p>• <strong>Atualização:</strong> Use o botão "Atualizar" para carregar novos leads</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}