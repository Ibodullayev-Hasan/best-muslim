import { AppText } from '@/components/AppText';
import { AppColors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BilimScreen() {

	const { colors } = useTheme();
	const styles = useMemo(() => createStyles(colors), [colors])
	return (
		<SafeAreaView style={styles.container}>
			<AppText variant="title">Bilim</AppText>
			<AppText variant="caption">	Amaliy qo'llanmalar qadam-baqadam</AppText>

			{/*  */}
			<View >
				<View style={styles.card}>
					<AppText variant='title'>Tahorat</AppText>
					<AppText variant='caption'>Tahorat olish tartibi</AppText>
				</View>
				<View style={styles.card}>
					<AppText variant='title'>Namoz o'qish</AppText>
					<AppText variant='caption'>Har bir namozning rakatlari va harakatlari</AppText>
				</View>
				<View style={styles.card}>
					<AppText variant='title'>Duolar</AppText>
					<AppText variant='caption'>Namozda o'qiladigan duolar</AppText>
				</View>
			</View>
		</SafeAreaView>
	);
}

const createStyles = (colors: AppColors) =>
	StyleSheet.create({
		container: { flex: 1, padding: 20, backgroundColor: colors.background },
		row: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "baseline",
		},
		card: {
			marginTop: 20,
			padding: 20,
			borderRadius: 25,
			backgroundColor: colors.surface,
		},
	});
