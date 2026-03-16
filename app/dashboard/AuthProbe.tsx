'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/lib/api';

export function AuthProbe() {
  const { apiFetch } = useApi();
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await apiFetch('/api/auth/me');

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const json = (await res.json()) as unknown;
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    void run();
  }, [apiFetch]);

  if (error) {
    return <pre>{error}</pre>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}