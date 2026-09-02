import { Stack, router } from "expo-router";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const NotFoundScreen = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Oops!",
                    headerShown: false,
                }}
            />

            <View style={styles.container} className="flex-1 w-full max-w-3xl">
                <View style={styles.content}>
                    <Text style={styles.code}>404</Text>

                    <Text style={styles.title}>This page isn’t available</Text>

                    <Text style={styles.description}>
                        The page you’re trying to access may have been moved or no longer exists.
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => router.replace("/")}
                    >
                        <Text style={styles.buttonText}>Go back home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },

    content: {
        alignItems: "center",
        maxWidth: 400,
    },

    code: {
        fontSize: 100,
        fontWeight: "800",
        color: "#0072CE",
        letterSpacing: -4,
        marginBottom: 8,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#030229",
        textAlign: "center",
        marginBottom: 12,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#030229",
        textAlign: "center",
        marginBottom: 32,
    },

    button: {
        backgroundColor: "#0072CE",
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 12,
        minWidth: 180,
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});