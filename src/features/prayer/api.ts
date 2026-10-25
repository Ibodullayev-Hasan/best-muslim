import type { PrayerResponse } from './getNextPrayer';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function fetchPrayerTimes(city: string): Promise<PrayerResponse> {
	const res = await fetch(`${BASE_URL}/prayer-times?city=${encodeURIComponent(city)}`);
	if (!res.ok) throw new Error('Namoz vaqtlarini olib bo‘lmadi');
	return res.json();
}