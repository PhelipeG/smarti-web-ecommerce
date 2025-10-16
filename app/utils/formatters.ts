import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Formata valores monetários para BRL
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
/**
 * Formata datas usando date-fns
 */
export const formatDate = (date: Date | string, pattern: string = 'dd/MM/yyyy HH:mm'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, pattern, { locale: ptBR })
}
/**
 * Converte categoria para exibição em português
 */
export const formatCategory = (category: string): string => {
  const categories: Record<string, string> = {
    'electronics': 'Eletrônicos',
    'jewelery': 'Joias',
    "men's clothing": 'Moda Masculina',
    "women's clothing": 'Moda Feminina',
    'all': 'Todos'
  }
  return categories[category] || category
}