import { ref, computed } from 'vue'
import type { CartItem, } from '../../types'
// Assuming these API functions will be provided by app/utils/api.ts
import { fetchUserOrdersApi, placeOrderApi } from '../utils/api'

/**
 * Defines the structure of an Order object.
 */
interface Order {
  id: string
  userId?: string // Optional: if orders are strongly tied to a user ID on the backend
  name: string // Customer name
  address: string
  items: CartItem[]
  total: number
  date: string // ISO 8601 string for date and time
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Confirmed (Local)' // Example statuses, 'Confirmed (Local)' for fallback
  // Additional fields can be added here as per backend API response (e.g., paymentId, trackingNumber)
}

const STORAGE_KEY = 'smart-ecommerce-orders'

/**
 * A composable for managing user orders, including fetching, placing,
 * and managing their reactive state. It includes API integration with
 * a local storage fallback for placing orders.
 */
export const useOrders = () => {
  // Reactive state for managing the list of user orders fetched from the API
  const userOrders = ref<Order[] | null>(null)
  const isLoadingOrders = ref(false)
  const errorFetchingOrders = ref<Error | null>(null)

  // Reactive state for managing the process of placing a new order
  const isPlacingOrder = ref(false)
  const errorPlacingOrder = ref<Error | null>(null)

  // --- Internal Helper Functions for Local Storage Fallback ---

  /**
   * Retrieves orders directly from local storage.
   * This is primarily used as a fallback mechanism for order placement
   * or for scenarios where API data is unavailable.
   * @returns An array of orders stored locally, or an empty array if none.
   */
  const getOrdersFromLocalStorage = (): Order[] => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (e) {
      console.error('useOrders: Failed to parse orders from local storage:', e)
      return []
    }
  }

  /**
   * Saves a new order to local storage.
   * Used when the API fails to place an order, providing a resilient fallback.
   * @param order The order object to save.
   */
  const saveOrderToLocalStorage = (order: Order) => {
    const orders = getOrdersFromLocalStorage()
    orders.push(order)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  }

  // --- Public Methods for Order Management ---

  /**
   * Fetches the list of orders for the authenticated user from the backend API.
   * This method updates the `userOrders`, `isLoadingOrders`, and `errorFetchingOrders`
   * reactive states based on the API response.
   */
  const getUserOrders = async (): Promise<void> => {
    isLoadingOrders.value = true
    errorFetchingOrders.value = null
    try {
      const orders = await fetchUserOrdersApi()
      userOrders.value = orders
    } catch (error: any) {
      console.error('useOrders: Failed to fetch user orders from API:', error)
      errorFetchingOrders.value = error
      // Optionally, if API fetch fails, you could populate `userOrders.value`
      // with local storage data as a less ideal fallback for display.
      // For a 'My Orders' page, showing an error for API failure is generally preferred.
    } finally {
      isLoadingOrders.value = false
    }
  }

  /**
   * Places a new order. This method first attempts to place the order
   * via the backend API. If the API call fails, it gracefully falls back
   * to saving the order in local storage. It includes optimistic UI updates
   * to provide immediate feedback to the user.
   *
   * @param name The customer's name for the order.
   * @param address The shipping address for the order.
   * @param items The list of items included in the order.
   * @param total The total cost of the order.
   * @returns A promise that resolves with the ID of the placed order.
   */
  const placeOrder = async (
    name: string,
    address: string,
    items: CartItem[],
    total: number,
  ): Promise<string> => {
    isPlacingOrder.value = true
    errorPlacingOrder.value = null
    let orderId: string

    // Create a temporary ID for optimistic update before API response
    const temporaryOrderId = `TEMP-ORDER-${Date.now()}`
    const newOrder: Order = {
      id: temporaryOrderId,
      name,
      address,
      items,
      total,
      date: new Date().toISOString(),
      status: 'Pending', // Initial status before API confirmation
    }

    // Optimistic UI Update: Add the new order to the reactive state immediately.
    // This provides instant feedback to the user while the API call is in progress.
    if (userOrders.value) {
      userOrders.value.unshift(newOrder) // Add to the beginning for immediate visibility
    } else {
      userOrders.value = [newOrder] // Initialize the array if it's currently null
    }

    try {
      // Attempt to place the order via the backend API
      const apiResult = await placeOrderApi(newOrder)
      orderId = apiResult.id || temporaryOrderId // Use the ID from API, or fallback to temporary

      // Update the optimistically added order with the actual API ID and confirmed status.
      // This merges the API response data into the existing order object in the reactive state.
      if (userOrders.value) {
        const index = userOrders.value.findIndex(order => order.id === temporaryOrderId)
        if (index !== -1) {
          userOrders.value[index] = {
            ...userOrders.value[index], // Keep existing data
            ...apiResult, // Merge API-specific fields (like final status, actual ID)
            id: orderId,
            status: apiResult.status || 'Confirmed' // Ensure status is updated
          }
        }
      }

    } catch (error: any) {
      console.error('useOrders: Failed to place order via API:', error)
      errorPlacingOrder.value = error

      // API call failed: Rollback the optimistic update
      if (userOrders.value) {
        userOrders.value = userOrders.value.filter(order => order.id !== temporaryOrderId)
      }

      // Fallback to local storage: Save the order locally if the API failed
      try {
        const localOrderId = `LOCAL-ORDER-${Date.now()}`
        const localOrder: Order = { ...newOrder, id: localOrderId, status: 'Confirmed (Local)' } // Mark as local
        saveOrderToLocalStorage(localOrder)
        orderId = localOrderId

        // Re-add the locally saved order to the reactive state to keep UI consistent
        if (userOrders.value) {
          userOrders.value.unshift(localOrder)
        } else {
          userOrders.value = [localOrder]
        }
        console.warn(`useOrders: Order placed to local storage (ID: ${localOrderId}) as API failed.`)
      } catch (localError: any) {
        console.error('useOrders: Failed to place order even to local storage:', localError)
        // If even local storage fails, re-throw a comprehensive error
        throw new Error('Failed to place order due to both API and local storage issues.')
      }
    } finally {
      isPlacingOrder.value = false
    }
    return orderId
  }

  // --- Exposed Properties and Methods ---
  // Expose reactive states as computed properties for read-only access
  // and public methods for interaction.
  return {
    // Reactive properties and methods for managing the list of user orders
    userOrders: computed(() => userOrders.value),
    isLoadingOrders: computed(() => isLoadingOrders.value),
    errorFetchingOrders: computed(() => errorFetchingOrders.value),
    getUserOrders, // Method to trigger fetching user orders

    // Reactive properties and method for placing new orders
    placeOrder, // Method to place a new order
    isPlacingOrder: computed(() => isPlacingOrder.value),
    errorPlacingOrder: computed(() => errorPlacingOrder.value),
  }
}