/**
 * IHttpClient — Port for HTTP communication.
 *
 * Defines the minimal interface that any HTTP client adapter must implement.
 * Adapters (Axios, Fetch, Mock) will implement this interface, ensuring
 * Pinia stores and domain services never depend on a specific HTTP library.
 *
 * @see openspec/changes/hex-arch-zod-refactor/specs/hexagonal-architecture/spec.md
 */

export interface IHttpClient {
  /**
   * Perform a GET request to the given URL.
   * @param url - The endpoint path (relative or absolute)
   * @returns A promise resolving to a typed response object
   */
  get<T>(url: string): Promise<{ data: T }>

  /**
   * Perform a POST request to the given URL.
   * @param url - The endpoint path
   * @param body - The request payload
   */
  post<T>(url: string, body?: unknown): Promise<{ data: T }>

  /**
   * Perform a PUT/PATCH request to the given URL.
   * @param url - The endpoint path
   * @param body - The request payload
   */
  put<T>(url: string, body?: unknown): Promise<{ data: T }>

  /**
   * Perform a DELETE request to the given URL.
   * @param url - The endpoint path
   */
  delete<T>(url: string): Promise<{ data: T }>
}
