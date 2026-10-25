export const lightColors = {
  background: "#E6D5A8",
  surface: "#F8F0DA",
  border: "#D8C79A",
  primary: "#14463A",
  text: "#2B2418",
  muted: "#96938e",
  gold: "#B8893B",
  tabBar: "#14463A",
  tabActive: "#FFFFFF",
  tabInactive: "#9FB8AE",
  prayerCard: "#f5efe1",
  nextCard: "#14463A",   // yangi: "keyingi namoz" kartasi foni
  onCard: "#F8F0DA",     // yangi: yashil karta ustidagi matn
};

export type AppColors = typeof lightColors;

export const darkColors: AppColors = {
  background: "#14110B",
  surface: "#1E1A12",
  border: "#322B1C",
  primary: "#E6D5A8",    // sarlavha matni, qorong'u fonda och rang
  text: "#EDE4CC",
  muted: "#8E8A80",
  gold: "#D4A64F",
  tabBar: "#0E2A23",
  tabActive: "#FFFFFF",
  tabInactive: "#7F9A90",
  prayerCard: "#262016",
  nextCard: "#14463A",
  onCard: "#F8F0DA",
};

export const fonts = {
  body: "NunitoSans_400Regular",
  bodyBold: "NunitoSans_700Bold",
  title: "Lora_700Bold",
  prayerTimesOnCards: "Inter_600SemiBold",
};

export type ThemeMode = "light" | "dark" | "system";