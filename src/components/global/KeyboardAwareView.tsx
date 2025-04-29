import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  ScrollView,
  View,
} from "react-native";

interface Props extends KeyboardAvoidingViewProps, PropsWithChildren {
  centerContent?: boolean;
  className?: string;
}

export default function ({
  children,
  centerContent,
  className = "",
  ...props
}: Props) {
  const isWeb = Platform.OS === "web";

  const ContentWrapper = (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      centerContent={centerContent}
    >
      {children}
    </ScrollView>
  );

  if (isWeb) {
    return <View className={`h-full p-2 ${className}`}>{ContentWrapper}</View>;
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      className={`h-full p-2 ${className}`}
      {...props}
    >
      {ContentWrapper}
    </KeyboardAvoidingView>
  );
}
