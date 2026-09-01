import PurchaseModal from '@/components/purchaseModal';
import SettingsModal from '@/components/settingModal';
import Screen from '@/components/ui/Screen';
import Text from '@/components/ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PromoCarousel from '../../components/home/promoCarsol';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 16;
const QUICK_AMOUNTS = [1000, 2000, 5000, 10000];
type ModalType = 'recharge' | 'checkbalance' | null;

const QUICK_ACTIONS = [
  { id: 'bundle', label: 'Data Bundle', href: '/internet', icon: 'wifi' as const },
  { id: 'voice', label: 'Voice Bundle', href: '/voLTE', icon: 'call' as const },
  { id: 'support', label: 'Support', href: '/support', icon: 'headset' as const },
] as const;

const PLANS = [
  { id: 'p1', name: 'Daily 150MB', price: 200, duration: '24 hours' },
  { id: 'p2', name: 'Weekly 3GB', price: 2000, duration: '7 days' },
  { id: 'p3', name: 'Weekly 600Mins', price: 1500, duration: '7 days' },
  { id: 'p4', name: 'Monthly 30GB', price: 8900, duration: '30 days' },
  { id: 'p5', name: 'Monthly 10GB', price: 5500, duration: '30 days' },
  { id: 'p6', name: 'Monthly 20Mbps', price: 20000, duration: '30 days' },
];
type Plan = (typeof PLANS)[number];

