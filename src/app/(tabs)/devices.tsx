import Screen from "@/components/ui/Screen";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from "react";
import { Dimensions, Image, Linking, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, useWindowDimensions } from "react-native";

const { width } = Dimensions.get('window');

interface Device {
    id: string;
    name: string;
    price: number;
    image: any;
    specs: string;
    description?: string;
    color?: string[];
    storage?: string[];
}

const DevicesScreen = () => {
    const { width: screenWidth } = useWindowDimensions();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    // Responsive grid
    const getColumns = () => {
        if (screenWidth >= 1024) return 4;
        if (screenWidth >= 768) return 3;
        return 2;
    };

    const columns = getColumns();
    const gap = 16;
    const padding = 20;
    const cardWidth = (screenWidth - (padding * 2) - (gap * (columns - 1))) / columns;

    const devices: Device[] = [
        {
            id: '1',
            name: 'Galaxy S22 Ultra',
            price: 50000,
            image: require('@/assets/images/galaxy.jpg'),
            specs: '128GB | 8GB RAM',
            description: 'Experience the ultimate smartphone with the Galaxy S22 Ultra. Featuring a stunning 6.8-inch display, 108MP camera, and all-day battery life.',
            color: ['Black', 'White', 'Silver'],
            storage: ['128GB', '256GB', '512GB'],
        },
        {
            id: '2',
            name: 'Galaxy S22+',
            price: 45000,
            image: require('@/assets/images/galaxy.jpg'),
            specs: '256GB | 8GB RAM',
            description: 'The perfect balance of performance and value. Galaxy S22+ offers premium features at a more accessible price point.',
            color: ['Black', 'White'],
            storage: ['128GB', '256GB'],
        },
        {
            id: '3',
            name: 'Galaxy S22',
            price: 35000,
            image: require('@/assets/images/galaxy.jpg'),
            specs: '128GB | 6GB RAM',
            description: 'Compact and powerful, the Galaxy S22 delivers flagship performance in a smaller, more affordable package.',
            color: ['Black', 'White', 'Pink'],
            storage: ['128GB'],
        },
        {
            id: '4',
            name: 'Galaxy S22 FE',
            price: 30000,
            image: require('@/assets/images/galaxy.jpg'),
            specs: '128GB | 6GB RAM',
            description: 'The Fan Edition brings premium features at a budget-friendly price. Perfect for everyday users.',
            color: ['Black', 'White', 'Blue'],
            storage: ['128GB', '256GB'],
        },
        {
            id: '5',
            name: 'Galaxy S22 Pro',
            price: 38000,
            image: require('@/assets/images/galaxy.jpg'),
            specs: '256GB | 12GB RAM',
            description: 'Pro-level performance with enhanced camera capabilities and faster processing power.',
            color: ['Black', 'Silver'],
            storage: ['256GB', '512GB'],
        },
        {
            id: '6',
            name: 'Galaxy S22 Lite',
            price: 28000,
            image: require('@/assets/images/galaxy.jpg'),
            specs: '64GB | 4GB RAM',
            description: 'Lightweight and efficient, the Galaxy S22 Lite is perfect for those who want essential features without the premium price.',
            color: ['Black', 'White', 'Blue'],
            storage: ['64GB', '128GB'],
        },
    ];

    // Filter devices based on search query
    const filteredDevices = useMemo(() => {
        return devices.filter(device => {
            const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                device.specs.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [searchQuery]);

    const handleWhatsAppOrder = (device: Device) => {
        const phoneNumber = '+250794766463';
        const message = `Hello, I would like to order the ${device.name} (${device.specs}) priced at RWF ${device.price.toLocaleString()}`;
        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        Linking.openURL(url).catch(() => {
            // Fallback if WhatsApp is not installed
            Linking.openURL(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
        });
    };

    const openDeviceDetails = (device: Device) => {
        setSelectedDevice(device);
        setModalVisible(true);
    };

    const DeviceCard = ({ device }: { device: Device }) => (
        <View style={[styles.card, { width: cardWidth }]}>
            <LinearGradient
                colors={['#f8f9fe', '#ffffff']}
                style={styles.cardGradient}
            >
                <TouchableOpacity onPress={() => openDeviceDetails(device)} activeOpacity={0.9}>
                    <View className="bg-[#f8f9fe] dark:bg-surface" style={styles.imageContainer}>
                        <Image source={device.image} style={styles.deviceImage} />
                    </View>
                </TouchableOpacity>

                <View className="bg-surface" style={styles.cardContent}>
                    <TouchableOpacity onPress={() => openDeviceDetails(device)}>
                        <View style={styles.cardHeader}>
                            <Text className="text-[15px] font-poppins-medium text-foreground" numberOfLines={1}>
                                {device.name}
                            </Text>
                        </View>

                        <Text className="text-xs text-text-secondary font-poppins mb-3">
                            {device.specs}
                        </Text>

                        <View style={styles.priceContainer}>
                            <Text className="text-[16px] font-poppins-semibold text-[#0072CE]">
                                RWF {device.price.toLocaleString()}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buyButton}
                            activeOpacity={0.8}
                            onPress={() => handleWhatsAppOrder(device)}
                        >
                            <LinearGradient
                                colors={['#F7941D', '#f5a623']}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Ionicons name="logo-whatsapp" size={16} color="#fff" />
                                <Text className='text-white dark:text-foreground text-sm font-medium'>Order </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-white dark:bg-background border border-[#03022920] dark:border-[#ffffff20] rounded-xl items-center justify-center"
                            style={styles.viewButton}
                            activeOpacity={0.7}
                            onPress={() => openDeviceDetails(device)}
                        >
                            <Ionicons name="eye-outline" size={16} className="text-text-secondary" />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );

    return (
        <Screen>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <View>
                        <Text className="text-sm text-text-secondary">Discover</Text>
                        <Text className="text-lg font-poppins-medium mt-2 text-primary">Latest Devices</Text>
                    </View>
                </View>

                {/* Search Input */}
                <View style={styles.searchWrapper}>
                    <View className="bg-white dark:bg-surface" style={styles.searchBar}>
                        <Ionicons name="search-outline" size={20} color="#9ca3af" />
                        <TextInput className="text-foreground"
                            style={styles.searchInput}
                            placeholder="Search devices..."
                            placeholderTextColor="#9ca3af"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            returnKeyType="search"
                            clearButtonMode="while-editing"
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setSearchQuery('')}
                                style={styles.clearButton}
                            >
                                <Ionicons name="close-circle" size={20} color="#9ca3af" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Results Count */}
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultsText}>
                        {filteredDevices.length} {filteredDevices.length === 1 ? 'device' : 'devices'} available
                    </Text>
                    {searchQuery.length > 0 && (
                        <Text style={styles.searchQueryText}>
                            for "{searchQuery}"
                        </Text>
                    )}
                </View>

                {/* Devices Grid */}
                {filteredDevices.length > 0 ? (
                    <View style={[styles.grid, { gap }]}>
                        {filteredDevices.map((device) => (
                            <DeviceCard key={device.id} device={device} />
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="search-outline" size={64} color="#d1d5db" />
                        <Text className="text-lg font-poppins-medium text-foreground" style={{ marginVertical: 12 }}>
                            No devices found
                        </Text>
                        <Text className="text-sm text-text-secondary" style={{ marginBottom: 20 }}>
                            Try adjusting your search
                        </Text>
                        <TouchableOpacity className="bg-[#0072CE] dark:bg-surface rounded-xl px-4 py-2"
                            onPress={() => setSearchQuery('')}
                        >
                            <Text className="text-sm font-poppins-medium dark:text-foreground" style={styles.clearFiltersText}>
                                Clear Search
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Bottom Spacing */}
                <View style={styles.bottomSpacing} />
            </ScrollView>

            {/* Device Details Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View className="bg-white dark:bg-surface" style={styles.modalContent}>
                        {/* Modal Header */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.modalCloseButton}
                            >
                                <Ionicons name="close" size={24} className="text-foreground" />
                            </TouchableOpacity>
                            <Text className="text-foreground font-poppins text-[18px]">Device Details</Text>
                            <View style={styles.modalPlaceholder} />
                        </View>

                        {selectedDevice && (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.modalImageContainer}>
                                    <Image source={selectedDevice.image} style={styles.modalImage} />
                                </View>
                                <View style={styles.modalInfoContainer}>
                                    <Text className="dark:text-foreground" style={styles.modalDeviceName}>{selectedDevice.name}</Text>
                                    <Text style={styles.modalDeviceSpecs}>{selectedDevice.specs}</Text>

                                    <View style={styles.modalPriceContainer}>
                                        <Text style={styles.modalDevicePrice}>
                                            RWF {selectedDevice.price.toLocaleString()}
                                        </Text>
                                    </View>
                                    {selectedDevice.description && (
                                        <View style={styles.modalSection}>
                                            <Text className="dark:text-foreground" style={styles.modalSectionTitle}>Description</Text>
                                            <Text className="dark:text-text-secondary" style={styles.modalDescription}>
                                                {selectedDevice.description}
                                            </Text>
                                        </View>
                                    )}
                                    {selectedDevice.storage && (
                                        <View style={styles.modalSection}>
                                            <Text className="dark:text-foreground" style={styles.modalSectionTitle}>Storage Options</Text>
                                            <View style={styles.modalStorageContainer}>
                                                {selectedDevice.storage.map((storage, index) => (
                                                    <View className="dark:bg-background" key={index} style={styles.modalStorageItem}>
                                                        <Text className="dark:text-foreground" style={styles.modalStorageText}>{storage}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                    <TouchableOpacity
                                        style={styles.modalOrderButton}
                                        onPress={() => {
                                            setModalVisible(false);
                                            handleWhatsAppOrder(selectedDevice);
                                        }}
                                    >
                                        <LinearGradient
                                            colors={['#F7941D', '#f5a623']}
                                            style={styles.modalOrderGradient}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                        >
                                            <Ionicons name="logo-whatsapp" size={24} color="#fff" />
                                            <Text style={styles.modalOrderText}>Order Now on WhatsApp</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    searchWrapper: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 2,
        borderRadius: 26,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f0f2f5',
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Poppins',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginLeft: 4,
    },
    clearButton: {
        padding: 4,
    },
    resultsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 8,
    },
    resultsText: {
        fontSize: 13,
        color: '#6b7280',
        fontFamily: 'Poppins',
    },
    searchQueryText: {
        fontSize: 13,
        color: '#0072CE',
        fontFamily: 'Poppins-SemiBold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
    },
    card: {
        borderRadius: 16,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        marginBottom: 16,
        overflow: 'hidden',
    },
    cardGradient: {
        borderRadius: 14,
        overflow: 'hidden',
    },
    newBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#F7941D',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        zIndex: 1,
    },
    newBadgeText: {
        fontSize: 10,
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        letterSpacing: 0.5,
    },
    imageContainer: {
        padding: 4,
    },
    deviceImage: {
        width: '100%',
        height: 130,
        resizeMode: 'contain',
    },
    cardContent: {
        padding: 14,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    deviceName: {
        fontSize: 15,
        flex: 1,
        letterSpacing: -0.3,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    buyButton: {
        flex: 1.5,
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonGradient: {
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 6,
    },
    viewButton: {
        flex: 0.5,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    clearFiltersText: {
        fontSize: 14,
        color: '#ffffff',
        fontFamily: 'Poppins',
    },
    bottomSpacing: {
        height: 40,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '90%',
        minHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f2f5',
        fontFamily: 'Poppins'
    },
    modalCloseButton: {
        padding: 4,
    },
    modalPlaceholder: {
        width: 32,
    },
    modalImageContainer: {
        padding: 20,
        alignItems: 'center',
    },
    modalImage: {
        width: width * 0.6,
        height: 200,
        resizeMode: 'contain',
    },
    modalInfoContainer: {
        padding: 20,
    },
    modalDeviceName: {
        fontSize: 20,
        fontFamily: 'Poppins-medium',
        marginBottom: 4,
    },
    modalDeviceSpecs: {
        fontSize: 14,
        color: '#7f8fa6',
        fontFamily: 'Poppins',
        marginBottom: 12,
    },
    modalPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    modalDevicePrice: {
        fontSize: 20,
        color: '#0072CE',
        fontFamily: 'Poppins-SemiBold',
    },
    modalSection: {
        marginBottom: 16,
    },
    modalSectionTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-medium',
        marginBottom: 8,
    },
    modalDescription: {
        fontSize: 14,
        color: '#6b7280',
        fontFamily: 'Poppins',
        lineHeight: 22,
    },

    modalStorageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    modalStorageItem: {
        backgroundColor: '#f8f9fe',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    modalStorageText: {
        fontSize: 13,
        color: '#030229',
        fontFamily: 'Poppins-medium',
    },
    modalOrderButton: {
        marginTop: 8,
        borderRadius: 12,
        overflow: 'hidden',
    },
    modalOrderGradient: {
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    modalOrderText: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: 'Poppins-medium',
    },
});

export default DevicesScreen;