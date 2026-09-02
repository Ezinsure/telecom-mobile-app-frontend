import Screen from "@/components/ui/Screen";
import Text from "@/components/ui/text";
import { useAuth } from "@/constants/authcontext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Linking, Pressable, ScrollView, View } from "react-native";

const SUPPORT_PHONE = "tel:1150";
const SUPPORT_EMAIL = "mailto:info@solektra.co";

const FAQS = [
    {
        q: "How long does a bundle activation take?",
        a: "Most bundles activate within 60 seconds of a successful purchase.",
    },
    {
        q: "What happens if my payment fails?",
        a: "No funds are deducted. You can retry the purchase right away.",
    },
    {
        q: "Can I buy a bundle for someone else?",
        a: "Yes — just enter their phone number instead of yours at checkout.",
    },
];

const SupportScreen = () => {
    const router = useRouter();
    const { isLoggedIn, phone } = useAuth();

    const handleContact = (url: string) => {
        Linking.openURL(url).catch(() => { });
    };

    const handleHistoryPress = () => {
        if (!isLoggedIn) {
            router.push("/login");
            return;
        }
        // No phone number is passed here — the history screen reads it
        // from the authenticated session, not from user input or a URL
        // param, so this can never be used to look up someone else's data.
        router.push("/history");
    };

    return (
        <Screen>
            <View className="flex-1 w-full max-w-3xl">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View className="px-6 pt-2 pb-3">
                    <Text className="text-lg font-poppins-medium mt-4 text-primary">
                        Support & Help
                    </Text>
                    <Text className="text-sm text-text-secondary">
                        We&apos;re here whenever you need us.
                    </Text>
                </View>

                {/* Contact options*/}
                <View className="flex-row gap-3 px-4 mt-4">
                    <Pressable
                        className="flex-1 bg-surface rounded-2xl p-4  gap-2 active:opacity-80"
                        onPress={() => handleContact(SUPPORT_PHONE)}
                    >
                        <View className="flex flex-row gap-4">
                            <View className="w-10 h-10 rounded-full bg-[#0072CE]/10 dark:bg-background items-center justify-center">
                                <Ionicons
                                    name="call"
                                    size={20}
                                    className="text-[#0072CE] dark:text-foreground"
                                />
                            </View>
                            <View>
                                <Text className="font-poppins text-xs text-text-secondary">
                                    Call Us
                                </Text>
                                <Text className="font-poppins-medium text-sm text-foreground">
                                    1150
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable
                        className="flex-1 bg-surface rounded-2xl p-4 items-center gap-2 active:opacity-80"
                        onPress={() => handleContact(SUPPORT_EMAIL)}
                    >
                        <View className="flex flex-row gap-4">
                            <View className="w-10 h-10 rounded-full bg-[#0072CE]/10 dark:bg-background items-center justify-center">
                                <Ionicons
                                    name="mail"
                                    size={20}
                                    className="text-[#0072CE] dark:text-foreground"
                                />
                            </View>
                            <View>
                                <Text className="font-poppins text-xs text-text-secondary">
                                    Email Us
                                </Text>
                                <Text className="font-poppins-medium text-sm text-foreground">
                                    info@solektra.co
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                </View>

                {/* Purchase history lookup  */}
                <View className="bg-surface rounded-2xl p-4 mx-4 mt-4">
                    <View className="flex-row items-center gap-3 mb-1">
                        <View className="w-10 h-10 rounded-full bg-[#0072CE]/10 dark:bg-background items-center justify-center">
                            <Ionicons
                                name={isLoggedIn ? "time-outline" : "lock-closed-outline"}
                                size={18}
                                className="text-[#0072CE] dark:text-foreground"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="font-poppins-medium text-base text-foreground">
                                {isLoggedIn ? "Your Purchase History" : "Purchase History"}
                            </Text>
                            <Text className="font-poppins text-xs text-text-secondary">
                                {isLoggedIn
                                    ? `Viewing history for ${phone}`
                                    : "Login to view purchase history"}
                            </Text>
                        </View>
                    </View>
                    <Pressable
                        className="bg-[#0072CE] dark:bg-background rounded-xl py-3 items-center mt-4 active:opacity-80"
                        onPress={handleHistoryPress}
                    >
                        <Text className="font-poppins text-white text-sm">
                            {isLoggedIn ? "View History" : "Login to View History"}
                        </Text>
                    </Pressable>
                </View>
                {/* <View className="bg-white rounded-2xl p-4 mx-4 mt-4">
                    <View className="flex-row items-center gap-3 mb-3">
                        <View className="w-10 h-10 rounded-full bg-[#0072CE]/10 items-center justify-center">
                            <Ionicons name="time-outline" size={20} color="#0072CE" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-poppins-medium text-base text-[#030229]">
                                Check Purchase History
                            </Text>
                            <Text className="font-poppins text-xs text-[#03022980]">
                                Enter phone number to view recent purchases
                            </Text>
                        </View>
                    </View>

                    <TextInput
                        value={phone}
                        onChangeText={(t) => {
                            setPhone(t);
                            if (phoneError) setPhoneError('');
                        }}
                        placeholder="07XX XXX XXX"
                        keyboardType="phone-pad"
                        className={`border rounded-xl px-4 py-3 font-poppins text-sm text-[#030229] ${phoneError ? 'border-[#E5484D]' : 'border-gray-200'
                            }`}
                    />
                    {!!phoneError && (
                        <Text className="font-poppins text-xs text-[#E5484D] mt-1">{phoneError}</Text>
                    )}

                    <Pressable
                        className="bg-[#0072CE] rounded-xl py-3 items-center mt-4 active:opacity-80"
                        onPress={handleCheckHistory}
                    >
                        <Text className="font-poppins text-white text-sm">View History</Text>
                    </Pressable>
                </View> */}

                {/* FAQ */}
                <View className="px-4 mt-6 mb-2">
                    <Text className="font-poppins-medium text-base text-foreground">
                        Common Questions
                    </Text>
                </View>
                <View className="px-4 gap-3">
                    {FAQS.map((item) => (
                        <View key={item.q} className="bg-surface rounded-2xl shadow-sm p-4">
                            <Text className="font-poppins-medium text-sm text-foreground mb-1">
                                {item.q}
                            </Text>
                            <Text className="font-poppins text-xs text-text-secondary leading-5">
                                {item.a}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView></View>
        </Screen>
    );
};
export default SupportScreen;
