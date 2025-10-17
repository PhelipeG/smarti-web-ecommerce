import {
  dehydrate,
  hydrate,
  QueryClient,
  VueQueryPlugin,
  type DehydratedState,
  type VueQueryPluginOptions,
} from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxt,) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query',)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 10, // 10 minutos (cacheTime no v4)
        refetchOnWindowFocus: false,
        retry: 1, // Tenta 1 vez em caso de falha
      },
    },
  },)
  const options: VueQueryPluginOptions = { queryClient, }

  nuxt.vueApp.use(VueQueryPlugin, options,)

  // Desidratar estado no server
  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient,)
    },)
  }
  // Hidratar estado no client
  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value,)
  }
},)
