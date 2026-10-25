// app/qibla.tsx
import { AppText } from '@/components/AppText';
import { AppColors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { QiblaCompass } from '@/features/qibla/QiblaCompass';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QiblaScreen() {

  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors])

  return (
    <SafeAreaView style={styles.container}>
      <AppText variant="title">Qibla</AppText>
      <AppText variant="caption">
        Telefonni tekis ushlang va strelka yo'nalishiga buring
      </AppText>
      <QiblaCompass />
    </SafeAreaView>
  );
}

const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
  });