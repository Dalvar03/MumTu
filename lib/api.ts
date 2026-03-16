'use client';

import { useAuth } from '@clerk/nextjs';
import { useCallback } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export function useApi() {
  const { getToken } = useAuth();

  const apiFetch = useCallback(async (
    path: string,
    init?: RequestInit,
  ): Promise<Response> => {
    const token = await getToken();

    return fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        ...(init?.headers ?? {}),
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }, [getToken])

  return { apiFetch };
}