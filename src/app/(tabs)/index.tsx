import { AppText } from "@/components/AppText";
import { AppColors } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useData } from "@/hooks/useData";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { data, loading } = useData("prayers");

  if (loading || !data) return <ActivityIndicator />;

  return (
    <SafeAreaView style={styles.container}>
      <AppText variant="caption">Assalomu alaykum</AppText>
      <AppText variant="title">Namoz vaqtlari</AppText>

      <View style={styles.nextCard}>
        <AppText variant="caption" style={styles.cardLabel}>Keyingi namoz</AppText>
        <View style={styles.row}>
          <AppText variant="title" style={styles.cardTitle}>Asr</AppText>
          <AppText variant="prayerTime">16:05</AppText>
        </View>
        <AppText variant="caption" style={styles.cardLabel}>1 soat 24 daqiqa qoldi</AppText>
      </View>

      <FlatList
        data={data.prayers}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => (
          <View style={[styles.row, styles.prayerCard]}>
            <AppText variant="title">{item.title}</AppText>
            <AppText variant="cardPrayersTime">{item.time}</AppText>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    nextCard: {
      marginTop: 20,
      padding: 20,
      borderRadius: 20,
      backgroundColor: colors.nextCard,   // primary emas
    },
    prayerCard: {
      marginTop: 10,
      padding: 20,
      borderRadius: 25,
      backgroundColor: colors.prayerCard,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
    cardLabel: { color: colors.tabInactive },
    cardTitle: { color: colors.tabActive },
  });