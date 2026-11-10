import Text from '@/components/ui/text';
import { useAuth } from '@/constants/authcontext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, KeyboardAvoidingView, Platform, Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Screen from '../components/ui/Screen';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;

const LoginScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(10)).current;
    const router = useRouter();
    const { login } = useAuth();
    const [formError, setFormError] = useState('');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [sending, setSending] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

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

    const handleSendOtp = async () => {
        const digitsOnly = phone.replace(/\s+/g, '');
        if (digitsOnly.length < 9) {
            setPhoneError('Enter a valid phone number');
            return;
        }
        setSending(true);
        try {
            // TODO: replace with  real "send OTP" API call
            // await api.sendOtp(digitsOnly);
            await new Promise((resolve) => setTimeout(resolve, 900));
            setOtp('');
            setOtpError('');
            setStep('otp');
            setCooldown(RESEND_COOLDOWN);
        } catch {
            setPhoneError('Could not send code. Try again.');
        } finally {
            setSending(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length < OTP_LENGTH) {
            setOtpError(`Enter the ${OTP_LENGTH}-digit code`);
            return;
        }
        setSubmitting(true);
        try {
            // TODO: replace with  real "verify OTP" API call
            // const { token } = await api.verifyOtp(phone, otp);
            await new Promise((resolve) => setTimeout(resolve, 900));
            login(phone.replace(/\s+/g, '')); // from useAuth()
            router.back();
        } catch {
            setOtpError('Incorrect code. Try again.');
        } finally {
            setSubmitting(false);
        }
    };

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
                                {step === 'phone' ? (
                                    <>
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

                                        <Pressable
                                            className="bg-[#0072CE] dark:bg-surface rounded-xl py-3.5 items-center mt-6 active:opacity-80"
                                            onPress={handleSendOtp}
                                            disabled={sending}
                                        >
                                            <Text className="font-poppins-semibold text-white text-sm">
                                                {sending ? 'Sending code…' : 'Send Code'}
                                            </Text>
                                        </Pressable>
                                    </>
                                ) : (
                                    <>
                                        <Text className="font-poppins text-sm text-foreground mb-2">
                                            Enter the code sent to {phone}
                                        </Text>
                                        <TextInput
                                            value={otp}
                                            onChangeText={(t) => {
                                                setOtp(t.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH));
                                                if (otpError) setOtpError('');
                                            }}
                                            placeholder="123456"
                                            keyboardType="number-pad"
                                            maxLength={OTP_LENGTH}
                                            className={`border rounded-xl px-4 py-3 font-poppins text-sm text-foreground mb-1 tracking-widest ${otpError ? 'border-[#E5484D]' : 'border-gray-200'
                                                }`}
                                        />
                                        {!!otpError && (
                                            <Text className="font-poppins text-xs text-[#E5484D] mb-2">{otpError}</Text>
                                        )}

                                        <View className="flex-row justify-between items-center mt-3">
                                            <Pressable onPress={() => setStep('phone')}>
                                                <Text className="font-poppins text-xs text-[#03022980]">Change number</Text>
                                            </Pressable>
                                            <Pressable onPress={handleSendOtp} disabled={cooldown > 0 || sending}>
                                                <Text
                                                    className={`font-poppins text-xs ${cooldown > 0 ? 'text-[#03022950]' : 'text-[#0072CE]'
                                                        }`}
                                                >
                                                    {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
                                                </Text>
                                            </Pressable>
                                        </View>

                                        <Pressable
                                            className="bg-[#0072CE] dark:bg-surface rounded-xl py-3.5 items-center mt-6 active:opacity-80"
                                            onPress={handleVerifyOtp}
                                            disabled={submitting}
                                        >
                                            <Text className="font-poppins-semibold text-white text-sm">
                                                {submitting ? 'Verifying…' : 'Verify & Login'}
                                            </Text>
                                        </Pressable>
                                    </>
                                )}
                            </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView></Stack.Screen></View></Screen>
    );
};
export default LoginScreen;