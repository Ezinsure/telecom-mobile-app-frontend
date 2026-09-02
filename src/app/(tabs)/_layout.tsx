import { Tabs } from "expo-router";
import {
  GamepadDirectional,
  Info,
  LayoutDashboard,
  LucideIcon,
  Phone,
  Wifi,
} from "lucide-react-native";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

const ACTIVE_COLOR = "#0072CE";
const INACTIVE_COLOR_LIGHT = "#03022999";
const INACTIVE_COLOR_DARK = "#FFFFFF80";
const ACTIVE_BG = "#E8F2FC";

type TabIconProps = {
  focused: boolean;
  label: string;
  Icon: LucideIcon;
};

const TabsLayout = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const inactiveColor = isDark ? INACTIVE_COLOR_DARK : INACTIVE_COLOR_LIGHT;

  const TabIcon = ({ focused, label, Icon }: TabIconProps) => {
    return (
      <View
        style={[
          styles.iconWrapper,
          focused &&
            (isDark ? styles.iconWrapperActiveDark : styles.iconWrapperActive),
        ]}
      >
        <Icon
          size={focused ? 16 : 20}
          color={focused ? ACTIVE_COLOR : inactiveColor}
          strokeWidth={focused ? 2 : 1.8}
        />

        {focused && <Text style={styles.activeLabel}>{label}</Text>}
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          ...styles.tabBar,
          ...(isDark ? styles.tabBarDark : {}),
        },
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Home" Icon={LayoutDashboard} />
          ),
        }}
      />

      <Tabs.Screen
        name="internet"
        options={{
          tabBarLabel: "Internet",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Internet" Icon={Wifi} />
          ),
        }}
      />

      <Tabs.Screen
        name="voLTE"
        options={{
          tabBarLabel: "Voice",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="VoLTE" Icon={Phone} />
          ),
        }}
      />

      <Tabs.Screen
        name="devices"
        options={{
          tabBarLabel: "Devices",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              label="Devices"
              Icon={GamepadDirectional}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="support"
        options={{
          tabBarLabel: "Support",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} label="Support" Icon={Info} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 14,
    height: 70,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    elevation: 12,
    shadowColor: "#0A0A23",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    paddingHorizontal: 6,
  },
  tabBarDark: {
    backgroundColor: "rgba(27, 34, 44, 0.9)",
    shadowColor: "#000000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },

  tabItem: {
    paddingTop: 16,
    paddingBottom: 10,
  },

  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  iconWrapperActiveDark: {
    backgroundColor: "rgba(10, 104, 206, 0.16)",
  },

  iconWrapperActive: {
    backgroundColor: ACTIVE_BG,
  },

  activeLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: ACTIVE_COLOR,
  },
});
