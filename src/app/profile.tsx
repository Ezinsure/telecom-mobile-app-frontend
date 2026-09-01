import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/ui/Screen';

const ProfilePage = () => {
    const router = useRouter();

    return (
        <Screen>
            <Stack.Screen options={{ headerShown: false }}>
                <View style={styles.container}>
                    <View className="flex-row gap-3 items-center pb-3 mb-3">
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
                            Profile
                        </Text>
                    </View>
                    <View style={styles.content}>
                        {/* <Text style={styles.title}>Profile Settings</Text> */}
                        {/* Add your profile content here */}
                    </View>
                </View>
            </Stack.Screen></Screen>
    );
}
export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
    },
    header: {
        flexDirection: 'row',
        padding: 20
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        fontFamily: 'Poppins',
    },
});