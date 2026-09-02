import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "./ui/text";

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
}

const SettingsModal = ({ visible, onClose }: SettingsModalProps) => {
    const router = useRouter();

    const handleNavigation = (route: any) => {
        onClose();
        setTimeout(() => {
            router.push(route);
        }, 300);
    };
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 w-full max-w-3xl">
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={onClose}
                >
                    <View style={styles.modalContainer}>
                        <View className="dark:bg-surface" style={styles.modalContent}>
                            <View className='dark:border-b-[#FFFFFF10]' style={styles.header}>
                                <Text className="font-poppins-medium text-lg text-foreground">Settings</Text>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Ionicons name="close" size={24} className="text-foreground" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => handleNavigation("/profile")}
                            >
                                <View style={styles.menuIcon}>
                                    <Ionicons name="person-outline" size={19} className="text-foreground" />
                                </View>
                                <Text style={styles.menuText}>Profile</Text>
                                <Ionicons name="chevron-forward" size={18} color="#999" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => handleNavigation("/appearance")}
                            >
                                <View style={styles.menuIcon}>
                                    <Ionicons
                                        name="color-palette-outline"
                                        size={19}
                                        className="text-foreground"
                                    />
                                </View>
                                <Text style={styles.menuText}>Appearance</Text>
                                <Ionicons name="chevron-forward" size={18} color="#999" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity></View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 40,
        padding: 20
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: .5,
        borderBottomColor: "#03022930",
    },
    closeButton: {
        padding: 4,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: .5,
        borderBottomColor: "#03022930",
    },
    menuIcon: {
        width: 20,
        alignItems: "center",
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: "#30302990",
        marginLeft: 12,
    },
});
export default SettingsModal;
