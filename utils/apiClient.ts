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
    let message = "Something went wrong";

    try {
      const error = await res.json();
      message = error.message || JSON.stringify(error);
      console.error("API Error:", error);
    } catch {
      console.error("API Error (non-JSON response)");
    }

    throw new Error(message);
  }

  return res.json() as Promise<T>;
}
