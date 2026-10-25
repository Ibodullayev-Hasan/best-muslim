import { AppColors, darkColors, lightColors, ThemeMode } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

const KEY = "theme-mode";

type ThemeCtx = {
	mode: ThemeMode;
	scheme: "light" | "dark";
	colors: AppColors;
	setMode: (m: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeCtx>(null as unknown as ThemeCtx);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const systemScheme = useColorScheme();
	const system: "light" | "dark" = systemScheme === "dark" ? "dark" : "light";
	const [mode, setModeState] = useState<ThemeMode>("system");

	useEffect(() => {
		AsyncStorage.getItem(KEY).then((v) => {
			if (v === "light" || v === "dark" || v === "system") setModeState(v);
		});
	}, []);

	const setMode = (m: ThemeMode) => {
		setModeState(m);
		AsyncStorage.setItem(KEY, m);
	};

	const scheme = mode === "system" ? system : mode;

	const value = useMemo(
		() => ({
			mode,
			scheme,
			colors: scheme === "dark" ? darkColors : lightColors,
			setMode,
		}),
		[mode, scheme]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);