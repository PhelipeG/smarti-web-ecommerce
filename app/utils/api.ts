import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Global request timeout of 10 seconds
})

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (import.meta.dev) {
      // Log a structured object for better debuggability in browser dev tools
      console.error('API Error:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data,
        fullError: error,
      })
    }
    return Promise.reject(error)
  },
)

// NOTE: In a real application, this type would reside in a shared 'types' directory
// (e.g., `app/types/order.ts`) to be reusable across the application.
export interface Order {
  id: string;
  userId: string;
  date: string; // ISO date string
  products: Array<{
    productId: number;
    quantity: number;
    price: number;
    name: string;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

// Mock data for user orders to simulate a backend response.
const mockOrders: Order[] = [
  {
    id: 'ORD001',
    userId: 'user123',
    date: '2023-10-26T10:00:00Z',
    products: [{ productId: 1, quantity: 2, price: 10.99, name: 'Product A' }],
    totalAmount: 21.98,
    status: 'delivered',
  },
  {
    id: 'ORD002',
    userId: 'user123',
    date: '2023-11-01T14:30:00Z',
    products: [
      { productId: 2, quantity: 1, price: 25.00, name: 'Product B' },
      { productId: 3, quantity: 3, price: 5.50, name: 'Product C' },
    ],
    totalAmount: 41.50,
    status: 'processing',
  },
  {
    id: 'ORD003',
    userId: 'user456', // Example order for a different user
    date: '2023-11-05T09:15:00Z',
    products: [{ productId: 4, quantity: 1, price: 50.00, name: 'Product D' }],
    totalAmount: 50.00,
    status: 'shipped',
  },
  {
    id: 'ORD004',
    userId: 'user123',
    date: '2023-11-10T11:00:00Z',
    products: [
      { productId: 5, quantity: 1, price: 15.00, name: 'Product E' },
      { productId: 6, quantity: 2, price: 7.00, name: 'Product F' },
    ],
    totalAmount: 29.00,
    status: 'pending',
  },
];

/**
 * Fetches a list of orders for a specific user.
 *
 * This is a temporary mock function for development. In a production environment,
 * it would make an actual HTTP request. The `userId` parameter is used here to
 * simulate filtering, but in a real scenario, the backend would typically infer
 * the user from an authentication token (e.g., JWT).
 *
 * @param userId - The ID of the user to fetch orders for.
 * @returns A Promise that resolves with an array of `Order` objects.
 * @throws An `AxiosError` if the API call fails.
 */
export async function fetchUserOrdersApi(userId: string): Promise<Order[]> {
  // --- REAL IMPLEMENTATION (when backend is ready) ---
  // try {
  //   // The backend would handle authentication and return orders for the logged-in user.
  //   // The endpoint might be something like `/orders` or `/user/orders`.
  //   const response = await api.get<Order[]>('/orders');
  //   return response.data;
  // } catch (error) {
  //   // The axios interceptor will log the error.
  //   // We just re-throw it to be handled by the calling code (e.g., a composable).
  //   throw error;
  // }

  // --- MOCK IMPLEMENTATION (for current development) ---
  console.log(`[MOCK API] Fetching orders for userId: ${userId}`);
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Simulate an error ~20% of the time to test error handling
      if (Math.random() < 0.2) {
        const mockConfig: AxiosRequestConfig = {
          headers: {} as any,
          url: `/mock/user/${userId}/orders`,
          method: 'get',
        };
        const mockAxiosError = new AxiosError(
          'Failed to fetch user orders: Simulated server issue.',
          'ERR_BAD_RESPONSE',
          mockConfig,
          null, // Mock request object
          { // Mock response for a 500 Internal Server Error
            status: 500,
            statusText: 'Internal Server Error',
            data: { message: 'Simulated backend error fetching orders.' },
            headers: {},
            config: mockConfig,
          }
        );
        reject(mockAxiosError);
        return;
      }

      // Filter mock data to simulate backend behavior.
      const filteredOrders = mockOrders.filter(order => order.userId === userId);
      resolve(filteredOrders);
    }, 1000); // 1-second delay
  });
}