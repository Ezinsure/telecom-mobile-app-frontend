import { useTheme } from "@/constants/themeProvider";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";

const themes = [
  {
    value: "system",
    title: "System",
    description: "Use your device settings",
    icon: "phone-portrait-outline",
  },
  {
    value: "light",
    title: "Light",
    description: "Always use light mode",
    icon: "sunny-outline",
  },
  {
    value: "dark",
    title: "Dark",
    description: "Always use dark mode",
    icon: "moon-outline",
  },
] as const;

const AppearanceScreen = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Stack.Screen options={{ headerShown: false }}>
      <View className="flex-1 bg-background px-5 pt-6 w-full max-w-3xl
">
        <View className="flex-row gap-3 items-center pt-2 pb-3 mb-3">
          <View className="w-6 h-6 rounded-full bg-[#030229]/10 dark:bg-surface items-center justify-center">
            <Pressable onPress={() => router.back()} hitSlop={10}>
              <Ionicons
                name="chevron-back"
                size={16}
                className="text-foreground"
              />
            </Pressable>
          </View>
          <Text className=" font-poppins-medium text-xl text-foreground">
            Appearance
          </Text>
        </View>

        <Text className="mb-6 font-poppins text-text-secondary">
          Select your preferred theme for the app.
        </Text>

        <View className="gap-3">
          {themes.map((item) => {
            const selected = theme === item.value;

            return (
              <Pressable
                key={item.value}
                onPress={() => setTheme(item.value)}
                className={`flex-row items-center rounded-2xl border p-4 ${selected
                  ? "border-primary bg-primary-light dark:bg-surface"
                  : "border-border bg-primary/10"
                  }`}
              >
                <View className="h-11 w-11 items-center justify-center rounded-full bg-background">
                  <Ionicons name={item.icon} size={22} color="#0072CE" />
                </View>

                <View className="ml-4 flex-1">
                  <Text className="font-poppins-semibold text-base text-foreground">
                    {item.title}
                  </Text>

                  <Text className="mt-1 font-poppins text-sm text-text-secondary">
                    {item.description}
                  </Text>
                </View>

                {selected && (
                  <Ionicons name="checkmark-circle" size={24} color="#0072CE" />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </Stack.Screen>
  );
};
export default AppearanceScreen;
