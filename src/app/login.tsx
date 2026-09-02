import Text from '@/components/ui/text';
import { useAuth } from '@/constants/authcontext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, KeyboardAvoidingView, Platform, Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Screen from '../components/ui/Screen';

const LoginScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(10)).current;
    const router = useRouter();
    const { login } = useAuth();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = async () => {
        let hasError = false;
        const digitsOnly = phone.replace(/\s+/g, '');

        if (digitsOnly.length < 9) {
            setPhoneError('Enter a valid phone number');
            hasError = true;
        }
        if (password.length < 4) {
            setPasswordError('Enter your password');
            hasError = true;
        }
        if (hasError) return;

        setSubmitting(true);
        setFormError('');
        try {
            // TODO: replace with real login API call, 
            // const { token } = await api.login(digitsOnly, password);
            // securely store `token`, then call login(digitsOnly).
            await new Promise((resolve) => setTimeout(resolve, 900));
            login(digitsOnly);
            router.back();
        } catch {
            setFormError('Invalid phone number or password');
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Screen>
            <View className="flex-1 w-full max-w-3xl">
                <Stack.Screen options={{ headerShown: false }} >
                    <SafeAreaView style={{ flex: 1, padding: 20 }} edges={['top']}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                            style={{ flex: 1 }}
                        >
                            <View className="flex-row gap-3 items-center px-4 pt-2 pb-3">
                                <View className="w-6 h-6 rounded-full bg-[#030229]/10 dark:bg-surface items-center justify-center">
                                    <Pressable onPress={() => router.back()} hitSlop={10}>
                                        <Ionicons name="chevron-back" size={16} className='text-foreground' />
                                    </Pressable></View>
                                <Text className='text-foreground font-poppins-medium'>Back</Text>
                            </View>

                            <View className="px-6 pt-9">
                                <View className="items-center justify-center mb-3">
                                    <Image source={require('@/assets/images/icologo.png')} />
                                </View>
                                <Animated.View
                                    style={{
                                        opacity: fadeAnim,
                                        transform: [{ translateX: slideAnim }],
                                    }}
                                >
                                    <Text className="text-xl font-poppins text-foreground mb-1 text-center">
                                        Welcome to Solektra App
                                    </Text>
                                    <Text className="font-poppins text-sm text-text-secondary mb-8 text-center">
                                        Login to manage your account
                                    </Text>
                                </Animated.View>
                                {!!formError && (
                                    <View className="bg-[#FCE8E8] rounded-xl px-4 py-3 mb-4">
                                        <Text className="font-poppins text-xs text-[#E5484D]">{formError}</Text>
                                    </View>
                                )}

                                <Text className="font-poppins text-sm text-foreground mb-2">
                                    Phone number
                                </Text>
                                <TextInput
                                    value={phone}
                                    onChangeText={(t) => {
                                        setPhone(t);
                                        if (phoneError) setPhoneError('');
                                    }}
                                    placeholder="07XX XXX XXX"
                                    keyboardType="phone-pad"
                                    className={`border rounded-xl px-4 py-3 font-poppins text-sm text-foreground mb-1 ${phoneError ? 'border-[#E5484D]' : 'border-gray-200'
                                        }`}
                                />
                                {!!phoneError && (
                                    <Text className="font-poppins text-xs text-[#E5484D] mb-2">{phoneError}</Text>
                                )}

                                <Text className="font-poppins text-sm text-foreground mb-2 mt-3">
                                    Password
                                </Text>
                                <TextInput
                                    value={password}
                                    onChangeText={(t) => {
                                        setPassword(t);
                                        if (passwordError) setPasswordError('');
                                    }}
                                    placeholder="••••••••"
                                    secureTextEntry
                                    className={`border rounded-xl px-4 py-3 font-poppins text-sm text-foreground mb-1 ${passwordError ? 'border-[#E5484D]' : 'border-gray-200'
                                        }`}
                                />
                                {!!passwordError && (
                                    <Text className="font-poppins text-xs text-[#E5484D] mb-2">{passwordError}</Text>
                                )}

                                <Pressable
                                    className="bg-[#0072CE] dark:bg-surface rounded-xl py-3.5 items-center mt-6 active:opacity-80"
                                    onPress={handleLogin}
                                    disabled={submitting}
                                >
                                    <Text className="font-poppins-semibold text-white text-sm">
                                        {submitting ? 'Logging in…' : 'Login'}
                                    </Text>
                                </Pressable>

                                {/* <Pressable className="items-center mt-5" onPress={() => router.push('/signup')}>
                        <Text className="font-poppins text-sm text-[#0072CE]">
                            Don&apos;t have an account? Sign up
                        </Text>
                    </Pressable> */}
                            </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView></Stack.Screen></View></Screen>
    );
};
export default LoginScreen;