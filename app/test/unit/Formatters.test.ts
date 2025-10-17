import { describe, expect, it, } from 'vitest'
import { formatCurrency, formatCategory, truncateText, formatDate, } from '~/utils/formatters'

describe('Formatters Utility', () => {
  describe('formatCurrency', () => {
    it('deve formatar o preço corretamente', () => {
      expect(formatCurrency(99.99,),).toBe('R$\u00A099,99',)
    },)

    it('deve lidar com valores negativos', () => {
      const result = formatCurrency(-50,)
      expect(result,).toBe('-R$\u00A050,00',)
    },)

    it('deve lidar com valores grandes', () => {
      const result = formatCurrency(1000000,)
      expect(result,).toBe('R$\u00A01.000.000,00',)
    },)

    it('deve formatar valores decimais pequenos', () => {
      expect(formatCurrency(0.99,),).toBe('R$\u00A00,99',)
    },)

    it('deve formatar milhões', () => {
      expect(formatCurrency(1234567.89,),).toBe('R$\u00A01.234.567,89',)
    },)

    it('deve formatar zero', () => {
      expect(formatCurrency(0,),).toBe('R$\u00A00,00',)
    },)

    it('deve formatar valores inteiros', () => {
      expect(formatCurrency(100,),).toBe('R$\u00A0100,00',)
    },)

    it('deve formatar centavos', () => {
      expect(formatCurrency(0.01,),).toBe('R$\u00A00,01',)
    },)

    it('deve formatar valores com três casas decimais arredondando', () => {
      expect(formatCurrency(10.999,),).toBe('R$\u00A011,00',)
    },)

    it('deve lidar com números muito pequenos', () => {
      expect(formatCurrency(0.001,),).toBe('R$\u00A00,00',)
    },)
  },)

  describe('formatCategory', () => {
    it('deve formatar categoria electronics', () => {
      expect(formatCategory('electronics',),).toBe('Eletrônicos',)
    },)

    it('deve formatar categoria jewelery', () => {
      expect(formatCategory('jewelery',),).toBe('Joias',)
    },)

    it('deve formatar categoria men\'s clothing', () => {
      expect(formatCategory('men\'s clothing',),).toBe('Moda Masculina',)
    },)

    it('deve formatar categoria women\'s clothing', () => {
      expect(formatCategory('women\'s clothing',),).toBe('Moda Feminina',)
    },)

    it('deve retornar "Todos" para "all"', () => {
      expect(formatCategory('all',),).toBe('Todos',)
    },)

    it('deve retornar categoria original se não encontrar tradução', () => {
      expect(formatCategory('unknown',),).toBe('unknown',)
    },)

    it('deve ser case-sensitive', () => {
      expect(formatCategory('Electronics',),).toBe('Electronics',)
    },)

    it('deve lidar com strings vazias', () => {
      expect(formatCategory('',),).toBe('',)
    },)
  },)

  describe('truncateText', () => {
    it('deve truncar texto longo', () => {
      const longText = 'Esta é uma descrição muito longa do produto que precisa ser truncada para caber no layout do componente'
      const result = truncateText(longText, 50,)
      expect(result,).toBe('Esta é uma descrição muito longa do produto que pr...',)
      expect(result.length,).toBeLessThanOrEqual(53,) // 50 + '...'
    },)

    it('deve retornar texto completo se menor que o limite', () => {
      const shortText = 'Texto curto'
      expect(truncateText(shortText, 50,),).toBe('Texto curto',)
    },)

    it('deve usar limite padrão de 100 caracteres', () => {
      const text = 'A'.repeat(150,)
      const result = truncateText(text,)
      expect(result,).toBe('A'.repeat(100,) + '...',)
    },)

    it('deve remover espaços em branco no final', () => {
      const text = 'Este texto tem espaços no final    '
      const result = truncateText(text, 30,)
      expect(result,).toBe('Este texto tem espaços no fina...',)
    },)

    it('deve lidar com texto vazio', () => {
      expect(truncateText('',),).toBe('',)
    },)

    it('deve truncar exatamente no limite', () => {
      const text = 'A'.repeat(50,)
      expect(truncateText(text, 50,),).toBe(text,)
    },)

    it('deve adicionar reticências apenas quando necessário', () => {
      const text = 'Texto de 20 chars!  '
      const result = truncateText(text, 100,)
      expect(result,).not.toContain('...',)
    },)

    it('deve lidar com caracteres especiais', () => {
      const text = 'Texto com àçéntos e çaractéres èspëciais!' + 'x'.repeat(100,)
      const result = truncateText(text, 50,)
      expect(result,).toContain('...',)
      expect(result.length,).toBe(53,)
    },)

    it('deve truncar palavras longas sem espaços', () => {
      const text = 'A'.repeat(200,)
      const result = truncateText(text, 50,)
      expect(result,).toBe('A'.repeat(50,) + '...',)
    },)
  },)

  describe('formatDate', () => {
    it('deve formatar data com padrão padrão', () => {
      const date = new Date('2024-01-15T10:30:00',)
      const result = formatDate(date,)
      expect(result,).toBe('15/01/2024 10:30',)
    },)

    it('deve formatar data com padrão customizado', () => {
      const date = new Date('2024-01-15T10:30:00',)
      const result = formatDate(date, 'dd/MM/yyyy',)
      expect(result,).toBe('15/01/2024',)
    },)

    it('deve formatar string de data', () => {
      const result = formatDate('2024-01-15T10:30:00',)
      expect(result,).toBe('15/01/2024 10:30',)
    },)

    it('deve formatar apenas hora', () => {
      const date = new Date('2024-01-15T10:30:00',)
      const result = formatDate(date, 'HH:mm',)
      expect(result,).toBe('10:30',)
    },)

    it('deve formatar data com ano completo', () => {
      const date = new Date('2024-12-31T23:59:59',)
      const result = formatDate(date, 'yyyy-MM-dd',)
      expect(result,).toBe('2024-12-31',)
    },)

    it('deve formatar data no formato ISO', () => {
      const date = new Date('2024-06-15T14:30:00',)
      const result = formatDate(date, 'yyyy-MM-dd HH:mm:ss',)
      expect(result,).toBe('2024-06-15 14:30:00',)
    },)

    it('deve formatar dia da semana por extenso', () => {
      const date = new Date('2024-01-15T10:30:00',)
      const result = formatDate(date, 'EEEE, dd/MM/yyyy',)
      expect(result,).toContain('2024',)
    },)

    it('deve lidar com timestamps', () => {
      const timestamp = new Date('2024-01-01T00:00:00',).getTime()
      const result = formatDate(new Date(timestamp,), 'dd/MM/yyyy',)
      expect(result,).toBe('01/01/2024',)
    },)
  },)
},)
