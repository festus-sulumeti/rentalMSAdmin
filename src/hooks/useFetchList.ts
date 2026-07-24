import { useEffect, useState, useCallback } from 'react';
import { api, getErrorMessage } from '@/lib/api';
import type { ApiListResponse } from '@/types';

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
      const response = await api.get<T[] | ApiListResponse<T>>(endpoint);
      // Accepts either a raw array or a { data: [...] } envelope.
      setData(Array.isArray(response) ? response : response.data ?? []);
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
