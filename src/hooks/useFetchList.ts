import { useEffect, useState, useCallback } from 'react';
import { api, getErrorMessage } from '@/lib/api';

/**
 * Fetches a list resource from the backend (e.g. GET /properties) and
 * exposes loading/error state plus a refetch() for after create/update/delete.
 */
export function useFetchList<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(endpoint);
      // Accepts either a raw array or a { data: [...] } envelope.
      const payload = response.data;
      setData(Array.isArray(payload) ? payload : payload.data ?? []);
    } catch (err) {
      setError(getErrorMessage(err, `Failed to load ${endpoint}`));
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
