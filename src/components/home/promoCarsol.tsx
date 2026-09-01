import { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 16;
const BANNER_WIDTH = SCREEN_WIDTH - CARD_MARGIN * 2;
const AUTO_SCROLL_INTERVAL = 4000;


const BANNER_IMAGES = [
    require('@/assets/images/homeimg6.jpeg'),
    require('@/assets/images/homeimg7.jpeg'),
    require('@/assets/images/homeimg4.jpeg'),
];

// ---------------- Auto-scrolling banner ----------------
const PromoCarousel = () => {
    const scrollRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const indexRef = useRef(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const next = (indexRef.current + 1) % BANNER_IMAGES.length;
            scrollRef.current?.scrollTo({ x: next * BANNER_WIDTH, animated: true });
            indexRef.current = next;
            setActiveIndex(next);
        }, AUTO_SCROLL_INTERVAL);
        return () => clearInterval(timer);
    }, []);

    const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / BANNER_WIDTH);
        indexRef.current = index;
        setActiveIndex(index);
    };

    return (
        <View>
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onScrollEnd}
                style={styles.carousel}
            >
                {BANNER_IMAGES.map((src, i) => (
                    <Image
                        key={i}
                        source={src}
                        style={{
                            width: BANNER_WIDTH, height: 100,
                            opacity: .7
                        }}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>
            <View style={styles.dotsRow}>
                {BANNER_IMAGES.map((_, i) => (
                    <View className='bg-[#0072CE] dark:bg-surface' key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    carousel: {
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        backgroundColor: '#000000'
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginTop: 10,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3
    },
    dotActive: {
        width: 16,
        backgroundColor: '#0072CE',
    },
})
export default PromoCarousel