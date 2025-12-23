

type ApiError = {
  message?: string;
  error?: string;
};

export async function apiClient<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    let message = "Something went wrong";

    try {
      const error: ApiError = await res.json();
      message = error.message || error.error || message;
    } catch {
      // non-json error
    }

    throw new Error(message);
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json() as Promise<T>;
}
