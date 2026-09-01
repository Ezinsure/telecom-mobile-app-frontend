import Screen from "@/components/ui/Screen";
import { useTheme } from "@/constants/themeProvider";
import { Ionicons } from "@expo/vector-icons";
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

export default function AppearanceScreen() {
    const { theme, setTheme } = useTheme();

    return (
        <Screen className="px-5 pt-6">
            <Text className="font-poppins-semibold text-2xl text-foreground">
                Appearance
            </Text>

            <Text className="mt-2 font-poppins text-text-secondary">
                Choose how Solektra lookseee
            </Text>

            <View className="mt-8 gap-3">
                {themes.map((item) => {
                    const selected = theme === item.value;

                    return (
                        <Pressable
                            key={item.value}
                            onPress={() => setTheme(item.value)}
                            className={`flex-row items-center rounded-2xl border p-4 ${selected
                                ? "border-primary bg-primary-light"
                                : "border-border bg-surface"
                                }`}
                        >
                            <View className="h-11 w-11 items-center justify-center rounded-full bg-background">
                                <Ionicons
                                    name={item.icon}
                                    size={22}
                                    color="#0072CE"
                                />
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
                                <Ionicons
                                    name="checkmark-circle"
                                    size={24}
                                    color="#0072CE"
                                />
                            )}
                        </Pressable>
                    );
                })}
            </View>
        </Screen>
    );
}