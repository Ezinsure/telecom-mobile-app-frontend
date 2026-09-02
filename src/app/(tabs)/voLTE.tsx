import { Button } from '@/components/ui/button';
import Screen from '@/components/ui/Screen';
import Text from '@/components/ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import PurchaseModal from '../../components/purchaseModal';

type VoiceOption = { id: string; minutes: string; sms?: string; bundle?: string, price: number };

// Static data
const VOICE_BUNDLES: { id: string; label: string; options: VoiceOption[] }[] = [
    {
        id: 'daily',
        label: 'Daily bundles',
        options: [
            { id: 'vd1', minutes: '300 mins', sms: '50 sms', price: 500 },
            { id: 'vd2', minutes: '300 mins', sms: '50 sms', bundle: '1GB', price: 550 },
        ],
    },
    {
        id: 'weekly',
        label: 'Weekly bundles',
        options: [
            { id: 'vw1', minutes: '600 mins', sms: '50 sms', price: 1500 },
        ],
    },
    {
        id: 'monthly',
        label: 'Monthly bundles',
        options: [
            { id: 'vm1', minutes: '1000 mins', sms: '50 sms', bundle: '11GB', price: 4900 },
            { id: 'vm2', minutes: '1000 mins', sms: '50 sms', bundle: '30GB', price: 9900 },
            { id: 'vm3', minutes: '2500 mins', sms: '200 sms', bundle: '30GB', price: 11000 },
            { id: 'vm4', minutes: '2000 mins', sms: '100 sms', price: 2500 },
            { id: 'vm5', minutes: '4600 mins', sms: '100 sms', price: 4500 },
        ],
    },
];

const VoiceScreen = () => {
    const [selected, setSelected] = useState<VoiceOption | null>(null);

    // Called by PurchaseModal once the phone number is submitted.
    // Swap this for  real VoLTE purchase API call.
    const handleConfirm = async (phone: string): Promise<boolean> => {
        console.log('Purchasing', selected?.id, 'for', phone);
        await new Promise((resolve) => setTimeout(resolve, 1200));
        return true; // replace with the API's actual success/fail result
    };

    return (
        <Screen>
            <View className="px-6 pt-2 pb-3 mb-4">
                <Text className="text-lg font-poppins-medium mt-4 text-primary">
                    Voice Bundles
                </Text>
                <Text className="text-sm text-text-secondary">
                    Choose a bundle and enjoy more time to talk.
                </Text>
            </View>
            <View className="flex-1 w-full max-w-3xl">
                <ScrollView
                    className="flex-1 px-4 pb-4"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <View className="w-full gap-8">
                        {VOICE_BUNDLES.map((group) => (
                            <View key={group.id} className="bg-surface rounded-2xl p-3 py-6">
                                <Text className="font-nomal text-text-secondary uppercase text-sm px-1 pb-4">
                                    {group.label}
                                </Text>
                                <View className="gap-3">
                                    {group.options.map((option) => (
                                        <View
                                            key={option.id}
                                            className="flex-row items-center justify-between border border-[#03022920] rounded-2xl px-4 py-3 bg-white dark:bg-background dark:text-foreground"
                                        >
                                            <View className="flex-row items-center gap-3 flex-1 pr-3">
                                                <View className="w-7 h-7 rounded-full bg-[#0072CE]/10 dark:bg-surface  items-center justify-center">
                                                    <Ionicons name="call" size={15} className='text-[#0072CE] dark:text-foreground' />
                                                </View>
                                                <View className="flex-1">
                                                    <Text className="font-poppins-medium text-base text-foreground">
                                                        {option.price.toLocaleString()} RWF
                                                    </Text>
                                                    <Text className="text-xs font-poppins text-text-secondary">
                                                        {option.bundle ? `${option.bundle} ${'·'}` : ''} {option.minutes} · {option.sms}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Button
                                                className="bg-[#0072CE] dark:bg-surface rounded-full active:opacity-80"
                                                onPress={() => setSelected(option)}
                                            >
                                                <Text className="text-white text-xs font-poppins-medium px-2">
                                                    Buy
                                                </Text>
                                            </Button>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView></View>
            <PurchaseModal
                visible={!!selected}
                plan={
                    selected
                        ? { title: selected.minutes, subtitle: selected.bundle, subtitles: selected.sms, price: selected.price }
                        : null
                }
                onClose={() => setSelected(null)}
                onConfirm={handleConfirm}
            />
        </Screen>
    );
};
export default VoiceScreen;