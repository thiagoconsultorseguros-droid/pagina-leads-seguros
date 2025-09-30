"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Car, Bike, Phone, Mail, User, CheckCircle, Clock, Award, Users, AlertCircle } from 'lucide-react'

export default function LeadCapturePage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoVeiculo: '',
    modelo: '',
    ano: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpar erro quando usuário começar a digitar
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      // Simular salvamento (substitua pela integração real com banco de dados)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Log dos dados para demonstração
      console.log('Lead capturado:', {
        nome: formData.nome.trim(),
        email: formData.email.trim().toLowerCase(),
        telefone: formData.telefone.trim(),
        tipo_veiculo: formData.tipoVeiculo,
        modelo: formData.modelo.trim() || null,
        ano: formData.ano ? parseInt(formData.ano) : null,
        timestamp: new Date().toISOString()
      })

      setIsSubmitted(true)
      
    } catch (err) {
      console.error('Erro:', err)
      setError('Erro ao processar sua solicitação. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Obrigado!</h2>
            <p className="text-gray-600 mb-4">
              Recebemos seus dados com sucesso! Nossa equipe entrará em contato em até 30 minutos com as melhores cotações para seu {formData.tipoVeiculo}.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                <strong>Próximos passos:</strong><br />
                • Análise do seu perfil<br />
                • Cotação com múltiplas seguradoras<br />
                • Contato via WhatsApp ou telefone
              </p>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  nome: '',
                  email: '',
                  telefone: '',
                  tipoVeiculo: '',
                  modelo: '',
                  ano: ''
                })
              }}
              className="w-full"
            >
              Fazer Nova Cotação
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">SeguroFácil</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>contato@segurofacil.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
                ⚡ Cotação em 2 minutos
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Seguro Auto e Moto com até{' '}
                <span className="text-blue-600">40% de desconto</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Compare preços das melhores seguradoras do Brasil e encontre a proteção ideal para seu veículo. Rápido, fácil e sem compromisso.
              </p>
            </div>

            {/* Benefícios */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cotação Rápida</h3>
                  <p className="text-gray-600 text-sm">Resultado em até 2 minutos</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Melhores Preços</h3>
                  <p className="text-gray-600 text-sm">Até 40% de economia</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">100% Seguro</h3>
                  <p className="text-gray-600 text-sm">Dados protegidos</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">+50mil Clientes</h3>
                  <p className="text-gray-600 text-sm">Satisfeitos conosco</p>
                </div>
              </div>
            </div>

            {/* Seguradoras */}
            <div>
              <p className="text-sm text-gray-500 mb-4">Trabalhamos com as principais seguradoras:</p>
              <div className="flex flex-wrap gap-4 items-center">
                <Badge variant="outline" className="px-3 py-1">Porto Seguro</Badge>
                <Badge variant="outline" className="px-3 py-1">Bradesco</Badge>
                <Badge variant="outline" className="px-3 py-1">SulAmérica</Badge>
                <Badge variant="outline" className="px-3 py-1">Allianz</Badge>
                <Badge variant="outline" className="px-3 py-1">Azul Seguros</Badge>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="lg:pl-8">
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold">Cotação Gratuita</CardTitle>
                <CardDescription className="text-blue-100">
                  Preencha os dados e receba sua cotação em minutos
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                      Nome Completo *
                    </Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="nome"
                        name="nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Seu nome completo"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-mail *
                    </Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="seu@email.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                      Telefone/WhatsApp *
                    </Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        required
                        value={formData.telefone}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="(11) 99999-9999"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tipoVeiculo" className="text-sm font-medium text-gray-700">
                      Tipo de Veículo *
                    </Label>
                    <div className="relative mt-1">
                      <select
                        id="tipoVeiculo"
                        name="tipoVeiculo"
                        required
                        value={formData.tipoVeiculo}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Selecione o tipo</option>
                        <option value="carro">🚗 Carro</option>
                        <option value="moto">🏍️ Moto</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="modelo" className="text-sm font-medium text-gray-700">
                        Modelo
                      </Label>
                      <Input
                        id="modelo"
                        name="modelo"
                        type="text"
                        value={formData.modelo}
                        onChange={handleInputChange}
                        placeholder="Ex: Civic"
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ano" className="text-sm font-medium text-gray-700">
                        Ano
                      </Label>
                      <Input
                        id="ano"
                        name="ano"
                        type="number"
                        value={formData.ano}
                        onChange={handleInputChange}
                        placeholder="2020"
                        min="1990"
                        max="2024"
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processando...</span>
                      </div>
                    ) : (
                      'Receber Cotação Gratuita'
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Seus dados estão seguros e protegidos. Não enviamos spam.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Urgência */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <p className="text-sm font-medium text-yellow-800">
                  ⚡ Oferta limitada! Desconto especial válido apenas hoje.
                </p>
              </div>
            </div>

            {/* Aviso sobre banco de dados */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Demonstração Ativa
                  </p>
                  <p className="text-xs text-blue-700">
                    Para salvar leads reais, conecte seu banco Supabase nas configurações do projeto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold">SeguroFácil</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 SeguroFácil. Todos os direitos reservados. | Proteção de dados garantida
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}