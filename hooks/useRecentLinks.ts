'use client';

import { useState, useEffect, useCallback } from 'react';
import { RecentLink } from '@/types';

const STORAGE_KEY = 'yt-downloads-recent';
const MAX_RECENT = 5;

export function useRecentLinks() {
  const [recentLinks, setRecentLinks] = useState<RecentLink[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentLinks(JSON.parse(stored));
      } catch {
        setRecentLinks([]);
      }
    }
  }, []);

  const addRecentLink = useCallback((link: Omit<RecentLink, 'id' | 'timestamp'>) => {
    setRecentLinks(prev => {
      const filtered = prev.filter(l => l.url !== link.url);
      const newLink: RecentLink = {
        ...link,
        id: Math.random().toString(36).substring(2, 15),
        timestamp: Date.now(),
      };
      const updated = [newLink, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeRecentLink = useCallback((id: string) => {
    setRecentLinks(prev => {
      const updated = prev.filter(l => l.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentLinks = useCallback(() => {
    setRecentLinks([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { recentLinks, addRecentLink, removeRecentLink, clearRecentLinks };
}
