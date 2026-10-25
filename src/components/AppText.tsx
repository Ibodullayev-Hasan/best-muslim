import { AppColors, fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useMemo } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

type Props = TextProps & {
  variant?: "title" | "body" | "caption" | "prayerTime" | "cardPrayersTime" | "bilimCardsTitle";
};

export function AppText({ variant = "body", style, ...rest }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return <Text style={[styles[variant], style]} {...rest} />;
}

const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    title: { fontFamily: fonts.title, fontSize: 28, color: colors.primary },
    prayerTime: { fontFamily: fonts.bodyBold, fontSize: 30, color: colors.onCard },
    cardPrayersTime: {
      fontFamily: fonts.prayerTimesOnCards,
      fontVariant: ["tabular-nums"],
      fontSize: 30,
      color: colors.gold,
    },
    body: { fontFamily: fonts.body, fontSize: 16, color: colors.text },
    caption: { fontFamily: fonts.body, fontSize: 14, color: colors.muted },
    bilimCardsTitle: { fontFamily: fonts.title, fontSize: 25, color: colors.onCard },
  });