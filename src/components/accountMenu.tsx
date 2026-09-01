import Text from '@/components/ui/text';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, View } from "react-native";


const AccountMenu = () => {
    const router = useRouter();
    const [menuVisible, setMenuVisible] = useState(false);

    const openAppearance = () => {
        setMenuVisible(false);

        // Small delay makes the modal close before navigation
        setTimeout(() => {
            router.push("/appearance");
        }, 150);
    };

    const openProfile = () => {
        setMenuVisible(false);

        setTimeout(() => {
            router.push("/profile");
        }, 150);
    };

    return (
        <View className="flex-1 bg-background">
            {/* Avatar */}
            <Pressable
                onPress={() => setMenuVisible(true)}
                className="h-10 w-10 items-center justify-center rounded-full bg-primary-light"
            >
                <Ionicons
                    name="person-outline"
                    size={20}
                    color="#0072CE"
                />
            </Pressable>

            {/* Menu Modal */}
            <Modal
                isVisible={menuVisible}
                onBackdropPress={() => setMenuVisible(false)}
                onBackButtonPress={() => setMenuVisible(false)}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0.2}
                style={{
                    margin: 0,
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    paddingTop: 70,
                    paddingRight: 20,
                }}
            >
                <View className="w-56 rounded-2xl border border-border bg-surface p-2 shadow-lg">
                    {/* Profile */}
                    <Pressable
                        onPress={openProfile}
                        className="flex-row items-center rounded-xl px-4 py-3 active:bg-primary-light"
                    >
                        <Ionicons
                            name="person-outline"
                            size={21}
                            color="#0072CE"
                        />

                        <Text className="ml-3 font-poppins-medium text-base text-foreground">
                            Profile
                        </Text>
                    </Pressable>

                    {/* Appearance */}
                    <Pressable
                        onPress={openAppearance}
                        className="flex-row items-center rounded-xl px-4 py-3 active:bg-primary-light"
                    >
                        <Ionicons
                            name="color-palette-outline"
                            size={21}
                            color="#0072CE"
                        />

                        <Text className="ml-3 font-poppins-medium text-base text-foreground">
                            Appearance
                        </Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}
export default AccountMenu