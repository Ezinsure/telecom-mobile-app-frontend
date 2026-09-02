import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export type PurchasePlan = {
    title: string;
    subtitle?: string;
    subtitles?: string;
    price: number;
};

type Step = "form" | "submitting" | "success" | "error";

type PurchaseModalProps = {
    visible: boolean;
    plan: PurchasePlan | null;
    onClose: () => void;
    // Each screen (voice, internet bundles, etc.) plugs in its own purchase
    // API call here. Resolve true on success, false on failure — the modal
    // handles the loading/result UI so callers only worry about the request.
    onConfirm: (phone: string) => Promise<boolean>;
};

const PurchaseModal = ({
    visible,
    plan,
    onClose,
    onConfirm,
}: PurchaseModalProps) => {
    const [step, setStep] = useState<Step>("form");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    useEffect(() => {
        if (visible) {
            setStep("form");
            setPhone("");
            setPhoneError("");
        }
    }, [visible]);

    const handleSubmit = async () => {
        const digitsOnly = phone.replace(/\s+/g, "");
        if (digitsOnly.length < 9) {
            setPhoneError("Enter a valid phone number");
            return;
        }
        setStep("submitting");
        try {
            const success = await onConfirm(digitsOnly);
            setStep(success ? "success" : "error");
        } catch {
            setStep("error");
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 w-full max-w-3xl">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={styles.backdrop}
                >
                    <View className="bg-white dark:bg-surface" style={styles.sheet}>
                        {step === "form" && (
                            <>
                                <View style={styles.headerRow}>
                                    <Text className="font-poppins-medium text-base text-foreground">
                                        Confirm Purchase
                                    </Text>
                                    <Pressable onPress={onClose} hitSlop={10}>
                                        <Ionicons
                                            name="close"
                                            size={20}
                                            className="text-text-secondary"
                                        />
                                    </Pressable>
                                </View>

                                {plan && (
                                    <View className="dark:bg-background" style={styles.planCard}>
                                        <View>
                                            <Text className="font-poppins text-sm text-foreground">
                                                {plan.title}
                                            </Text>
                                            <View className="flex flex-row gap-5">
                                                {!!plan.subtitle && (
                                                    <Text className="font-poppins text-[11px] text-text-secondary mt-1">
                                                        {plan.subtitle}
                                                    </Text>
                                                )}
                                                {!!plan.subtitles && (
                                                    <Text className="font-poppins-normal text-[11px] text-text-secondary mt-1">
                                                        {plan.subtitles}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                        <Text className="font-poppins-semibold text-lg text-[#0072CE] dark:text-foreground">
                                            {plan.price.toLocaleString()} FRW
                                        </Text>
                                    </View>
                                )}

                                <Text className="text-sm text-foreground mt-2 mb-2 font-poppins">
                                    Phone number
                                </Text>
                                <TextInput
                                    value={phone}
                                    onChangeText={(t) => {
                                        setPhone(t);
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
                                        style={({ pressed }) => [
                                            styles.cancelButton,
                                            pressed && styles.pressed,
                                        ]}
                                        onPress={onClose}
                                    >
                                        <Text className=" font-poppins-medium text-foreground text-[13px]">
                                            Cancel
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.confirmButton,
                                            pressed && styles.pressed,
                                        ]}
                                        onPress={handleSubmit}
                                    >
                                        <Text className="font-poppins-medium text-white dark:text-foreground text-[13px]">
                                            Confirm Purchase
                                        </Text>
                                    </Pressable>
                                </View>
                            </>
                        )}

                        {step === "submitting" && (
                            <View style={styles.centerState}>
                                <ActivityIndicator size="large" color="#0072CE" />
                                <Text className="font-poppins text-sm text-foreground mt-2">
                                    Processing your purchase…
                                </Text>
                            </View>
                        )}

                        {step === "success" && (
                            <View style={styles.centerState}>
                                <View style={[styles.resultIcon, { backgroundColor: "#E6F7EE" }]}>
                                    <Ionicons name="checkmark" size={28} color="#16A34A" />
                                </View>
                                <Text className="font-poppins-semibold text-lg text-foreground mt-4">
                                    Purchase Successful
                                </Text>
                                <Text className="font-poppins text-sm text-foreground mt-2">
                                    {plan?.title} has been sent to {phone}
                                </Text>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.confirmButton,
                                        pressed && styles.pressed,
                                        { width: "100%", marginTop: 20 },
                                    ]}
                                    onPress={onClose}
                                >
                                    <Text className="font-poppins-medium text-white dark:text-foreground text-[13px]">
                                        Done
                                    </Text>
                                </Pressable>
                            </View>
                        )}

                        {step === "error" && (
                            <View style={styles.centerState}>
                                <View style={[styles.resultIcon, { backgroundColor: "#FCE8E8" }]}>
                                    <Ionicons name="close" size={28} color="#E5484D" />
                                </View>
                                <Text className="font-poppins-semibold text-lg text-foreground mt-4">
                                    Purchase Failed
                                </Text>
                                <Text className="font-poppins text-sm text-foreground mt-2">
                                    Something went wrong. Please try again.
                                </Text>
                                <View style={[styles.buttonsRow, { width: "100%" }]}>
                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.cancelButton,
                                            pressed && styles.pressed,
                                        ]}
                                        onPress={onClose}
                                    >
                                        <Text className="font-poppins-medium text-foreground text-[13px]">
                                            Close
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.confirmButton,
                                            pressed && styles.pressed,
                                        ]}
                                        onPress={() => setStep("form")}
                                    >
                                        <Text className="font-poppins-medium text-foreground text-[13px]">
                                            Try Again
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    </View>
                </KeyboardAvoidingView></View>
        </Modal>
    );
};

export default PurchaseModal;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    sheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 32,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
    },
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
    planTitle: {
        fontFamily: "Poppins-medium",
        fontSize: 15,
        color: "#030229",
    },
    fieldLabel: {
        fontSize: 13,
    },
    errorText: {
        fontFamily: "Poppins",
        fontSize: 11,
        color: "#E5484D",
        marginTop: 4,
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
    centerState: {
        alignItems: "center",
        paddingVertical: 12,
    },
    resultIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
});
