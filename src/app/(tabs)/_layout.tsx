import { icons } from "@/constants/icons";
import { fonts } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: { fontFamily: fonts.bodyBold, fontSize: 13 },
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingTop: 6,
          paddingBottom: insets.bottom + 6,
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Namoz", tabBarIcon: icons.prayer }} />
      <Tabs.Screen name="qibla" options={{ title: "Qibla", tabBarIcon: icons.qibla }} />
      <Tabs.Screen name="bilim" options={{ title: "Bilim", tabBarIcon: icons.book }} />
      <Tabs.Screen name="settings" options={{ title: "Sozlamalar", tabBarIcon: icons.settings }} />
    </Tabs>
  );
}