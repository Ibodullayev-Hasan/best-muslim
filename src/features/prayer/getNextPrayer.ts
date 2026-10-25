export type PrayerTimes = Record<string, string>;
export type PrayerResponse = { today: PrayerTimes; tomorrow: PrayerTimes };

const order = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
export function getNextPrayer(res: PrayerResponse, now = Date.now()) {
	const list = [
		...order.map(n => ({ name: n, time: new Date(res.today[n]).getTime() })),
		{ name: 'fajr' as const, time: new Date(res.tomorrow.fajr).getTime() },
	];
	return list.find(p => p.time > now) ?? null;
}