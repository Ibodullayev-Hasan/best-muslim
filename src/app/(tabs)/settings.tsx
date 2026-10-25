import { AppText } from '@/components/AppText';
import { AppColors, ThemeMode } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function useStyles() {
  const { colors } = useTheme();
  return useMemo(() => createStyles(colors), [colors]);
}

type RowProps = {
  label: string;
  value?: string;
  last?: boolean;
  onPress?: () => void;
  right?: React.ReactNode;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const styles = useStyles();
  return (
    <View style={styles.section}>
      <AppText variant="caption" style={styles.sectionTitle}>{title}</AppText>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function Row({ label, value, last, onPress, right }: RowProps) {
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.row,
        !last && styles.rowBorder,
        pressed && styles.rowPressed,
      ]}
    >
      <AppText>{label}</AppText>
      <View style={styles.rowRight}>
        {right ?? (
          <>
            {value ? <AppText variant="caption" style={styles.value}>{value}</AppText> : null}
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </>
        )}
      </View>
    </Pressable>
  );
}

const THEME_OPTIONS: { key: ThemeMode; label: string }[] = [
  { key: 'light', label: "Yorug'" },
  { key: 'dark', label: "Qorong'u" },
  { key: 'system', label: 'Tizim bo\'yicha' },
];

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const { colors, mode, setMode } = useTheme();
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <AppText variant="title" style={styles.title}>Sozlamalar</AppText>

      <Section title="UMUMIY">
        <Row label="Ilova tili" value="O'zbekcha" onPress={() => {}} />
        <Row
          label="Bildirishnomalar"
          last
          right={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.surface}
            />
          }
        />
      </Section>

      <Section title="KO'RINISH">
        {THEME_OPTIONS.map((o, i) => (
          <Row
            key={o.key}
            label={o.label}
            last={i === THEME_OPTIONS.length - 1}
            onPress={() => setMode(o.key)}
            right={
              mode === o.key ? (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              ) : (
                <View style={{ width: 20 }} />
              )
            }
          />
        ))}
      </Section>

      <Section title="DASTUR HAQIDA">
        <Row label="Dastur haqida" value="v1.0.0" last onPress={() => {}} />
      </Section>
    </SafeAreaView>
  );
}

const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    title: { marginBottom: 24 },
    section: { marginBottom: 24 },
    sectionTitle: { marginBottom: 8, marginLeft: 4, letterSpacing: 1 },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      minHeight: 52,
    },
    rowBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    rowPressed: { backgroundColor: colors.prayerCard },
    rowRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    value: { color: colors.muted },
  });