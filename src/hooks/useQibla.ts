// src/features/qibla/useQibla.ts
import { getQiblaBearing } from '@/features/qibla/getQiblaBearing';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

const TOLERANCE = 3; // daraja

export function useQibla() {
	const [qibla, setQibla] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [heading, setHeading] = useState(0);

	const anim = useRef(new Animated.Value(0)).current;
	const last = useRef(0);
	const wasAligned = useRef(false);

	useEffect(() => {
		let sub: Location.LocationSubscription | undefined;

		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setError('Joylashuvga ruxsat berilmadi');
				return;
			}

			const pos = await Location.getCurrentPositionAsync({});
			setQibla(getQiblaBearing(pos.coords.latitude, pos.coords.longitude));

			sub = await Location.watchHeadingAsync((h) => {
				const target = h.trueHeading >= 0 ? h.trueHeading : h.magHeading;
				setHeading(target);

				const delta = ((target - last.current + 540) % 360) - 180;
				last.current += delta;

				Animated.timing(anim, {
					toValue: last.current,
					duration: 120,
					useNativeDriver: true,
				}).start();
			});
		})();

		return () => sub?.remove();
	}, [anim]);

	// telefon yo'nalishi bilan qibla orasidagi farq (0..180)
	const diff =
		qibla === null ? 180 : Math.abs(((heading - qibla + 540) % 360) - 180);
	const aligned = diff < TOLERANCE;

	// faqat qiblaga "kirganda" bir marta tebranish
	useEffect(() => {
		if (aligned && !wasAligned.current) {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		}
		wasAligned.current = aligned;
	}, [aligned]);

	const rotate = anim.interpolate({
		inputRange: [0, 360],
		outputRange: ['0deg', '-360deg'],
	});

	return { qibla, rotate, aligned, error };
}