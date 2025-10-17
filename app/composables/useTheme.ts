type Theme = 'light' | 'dark'

const STORAGE_KEY = 'smarti-theme'

export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'light',)

  const setTheme = (newTheme: Theme,) => {
    theme.value = newTheme

    // Atualizar localStorage
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, newTheme,)

      // Atualizar DOM
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark',)
      }
      else {
        document.documentElement.classList.remove('dark',)
      }
    }
  }

  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme,)
  }

  const initTheme = () => {
    if (!import.meta.client) return

    // Tentar carregar do localStorage
    const savedTheme = localStorage.getItem(STORAGE_KEY,) as Theme | null

    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme,)
      return
    }

    // Detectar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)',).matches
    setTheme(prefersDark ? 'dark' : 'light',)
  }

  const isDark = computed(() => theme.value === 'dark',)

  return {
    theme: readonly(theme,),
    isDark,
    setTheme,
    toggleTheme,
    initTheme,
  }
}
