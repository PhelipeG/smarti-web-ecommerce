import { describe, it, expect, beforeEach, vi, } from 'vitest'
import { mount, } from '@vue/test-utils'
import { setActivePinia, createPinia, } from 'pinia'
import type { Product, } from '~/types'

// Mock do produto
const mockProduct: Product = {
  id: 1,
  title: 'Produto de Teste',
  price: 99.99,
  description: 'Esta é uma descrição do produto de teste para validar o componente',
  category: 'electronics',
  image: 'https://via.placeholder.com/150',
  rating: {
    rate: 4.5,
    count: 100,
  },
}

// Mock dos composables
vi.mock('~/composables/useCart', () => ({
  useCart: () => ({
    addToCart: vi.fn(),
    isInCart: vi.fn(() => false,),
  }),
}),)

vi.mock('~/utils/formatters', () => ({
  formatCurrency: (value: number,) => `R$ ${value.toFixed(2,)}`,
  formatCategory: (category: string,) => category,
}),)

describe('ProductCard Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia(),)
  },)

  it('deve renderizar o componente', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    },)

    expect(wrapper.exists(),).toBe(true,)
  },)

  it('deve exibir informações do produto', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    },)

    expect(wrapper.text(),).toContain(mockProduct.title,)
    expect(wrapper.text(),).toContain('R$ 99.99',)
    expect(wrapper.text(),).toContain(mockProduct.rating.rate.toString(),)
  },)

  it('deve exibir imagem do produto', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    },)

    const img = wrapper.find('img',)
    expect(img.exists(),).toBe(true,)
    expect(img.attributes('src',),).toBe(mockProduct.image,)
    expect(img.attributes('alt',),).toBe(mockProduct.title,)
  },)

  it('deve exibir categoria do produto', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    },)

    expect(wrapper.text(),).toContain(mockProduct.category,)
  },)

  it('deve exibir rating do produto', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    },)

    expect(wrapper.text(),).toContain('4.5',)
    expect(wrapper.text(),).toContain('100',)
  },)

  it('deve ter botão de adicionar ao carrinho', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    },)

    const button = wrapper.find('button',)
    expect(button.exists(),).toBe(true,)
    expect(button.text(),).toContain('Adicionar',)
  },)

  it('deve aplicar classes corretas de estilo', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    },)

    expect(wrapper.classes(),).toContain('bg-white',)
    expect(wrapper.classes(),).toContain('rounded-xl',)
  },)

  it('deve exibir descrição truncada do produto', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
      },
    },)

    const description = wrapper.find('.line-clamp-2',)
    expect(description.exists(),).toBe(true,)
    expect(description.text(),).toContain(mockProduct.description,)
  },)
},)
