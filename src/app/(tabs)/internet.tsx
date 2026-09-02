import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Text from "@/components/ui/text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "nativewind";
import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    TextInput,
    View,
} from "react-native";
import Screen from "../../components/ui/Screen";

// ---- Static data — move to an API call once the backend is ready ----
const TABS = [
    { id: "volume", label: "Volume Based" },
    { id: "special", label: "Special Offers" },
    { id: "home", label: "Home Broadband" },
    { id: "gahebuzo", label: "Gahebuzo Packs" },
    { id: "fixedlte", label: "Fixed LTE SMEs" },
    { id: "office", label: "Office Broadband for SMEs" },
    { id: "onetwork", label: "One Network" },
    { id: "education", label: "Education Products" },
    { id: "timebased", label: "Time-Based Products (MUP)" },
];

type BundleOption = {
    id: string;
    price: number;
    data: string;
    duration: string;
};

const VOLUME_BUNDLES: { id: string; label: string; options: BundleOption[] }[] =
    [
        {
            id: "daily",
            label: "Daily bundles",
            options: [
                { id: "d1", data: "60 MB", price: 100, duration: "24 hours" },
                { id: "d2", data: "150 MB", price: 200, duration: "24 hours" },
                { id: "d3", data: "300 MB", price: 300, duration: "24 hours" },
                { id: "d4", data: "500 MB", price: 500, duration: "24 hours" },
                { id: "d5", data: "1 GB", price: 1000, duration: "24 hours" },
            ],
        },
        {
            id: "weekly",
            label: "Weekly bundles",
            options: [
                { id: "w1", data: "1 GB", price: 1500, duration: "7 days" },
                { id: "w2", data: "3 GB", price: 2000, duration: "7 days" },
                { id: "w3", data: "5 GB", price: 2900, duration: "7 days" },
            ],
        },
        {
            id: "monthly",
            label: "Monthly bundles",
            options: [{ id: "m1", data: "3 GB", price: 3000, duration: "30 days" }],
        },
    ];
const OTHER_BUNDLES: Record<
    string,
    {
        id: string;
        label: string;
        options: BundleOption[];
    }[]
