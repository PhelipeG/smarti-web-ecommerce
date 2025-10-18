import { format, } from 'date-fns'
import { ptBR, } from 'date-fns/locale'

/**
 * Formata valores monetários para BRL
 * @param value - Valor numérico a ser formatado
 * @returns String formatada em Real Brasileiro (R$)
 * @example formatCurrency(1234.56) // "R$ 1.234,56"
 */
export const formatCurrency = (value: number,): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  },).format(value,)
}

/**
 * Formata datas usando date-fns
 * @param date - Data a ser formatada (Date ou string)
 * @param pattern - Padrão de formatação (default: 'dd/MM/yyyy HH:mm')
 * @returns String formatada segundo o padrão especificado
 * @example formatDate(new Date(), 'dd/MM/yyyy') // "18/10/2025"
 */
export const formatDate = (date: Date | string, pattern: string = 'dd/MM/yyyy HH:mm',): string => {
  const dateObj = typeof date === 'string' ? new Date(date,) : date
  return format(dateObj, pattern, { locale: ptBR, },)
}

/**
 * Converte categoria para exibição em português
 * @param category - Slug da categoria em inglês
 * @returns Nome da categoria em português
 * @example formatCategory('electronics') // "Eletrônicos"
 */
export const formatCategory = (category: string,): string => {
  const categories: Record<string, string> = {
    'electronics': 'Eletrônicos',
    'jewelery': 'Joias',
    'men\'s clothing': 'Moda Masculina',
    'women\'s clothing': 'Moda Feminina',
    'all': 'Todos',
  }
  return categories[category] || category
}

/**
 * Trunca texto com reticências
 * @param text - Texto a ser truncado
 * @param maxLength - Comprimento máximo (default: 100)
 * @returns Texto truncado com "..." se exceder o limite
 * @example truncateText('Lorem ipsum dolor sit amet', 10) // "Lorem ipsu..."
 */
export const truncateText = (text: string, maxLength: number = 100,): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength,).trim() + '...'
}