// Recharge model 
const RechargeModal = ({
  type,
  onClose,
}: {
  type: ModalType;
  onClose: () => void;
}) => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [amountError, setAmountError] = useState('');

  // reset fields whenever a new modal is opened
  useEffect(() => {
    if (type) {
      setPhone('');
      setAmount('');
      setPhoneError('');
      setAmountError('');
    }
  }, [type]);

  const isRecharge = type === 'recharge';

  const handleSubmit = () => {
    let hasError = false;
    if (phone.replace(/\s+/g, '').length < 9) {
      setPhoneError('Enter phone number');
      hasError = true;
    }
    if (!amount || Number(amount) <= 0) {
      setAmountError('Enter  amount');
      hasError = true;
    }
    if (hasError) return;

    // TODO: call recharge/top-up API with { type, phone, amount }
    onClose();
  };

  return (
    <Modal visible={!!type} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalBackdrop}
      >
        <View className="bg-white dark:bg-surface" style={styles.modalSheet}>
          <View style={styles.modalHeaderRow}>
            <View style={styles.modalHeaderLeft}>
              <View className='dark:bg-background' style={styles.modalIconCircle}>
                <Ionicons
                  name={isRecharge ? 'flash' : 'wallet-outline'}
                  size={18}
                  className='text-[#0072CE] dark:text-foreground'
                />
              </View>
              <Text style={styles.modalTitle}>
                {isRecharge ? 'Recharge your balance' : 'Check Balance'}
              </Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={22} className='text-text-secondary' />
            </Pressable>
          </View>
          <Text className='dark:text-text-secondary' style={styles.modalSubTitle}>
            {isRecharge ? 'Add money from your Mobile Money wallet to your phone balance.' : ''}
          </Text>

          <Text style={styles.fieldLabel}>Phone number</Text>
          <TextInput
            value={phone}
            onChangeText={(t) => {
              setPhone(t);
              if (phoneError) setPhoneError('');
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

          {isRecharge && (
            <><Text style={[styles.fieldLabel, { marginTop: 16 }]}>Amount (RWF)</Text><TextInput
              value={amount}
              onChangeText={(t) => {
                setAmount(t.replace(/[^0-9]/g, ''));
                if (amountError) setAmountError('');
              }}
              placeholder="e.g. 2000"
              keyboardType="number-pad"
              className={`border rounded-xl px-4 py-2 text-sm text-foreground font-poppins ${amountError ? "border-[#E5484D] dark:border-[#E5484D]" : "border-[#03022920] dark:border-[#FFFFFF10] "}`} /></>
          )}
          {!!amountError && (
            <Text className="text-red-500 font-poppins text-xs mt-1">
              {isRecharge ? amountError : ''}
            </Text>
          )}

          {isRecharge && <View style={styles.quickAmountsRow}>
            {QUICK_AMOUNTS.map((val) => (
              <Pressable className='dark:bg-background'
                key={val}
                style={[
                  styles.quickAmountChip,
                  amount === String(val) && styles.quickAmountChipActive,
                ]}
                onPress={() => {
                  setAmount(String(val));
                  if (amountError) setAmountError('');
                }}
              >
                <Text
                  style={[
                    styles.quickAmountText,
                    amount === String(val) && styles.quickAmountTextActive,
                  ]}
                >
                  {val.toLocaleString()}
                </Text>
              </Pressable>
            ))}
          </View>}

          <View style={styles.modalButtonsRow}>
            <Pressable
              style={({ pressed }) => [
                styles.modalCancelButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={onClose}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.modalConfirmButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.modalConfirmText}>
                {isRecharge ? 'Recharge' : 'Check'}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const Index = () => {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const openModal = (type: ModalType) => setModalType(type);
  const router = useRouter();
  const { width } = useWindowDimensions()

  const getColumns = () => {
    if (width > 1024) return 4;
    if (width > 768) return 3;
    return 2;
  };

  const columns = getColumns();
  const gap = 12;
  const padding = 16;
  const cardWidth = (width - (padding * 2) - (gap * (columns - 1))) / columns;

  // Purchase popular plans 
  const handleConfirm = async (phone: string): Promise<boolean> => {
    console.log('Buying', selectedPlan?.id, 'for', phone);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return true; // return false to see the modal's error state
  };


  return (
    <Screen>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Pressable className='bg-surface rounded-full items-center justify-center h-12 w-12'
                onPress={() => setSettingsModalVisible(true)}
              >
                <Ionicons
                  name={'person-outline'}
                  size={20}
                  color="#0072CE"
                />
              </Pressable>
              <Text className="text-lg font-poppins-medium mt-4 text-primary">Welcome</Text>
            </View>
            <Image source={require('@/assets/images/icologo.png')} style={styles.logo} />
            <Pressable className='bg-surface rounded-full items-center justify-center h-8 w-8'>
              <Ionicons name="notifications-outline" size={18} color="#0072CE" />
            </Pressable>
          </View>
          <View>
            <PromoCarousel />
            <View style={styles.buttonsRow}>
              <Pressable className='bg-surface rounded-xl py-3 px-5 items-center  flex flex-row gap-3 justify-center'
                style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
                onPress={() => openModal('recharge')}
              >
                <Ionicons name="flash" size={16} className="text-[#0072CE] dark:text-foreground" />
                <Text className="text-[#0072CE] dark:text-foreground font-medium text-sm">Recharge</Text>
              </Pressable>
              <Pressable className='bg-[#0072CE] dark:bg-surface rounded-xl py-3 px-5 items-center  flex flex-row gap-3 justify-center'
                style={({ pressed }) => [pressed && styles.buttonPressed]}
                onPress={() => openModal('checkbalance')}
              >
                <Ionicons name="wallet-outline" size={16} className="text-white dark:text-foreground" />
                <Text className="text-white dark:text-foreground font-medium text-sm">Check Balance</Text>
              </Pressable>
            </View>
            <RechargeModal type={modalType} onClose={() => setModalType(null)} />
          </View>

          {/* Quick actions*/}
          <View className='border-border bg-surface p-6 rounded-2xl mt-6' style={styles.quickActions}>
            <Text className='text-text-secondary ml-4 mb-1 text-xs '>Quick links</Text>
            <View style={styles.quickActionsRow}>
              {QUICK_ACTIONS.map((action) => (
                <Pressable
                  key={action.id}
                  style={styles.quickAction}
                  onPress={() => router.push(action.href)}
                >
                  <View className='bg-background h-10 w-10 rounded-full items-center justify-center '>
                    <Ionicons name={action.icon} size={18} className='text-[#0072CE] dark:text-foreground' />
                  </View>
                  <Text style={styles.quickActionLabel}>{action.label}</Text>
                </Pressable>
              ))}
            </View></View>

          {/* Popular plans */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeader}>POPULAR PLANS</Text>
          </View>
          <View style={styles.plansGrid}>
            {PLANS.map((plan) => (
              <View className='bg-surface' key={plan.id} style={[styles.planCard, { width: cardWidth }]}>
                <Text className='text-foreground text-[13px] font-medium' >{plan.name}</Text>
                <Text className='text-primary font-semibold mt-3 text-base'>{plan.price.toLocaleString()} RWF</Text>
                <Text className='text-text-secondary text-xs'>{plan.duration}</Text>
                <Pressable className='bg-background mt-3 rounded-lg py-2 items-center'
                  onPress={() => setSelectedPlan(plan)}
                >
                  <Text className='text-primary dark:text-foreground font-medium text-xs'>Buy</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <PurchaseModal
        visible={!!selectedPlan}
        plan={
          selectedPlan
            ? {
              title: selectedPlan.name,
              subtitle: selectedPlan.duration,
              price: selectedPlan.price,
            }
            : null
        }
        onClose={() => setSelectedPlan(null)}
        onConfirm={handleConfirm}
      />
      {/* Settings Modal */}
      <SettingsModal
        visible={settingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
      />

    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CARD_MARGIN,
    paddingTop: 13,
    paddingBottom: 13
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  primaryButton: {
    shadowColor: '#0A0A23',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.7,
  },

  // Modal
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 16,
    backgroundColor: '#E8F2FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#030229',
    fontFamily: "Poppins"
  },
  modalSubTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#03022990',
    fontFamily: "Poppins",
    marginBottom: 16
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#03022990',
    marginBottom: 6,
    fontFamily: "Poppins"

  },
  input: {
    borderWidth: .5,
    borderColor: '#03022950',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#030229',
    fontFamily: "Poppins"
  },
  quickAmountsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  quickAmountChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F4F7FB',
  },
  quickAmountChipActive: {
    backgroundColor: '#0072CE',
  },
  quickAmountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#030229',
    fontFamily: "Poppins"
  },
  quickAmountTextActive: {
    color: '#FFFFFF',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
    paddingHorizontal: CARD_MARGIN,
  },
  modalCancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E5F0',
  },
  modalCancelText: {
    color: '#030229',
    fontWeight: '600',
    fontSize: 13,
  },
  modalConfirmButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#0072CE',
  },
  modalConfirmText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },

  // Quick actions
  quickActions: {
    marginHorizontal: CARD_MARGIN,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  quickAction: {
    alignItems: 'center',
    gap: 8,
    width: (SCREEN_WIDTH - CARD_MARGIN * 2) / 4,
  },
  quickActionLabel: {
    fontSize: 11,
    color: '#030229',
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: "Poppins"
  },

  // Section headers
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: CARD_MARGIN,
    marginTop: 28,
    marginBottom: 14,
    fontFamily: 'Poppins'
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '400',
    color: '#030229',
  },
  sectionSeeAll: {
    fontSize: 13,
    color: '#0072CE',
    fontWeight: '400',
    fontFamily: "Poppins"
  },

  // Plan cards
  plansGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 10,
  },
  planCard: {
    borderRadius: 10,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#30229',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

});
export default Index;
