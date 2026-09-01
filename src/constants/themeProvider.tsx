import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance } from "react-native";
import { colorScheme } from "nativewind";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextType = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const THEME_KEY = "@app_theme";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<ThemeMode>("system");
  const [isDark, setIsDark] = useState(
    Appearance.getColorScheme() === "dark"
  );

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    if (theme !== "system") {
      setIsDark(theme === "dark");
      colorScheme.set(theme);
      return;
    }

    const systemTheme = Appearance.getColorScheme();

    setIsDark(systemTheme === "dark");
    colorScheme.set("system");

    const subscription = Appearance.addChangeListener(
      ({ colorScheme: newScheme }) => {
        setIsDark(newScheme === "dark");
      }
    );

    return () => subscription.remove();
  }, [theme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);

      if (
        savedTheme === "light" ||
        savedTheme === "dark" ||
        savedTheme === "system"
      ) {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.log("Failed to load theme:", error);
    }
  };

  const setTheme = async (newTheme: ThemeMode) => {
    setThemeState(newTheme);

    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {
      console.log("Failed to save theme:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}