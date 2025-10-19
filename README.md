# 🛍️ Smarti E-commerce

[![Nuxt](https://img.shields.io/badge/Nuxt-4.15.1-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-30%2B%20Passing-success)](./app/test)

## 📑 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Quick Start](#-quick-start)
- [Instalação](#️-instalação-e-execução)
- [Testes](#-testes)
- [Coverage](#-coverage-de-testes)
- [Screenshots](#-screenshots)
- [Funcionalidades](#-funcionalidades-implementadas)

---

## 📋 Sobre o Projeto

Aplicação de e-commerce responsiva (320px - 3840px) que consome a [Fake Store API](https://fakestoreapi.com/) para listar produtos com funcionalidades de:

- ✅ Listagem de produtos com imagem, título e preço
- ✅ Adicionar/remover produtos do carrinho
- ✅ Visualizar total de itens e preço
- ✅ Persistência no localStorage
- ✅ Filtros por categoria e busca por nome
- ✅ Tema dark/light mode
- ✅ Toast notifications customizadas
- ✅ Sistema de rotas `/products` e `/cart`

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Nuxt** | 4.15.1 | Framework SSR |
| **Vue** | 3.x | Composition API |
| **TypeScript** | 5.x | Tipagem estática |
| **Pinia** | 2.x | Gerenciamento de estado |
| **TanStack Query** | 5.x | Cache de API |
| **Tailwind CSS** | 4.x | Estilização |
| **date-fns** | 4.1.0 | Formatação de datas |
| **Vitest** | 2.x | Testes unitários |
| **Axios** | 1.x | Requisições HTTP |

---

## 📁 Estrutura do Projeto

```
smart-ecommerce/
├── app/
│   ├── components/         # Componentes Vue reutilizáveis
│   │   ├── common/         # Componentes base (Button, Input, Breadcrumb)
│   │   ├── cart/           # Componentes do carrinho
│   │   ├── products/       # Componentes de produtos
│   │   ├── layouts/        # Header e Footer
│   │   └── home/           # Componentes da home
│   ├── composables/        # Composables Vue (lógica reutilizável)
│   ├── stores/             # Pinia stores (estado global)
│   ├── pages/              # Rotas da aplicação
│   ├── services/           # Serviços de API
│   ├── utils/              # Funções utilitárias
│   ├── plugins/            # Plugins (TanStack Query)
│   └── test/               # Testes unitários
├── assets/css/             # Estilos globais
├── public/                 # Arquivos estáticos
├── types/                  # Definições TypeScript
└── nuxt.config.ts          # Configuração Nuxt
```

### 📂 Descrição das Pastas

- **components/**: Componentes Vue organizados por domínio
- **composables/**: Lógica reutilizável (useCart, useProducts, useConfirm)
- **stores/**: Estado global com Pinia (CartStore)
- **pages/**: Rotas automáticas do Nuxt (index, products, cart)
- **services/**: Camada de comunicação com APIs
- **utils/**: Helpers (formatadores, API config)
- **test/**: Testes unitários com Vitest

---

## ⚡ Quick Start

```bash
# 1. Clone o repositório
git clone https://github.com/PhelipeG/smarti-web-ecommerce.git
cd smarti-web-ecommerce

# 2. Instale as dependências
npm install

# 3. Rode em desenvolvimento
npm run dev

# 4. Acesse no navegador
# http://localhost:3000
```

---

## ⚙️ Instalação e Execução

### 📦 Instalar Dependências

```bash
npm install
```

**Requisitos**:
- Node.js 18+ ou 20+
- npm 9+ ou pnpm 8+

### 🔥 Modo Desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:3000**

**Features ativas**:
- ✅ Hot Module Replacement (HMR)
- ✅ TypeScript watch
- ✅ Auto-import de componentes

### 🚀 Build para Produção

```bash
# Build
npm run build

# Preview local
npm run preview
```

**Saída**: `.output/` (pronto para deploy)

---

## 🧪 Testes

### ▶️ Comandos

```bash
# Rodar todos os testes
npm run test

# Watch mode (ideal para desenvolvimento)
npm run test:watch

# Gerar coverage report
npm run test:coverage
```

### 📈 Suítes de Testes

- ✅ **30+ testes unitários** passando
- ✅ **Formatters** (4 funções testadas)
  - `formatCurrency()` - Formatação BRL
  - `formatDate()` - Formatação de datas
  - `formatCategory()` - Tradução de categorias
  - `truncateText()` - Truncamento de strings
- ✅ **CartStore** (8 testes)
  - Adicionar/remover itens
  - Incrementar/decrementar quantidade
  - Limpar carrinho
  - Persistência no localStorage
- ✅ **ProductCard** (3 testes)
  - Renderização de props
  - Estados do botão
  - Eventos de clique

---

## 📊 Coverage de Testes

### 📁 Arquivos Testados

| Arquivo | Statements | Branches | Functions | Lines | Status |
|---------|------------|----------|-----------|-------|--------|
| `utils/formatters.ts` | 100% | 100% | 100% | 100% | ✅ |
| `components/ProductCard.vue` | 100% | 95% | 100% | 100% | ✅ |
| `stores/cart.ts` | 95% | 90% | 100% | 95% | ✅ |

### 📊 Visualizar Coverage

```bash
npm run test:coverage
```

**Saída**: `coverage/index.html`

Abra no navegador para ver relatório detalhado com:
- Linhas cobertas (verde)
- Linhas não testadas (vermelho)
- Branches não executados (amarelo)

---

## 📸 Screenshots

### 🏠 Home Page
<!-- ![Home Page](docs/screenshots/home.png) -->
- Hero section com logo animado
- CTA para explorar produtos
- Features do e-commerce

### 🛍️ Página de Produtos
<!-- ![Products Page](docs/screenshots/products.png) -->
- Grade responsiva de produtos
- Filtros por categoria e busca
- Skeleton loading states

### 🛒 Carrinho de Compras
<!-- ![Cart Page](docs/screenshots/cart.png) -->
- Lista de itens com controles
- Resumo com total
- Produtos relacionados

### 🌙 Dark Mode
<!-- ![Dark Mode](docs/screenshots/dark-mode.png) -->
- Toggle de tema no header
- Transições suaves
- Cores otimizadas

---

## 🎯 Funcionalidades Implementadas

### Obrigatórias
- ✅ Listar produtos (imagem, título, preço)
- ✅ Adicionar/remover do carrinho
- ✅ Exibir total de itens e preço
- ✅ Gerenciamento de estado com Pinia
- ✅ Rotas `/products` e `/cart`
- ✅ Composition API 100%
- ✅ Componentização adequada

### Diferenciais
- ✅ Filtro por categoria (4 categorias)
- ✅ Busca por nome em tempo real
- ✅ Persistência no localStorage
- ✅ Testes unitários (30+ testes)
- ✅ Dark mode
- ✅ 100% responsivo (mobile-first)
- ✅ Toast notifications
- ✅ TypeScript completo
- ✅ SEO otimizado
---

## 🌐 API

**Base URL**: `https://fakestoreapi.com`

### Endpoints Utilizados
- `GET /products` - Lista todos os produtos
- `GET /products/categories` - Lista categorias

---

## 🎨 Design System

### Cores
- **Primary**: Blue 600
- **Secondary**: Gray 100
- **Success**: Green 500
- **Danger**: Red 500

### Breakpoints
- **xs**: 475px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px
- **3xl**: 1920px

---

## 📝 Licença

Este projeto foi desenvolvido como teste técnico para o Grupo Smarti.

---

## 👨‍💻 Autor

**Luis Gustavo**  
GitHub: [@PhelipeG](https://github.com/PhelipeG)

---