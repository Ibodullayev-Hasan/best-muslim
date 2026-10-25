import { Text, View } from 'react-native';
import { usePrayerTimes } from './usePrayerTimes';

const pad = (n: number) => String(n).padStart(2, '0');

function format(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

const LABELS: Record<string, string> = {
  fajr: 'Bomdod', sunrise: 'Quyosh', dhuhr: 'Peshin',
  asr: 'Asr', maghrib: 'Shom', isha: 'Xufton',
};

export function PrayerWidget({ city = 'Tashkent' }) {
  const { next, remainingMs, error } = usePrayerTimes(city);

  if (error) return <Text>{error}</Text>;
  if (!next) return <Text>Yuklanmoqda...</Text>;

  return (
    <View>
      <Text>Keyingi namoz: {LABELS[next.name]}</Text>
      <Text>{format(remainingMs)}</Text>
    </View>
  );
}