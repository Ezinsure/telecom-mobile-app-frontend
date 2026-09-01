import { ReactNode } from "react";
import { View } from "react-native";

type ScreenProps = {
    children: ReactNode;
    className?: string;
};

const Screen = ({ children, className = "" }: ScreenProps) => {
    return (
        <View className={`flex-1 bg-background ${className}`}>
            {children}
        </View>
    );
};
export default Screen;