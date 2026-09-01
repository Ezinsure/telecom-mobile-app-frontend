import { useTheme } from "@/constants/themeProvider";
import { Pressable, Text, View } from "react-native";

const themes = [
    {
        value: "system",
        title: "System",
        description: "Follow your device settings",
    },
    {
        value: "light",
        title: "Light",
        description: "Always use light mode",
    },
    {
        value: "dark",
        title: "Dark",
        description: "Always use dark mode",
    },
] as const;

export default function AppearanceScreen() {
    const { theme, setTheme } = useTheme();

    return (
        <View className="flex-1 bg-background px-5 pt-6">
            <Text className="mb-2 font-poppins-semibold text-2xl text-foreground">
                Appearance
            </Text>

            <Text className="mb-6 font-poppins text-text-secondary">
                Choose how Solektra looks
            </Text>

            <View className="gap-3">
                {themes.map((item) => {
                    const selected = theme === item.value;

                    return (
                        <Pressable
                            key={item.value}
                            onPress={() => setTheme(item.value)}
                            className={`rounded-2xl border p-4 ${selected
                                ? "border-primary bg-primary-light"
                                : "border-border bg-surface"
                                }`}
                        >
                            <Text
                                className={`font-poppins-semibold text-base ${selected
                                    ? "text-primary"
                                    : "text-foreground"
                                    }`}
                            >
                                {item.title}
                            </Text>

                            <Text className="mt-1 font-poppins text-sm text-text-secondary">
                                {item.description}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}