export function handleFetchError(response: Response): void {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
}
