type ApiError = {
  message: string;
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
    const error = (await res.json()) as ApiError;
    throw new Error(error.message ?? "Something went wrong");
  }

  return res.json() as Promise<T>;
}
