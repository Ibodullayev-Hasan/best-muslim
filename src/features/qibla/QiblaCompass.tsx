// src/features/qibla/QiblaCompass.tsx
import { AppText } from '@/components/AppText';
import { useQibla } from '@/hooks/useQibla';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Polygon, Rect, Text as SvgText } from 'react-native-svg';

const GREEN = '#174B3C';
const GOLD = '#B8893A';
const FOUND = '#2E9E6B'; // qiblaga to'g'ri kelganda
const BEIGE = '#DAD5C6';
const SIZE = 280;

export function QiblaCompass() {
	const { qibla, rotate, aligned, error } = useQibla();

	if (error) return <AppText variant="caption">{error}</AppText>;
	if (qibla === null) return <AppText variant="caption">Yuklanmoqda...</AppText>;

	const needle = aligned ? FOUND : GOLD;
	const ring = aligned ? FOUND : GREEN;

	return (
		<View style={styles.wrap}>
			<Animated.View style={{ transform: [{ rotate }] }}>
				<Svg width={SIZE} height={SIZE} viewBox="0 0 200 200">
					<Circle cx="100" cy="100" r="96" stroke={ring} strokeWidth="2" fill="#fff" />
					<Circle cx="100" cy="100" r="72" stroke={BEIGE} strokeWidth="1.5" fill="none" />

					<SvgText x="100" y="20" fontSize="11" fontWeight="700" fill={GREEN} textAnchor="middle">N</SvgText>
					<SvgText x="182" y="104" fontSize="10" fill="#777" textAnchor="middle">E</SvgText>
					<SvgText x="100" y="188" fontSize="10" fill="#777" textAnchor="middle">S</SvgText>
					<SvgText x="18" y="104" fontSize="10" fill="#777" textAnchor="middle">W</SvgText>

					<G rotation={qibla} origin="100, 100">
						<Polygon points="100,28 110,100 100,92 90,100" fill={needle} />
						<Rect x="92" y="20" width="16" height="16" rx="3" fill={ring} />
					</G>

					<Circle cx="100" cy="100" r="5" fill={GREEN} />
				</Svg>
			</Animated.View>

			<AppText variant="title" style={{ marginTop: 20, color: ring }}>
				{Math.round(qibla)}°
			</AppText>
			<AppText variant="caption">
				{aligned ? 'Qibla topildi ✓' : "Makka tomon yo'nalishi"}
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: { alignItems: 'center', marginTop: 24 },
});