> = {
    special: [
        {
            id: "daily",
            label: "Daily bundles",
            options: [
                {
                    id: "sp1",
                    data: "1 GB",
                    price: 300,
                    duration: "1 day",
                },
            ],
        },
        {
            id: "monthly",
            label: "Monthly bundles",
            options: [
                {
                    id: "sp2",
                    data: "11 GB",
                    price: 3900,
                    duration: "30 days",
                },
                {
                    id: "sp3",
                    data: "30 GB",
                    price: 8900,
                    duration: "30 days",
                },
                {
                    id: "sp4",
                    data: "Unlimited",
                    price: 16000,
                    duration: "30 days",
                },
            ],
        },
    ],

    home: [
        {
            id: "monthly",
            label: "Monthly bundles",
            options: [
                {
                    id: "hb1",
                    data: "Unlimited",
                    price: 20000,
                    duration: "30 days",
                },
                {
                    id: "hb2",
                    data: "Unlimited",
                    price: 35000,
                    duration: "30 days",
                },
            ],
        },
    ],

    gahebuzo: [
        {
            id: "monthly",
            label: "Monthly bundles",
            options: [
                {
                    id: "gh1",
                    data: "5 GB",
                    price: 3500,
                    duration: "30 days",
                },
                {
                    id: "gh2",
                    data: "10 GB",
                    price: 5500,
                    duration: "30 days",
                },
                {
                    id: "gh3",
                    data: "20 GB",
                    price: 13000,
                    duration: "30 days",
                },
                {
                    id: "gh4",
                    data: "30 GB",
                    price: 15000,
                    duration: "30 days",
                },
                {
                    id: "gh5",
                    data: "50 GB",
                    price: 25000,
                    duration: "30 days",
                },
                {
                    id: "gh6",
                    data: "100 GB",
                    price: 50000,
                    duration: "30 days",
                },
            ],
        },
    ],

    fixedlte: [
        {
            id: "monthly",
            label: "Monthly bundles",
            options: [
                {
                    id: "lte1",
                    data: "50 Mbps",
                    price: 200000,
                    duration: "30 days",
                },
            ],
        },
    ],

    office: [
        {
            id: "monthly",
            label: "Monthly bundles",
            options: [
                {
                    id: "ob1",
                    data: "50 Mbps",
                    price: 49000,
                    duration: "30 days",
                },
            ],
        },
    ],

    onetwork: [
        {
            id: "monthly",
            label: "Monthly bundles",
            options: [
                {
                    id: "on1",
                    data: "3 Mbps",
                    price: 96000,
                    duration: "30 days",
                },
                {
                    id: "on2",
                    data: "5 Mbps",
                    price: 120000,
                    duration: "30 days",
                },
            ],
        },
    ],

    education: [
        {
            id: "monthly",
            label: "Monthly bundles",
            options: [
                {
                    id: "ed1",
                    data: "1 GB + 3 Mbps",
                    price: 26000,
                    duration: "30 days",
                },
                {
                    id: "ed2",
                    data: "2 GB + 3 Mbps",
                    price: 37000,
                    duration: "30 days",
                },
            ],
        },
    ],

    timebased: [
        {
            id: "monthly",
            label: "Monthly bundles",
            options: [
                {
                    id: "tb1",
                    data: "500 MB + 512 Kbps",
                    price: 13500,
                    duration: "30 days",
                },
                {
                    id: "tb2",
                    data: "500 MB + 512 Kbps",
                    price: 17000,
                    duration: "30 days",
                },
                {
                    id: "tb3",
                    data: "2 GB/Day + 1 Mbps",
                    price: 31000,
                    duration: "30 days",
                },
                {
                    id: "tb4",
                    data: "3 GB/Day + 2 Mbps",
                    price: 65000,
                    duration: "30 days",
                },
                {
                    id: "tb5",
                    data: "4 GB/Day + 2 Mbps",
                    price: 87000,
                    duration: "30 days",
                },
            ],
        },
    ],
};
const InternetScreen = () => {
    const [activeTab, setActiveTab] = useState("volume");
    const [selectedPlan, setSelectedPlan] = useState<BundleOption | null>(null);
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const tabsScrollRef = useRef<ScrollView>(null);

    const openBuyModal = (plan: BundleOption) => {
        setSelectedPlan(plan);
        setPhone("");
        setPhoneError("");
    };

    const closeBuyModal = () => setSelectedPlan(null);

    const handleConfirmPurchase = () => {
        const digitsOnly = phone.replace(/\s+/g, "");
        if (digitsOnly.length < 9) {
            setPhoneError("Enter a valid phone number");
            return;
        }
        // TODO: call purchase/recharge API with { planId: selectedPlan?.id, phone: digitsOnly }
        closeBuyModal();
    };

    // Desktop-web convenience: translate a vertical mouse-wheel scroll into
    // horizontal movement, since trackpad/mouse drag doesn't always trigger
    // RN Web's touch-based scroll the way a real swipe does.
    const handleWheel = (e: any) => {
        if (Platform.OS !== "web") return;
        const delta = e.deltaY ?? e.nativeEvent?.deltaY ?? 0;
        if (delta !== 0) {
            e.preventDefault?.();
            // @ts-ignore - scrollTo exists on the underlying web node
            tabsScrollRef.current?.scrollTo?.({
                x: (tabsScrollRef.current as any)._scrollX ?? 0 + delta,
                animated: false,
            });
        }
    };

    const renderOptionCard = (option: BundleOption) => (
        <View
            key={option.id}
            className="flex-row items-center justify-between my-1.5 border border-[#03022920] rounded-2xl px-4 py-3 dark:bg-background"
        >
            <View className="flex-row items-center gap-3 flex-1 pr-3">
                <View className="w-7 h-7 rounded-full bg-[#0072CE]/10 items-center justify-center dark:bg-surface">
                    <Ionicons
                        name="wifi"
                        size={15}
                        className="text-[#0072CE] dark:text-foreground"
                    />
                </View>
                <View className="flex-1">
                    <Text className="font-medium text-base text-foreground">
                        {option.price.toLocaleString()} FRW
                    </Text>
                    <Text className="text-xs text-text-secondary">
                        {option.data} · {option.duration}
                    </Text>
                </View>
            </View>
            <Button
                className="bg-[#0072CE] dark:bg-surface rounded-full px-5 py-1 active:opacity-80"
                onPress={() => openBuyModal(option)}
            >
                <View className="flex-row items-center gap-1">
                    <Text className="text-white  text-xs font-medium">Buy</Text>
                    <Ionicons name="arrow-forward" size={13} color="#fff" />
                </View>
            </Button>
        </View>
    );

    return (
        <Screen>
            <View className="px-6 pt-2 pb-3 mb-4">
                <Text className="text-lg font-poppins-medium mt-4 text-primary">
                    Solektra Data Bundles
                </Text>
                <Text className="text-sm text-text-secondary">
                    Choose the data bundle that works for you
                </Text>
            </View>

            <View className="flex-1 w-full max-w-3xl">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                    <ScrollView
                        ref={tabsScrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ flexGrow: 0, flexShrink: 0 }}
                        contentContainerStyle={{
                            paddingHorizontal: 16,
                            gap: 8,
                            alignItems: "center",
                        }}
                        // @ts-ignore - web-only DOM event, harmless no-op on native
                        onWheel={handleWheel}
                    >
                        <TabsList className="flex-row rounded-lg py-4 gap-1 bg-white dark:bg-background dark:border dark:border-[#FFFFFF10]">
                            {TABS.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <TabsTrigger
                                        key={tab.id}
                                        value={tab.id}
                                        className={`px-4 py-1 rounded-lg shrink-0 ${isActive
                                            ? "bg-[#E8F2FC] dark:bg-surface"
                                            : "bg-transparent"
                                            }`}
                                    >
                                        <Text
                                            className={`text-sm font-normal whitespace-nowrap ${isActive
                                                ? "text-[#0072CE] dark:text-white"
                                                : "text-[#030229] dark:text-[#FFFFFF80]"
                                                }`}
                                        >
                                            {tab.label}
                                        </Text>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </ScrollView>

                    <TabsContent value="volume" className="px-4 pt-3 flex-1 pb-4">
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 100 }}
                        >
                            <View className="w-full gap-5">
                                {VOLUME_BUNDLES.map((group) => (
                                    <View key={group.id} className="bg-surface rounded-2xl p-3">
                                        <Text className="font-poppins-normal uppercase text-sm text-text-secondary px-1 pb-2">
                                            {group.label}
                                        </Text>
                                        <View className="gap-3">
                                            {group.options.map(renderOptionCard)}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </TabsContent>

                    {TABS.filter((t) => t.id !== "volume").map((tab) => (
                        <TabsContent
                            key={tab.id}
                            value={tab.id}
                            className="px-4 pt-3 flex-1"
                        >
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 100 }}
                            >
                                <View className="w-full gap-5">
                                    {(OTHER_BUNDLES[tab.id] ?? []).map((group) => (
                                        <View key={group.id} className="bg-surface rounded-2xl p-3">
                                            <Text className="font-poppins-normal uppercase text-sm text-text-secondary px-1 pb-2">
                                                {group.label}
                                            </Text>
                                            <View className="gap-3">
                                                {group.options.map(renderOptionCard)}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </TabsContent>
                    ))}
                </Tabs>
            </View>

            {/* Buy modal*/}
            <Modal
                visible={!!selectedPlan}
                transparent
                animationType="fade"
                onRequestClose={closeBuyModal}
            >
                <View className="flex-1 w-full max-w-3xl">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        className="flex-1 justify-end bg-black/40"
                    >
                        <View className="bg-white dark:bg-surface rounded-t-3xl px-5 pt-6 pb-8">
                            <View className="flex-row items-center justify-between mb-4">
                                <Text className="text-sm font-normal text-foreground font-poppins">
                                    Confirm Purchase
                                </Text>
                                <Pressable onPress={closeBuyModal} hitSlop={10}>
                                    <Ionicons
                                        name="close"
                                        size={20}
                                        className="text-text-secondary"
                                    />
                                </Pressable>
                            </View>

                            {selectedPlan && (
                                <View className="dark:bg-background" style={styles.planCard}>
                                    <View>
                                        <Text className="font-poppins-medium text-sm text-foreground">
                                            {selectedPlan.data}
                                        </Text>
                                        <Text className="text-[11px] mt-1 text-text-secondary font-poppins">
                                            {selectedPlan.duration}
                                        </Text>
                                    </View>
                                    <Text className="font-poppins-medium text-lg text-[#0072CE] dark:text-foreground">
                                        {selectedPlan.price.toLocaleString()} FRW
                                    </Text>
                                </View>
                            )}

                            <Text className="text-sm font-poppins text-foreground mb-2">
                                Phone number
                            </Text>
                            <TextInput
                                value={phone}
                                onChangeText={(text) => {
                                    setPhone(text);
                                    if (phoneError) setPhoneError("");
                                }}
                                placeholder="07XX XXX XXX"
                                keyboardType="phone-pad"
                                className={`border rounded-xl px-4 py-2 text-sm text-foreground font-poppins ${phoneError ? "border-[#E5484D] dark:border-[#E5484D]" : "border-[#03022920] dark:border-[#FFFFFF10] "}`}
                            />
                            {!!phoneError && (
                                <Text className="text-red-500 font-poppins text-xs mt-1">
                                    {phoneError}
                                </Text>
                            )}

                            <View style={styles.buttonsRow}>
                                <Pressable
                                    onPress={closeBuyModal}
                                    style={({ pressed }) => [
                                        styles.cancelButton,
                                        pressed && styles.pressed,
                                    ]}
                                >
                                    <Text className="text-xs font-poppins-medium ">Cancel</Text>
                                </Pressable>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.confirmButton,
                                        pressed && styles.pressed,
                                    ]}
                                    onPress={handleConfirmPurchase}
                                >
                                    <Text className="text-white text-xs font-poppins-medium">
                                        Confirm
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </KeyboardAvoidingView></View>
            </Modal>
        </Screen>
    );
};
const styles = StyleSheet.create({
    planCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F4F7FB",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 18,
    },

    buttonsRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 22,
    },
    cancelButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E5F0",
    },
    confirmButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: "#0072CE",
    },
    pressed: {
        opacity: 0.8,
    },
});
export default InternetScreen;
