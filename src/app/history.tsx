import Text from '@/components/ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Screen from '../components/ui/Screen';

type HistoryItem = {
    id: string;
    type: 'internet' | 'voice';
    name: string;
    price: number;
    date: string;
    status: 'success' | 'failed';
};

// ---- Mock data — replace with a real lookup by phone number ----
const MOCK_HISTORY: HistoryItem[] = [
    { id: 'h1', type: 'internet', name: 'Daily 600 MB', price: 500, date: 'Aug 27, 2026 · 10:42 AM', status: 'success' },
    { id: 'h2', type: 'voice', name: 'Weekly 200 mins', price: 1500, date: 'Aug 22, 2026 · 6:15 PM', status: 'success' },
    { id: 'h3', type: 'internet', name: 'Monthly 10 GB', price: 8000, date: 'Aug 15, 2026 · 9:03 AM', status: 'failed' },
    { id: 'h4', type: 'internet', name: 'Weekly 3 GB', price: 2500, date: 'Aug 9, 2026 · 1:27 PM', status: 'success' },
];

const HistoryScreen = () => {
    const router = useRouter();
    const { phone } = useLocalSearchParams<{ phone: string }>();

    return (
        <Screen>
            <View className="flex-1 w-full max-w-3xl">
                <Stack.Screen options={{ headerShown: false }} >
                    <SafeAreaView style={{ flex: 1, marginTop: 18 }} edges={['top']}  >
                        <View className="flex-row items-center gap-3 px-4 pt-2 pb-3">
                            <Pressable onPress={() => router.back()} hitSlop={10}>
                                <Ionicons name="chevron-back" size={18} className="text-foreground" />
                            </Pressable>
                            <View>
                                <Text className="font-poppins-medium text-base text-foreground">
                                    Purchase History
                                </Text>
                                <Text className="font-poppins text-xs text-text-secondary">{phone}</Text>
                            </View>
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
                        >
                            {MOCK_HISTORY.length === 0 ? (
                                <View className="items-center gap-3 pt-16">
                                    <View className="w-14 h-14 rounded-full bg-surface items-center justify-center">
                                        <Ionicons name="receipt-outline" size={24} color="#8A8DA6" />
                                    </View>
                                    <Text className="font-poppins text-sm text-text-secondary text-center">
                                        No purchases found for this number
                                    </Text>
                                </View>
                            ) : (
                                <View className="gap-3">
                                    {MOCK_HISTORY.map((item) => (
                                        <View
                                            key={item.id}
                                            className="flex-row items-center justify-between bg-surface rounded-2xl shadow-sm px-4 py-3"
                                        >
                                            <View className="flex-row items-center gap-3 flex-1 pr-3">
                                                <View className="w-8 h-8 rounded-full bg-[#0072CE]/10 dark:bg-background items-center justify-center">
                                                    <Ionicons
                                                        name={item.type === 'internet' ? 'wifi' : 'call'}
                                                        size={16}
                                                        className="text-[#0072CE] dark:text-foreground"
                                                    />
                                                </View>
                                                <View className="flex-1">
                                                    <Text className="font-poppins text-sm text-foreground">
                                                        {item.name}
                                                    </Text>
                                                    <Text className="font-poppins text-xs text-text-secondary">
                                                        {item.date}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View className="items-end gap-1">
                                                <Text className="font-poppins-medium text-sm text-foreground">
                                                    {item.price.toLocaleString()} RWF
                                                </Text>
                                                <View
                                                    className={`px-2 py-0.5 rounded-full ${item.status === 'success' ? 'bg-[#E6F7EE]' : 'bg-[#FCE8E8]'
                                                        }`}
                                                >
                                                    <Text
                                                        className={`font-poppins text-[10px] ${item.status === 'success' ? 'text-[#16A34A]' : 'text-[#E5484D]'
                                                            }`}
                                                    >
                                                        {item.status === 'success' ? 'Successful' : 'Failed'}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </ScrollView>
                    </SafeAreaView></Stack.Screen></View></Screen>
    );
};
export default HistoryScreen;