import { cn } from "@/lib/utils";
import { Text as RNText } from "react-native";

type TextProps = React.ComponentProps<typeof RNText>;

const Text = ({ className, ...props }: TextProps) => {
  return (
    <RNText
      className={cn(
        "font-poppins text-foreground",
        className
      )}
      {...props}
    />
  );
};
export default Text;