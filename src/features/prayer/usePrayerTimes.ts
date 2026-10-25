import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { fetchPrayerTimes } from './api';
import { getNextPrayer, PrayerResponse } from './getNextPrayer';

export function usePrayerTimes(city: string) {
  const [data, setData] = useState<PrayerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());
  const loadedAt = useRef(0);

  const load = useCallback(async () => {
    try {
      setData(await fetchPrayerTimes(city));
      loadedAt.current = Date.now();
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  }, [city]);

  // 1) birinchi yuklash
  useEffect(() => { load(); }, [load]);

  // 2) har soniyada "hozir"ni yangilash
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // 3) ilova orqa fondan qaytganda: kun almashgan bo'lsa qayta yuklash
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state !== 'active') return;
      const sameDay =
        new Date(loadedAt.current).toDateString() === new Date().toDateString();
      if (!sameDay) load();
      setNow(Date.now());
    });
    return () => sub.remove();
  }, [load]);

  const next = data ? getNextPrayer(data, now) : null;

  // ertangi Bomdod ham o'tib ketgan bo'lsa (data eskirgan) qayta yuklash
  useEffect(() => {
    if (data && !next) load();
  }, [data, next, load]);

  const remainingMs = next ? Math.max(0, next.time - now) : 0;

  return { data, next, remainingMs, error, reload: load };
}