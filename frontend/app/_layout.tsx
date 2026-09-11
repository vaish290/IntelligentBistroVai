import { Stack } from "expo-router";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function RootLayout() {
  return (
    <StripeProvider publishableKey="pk_test_51UE2XsC6CrnzqgLL84H8HnMxkQv0YsSE4WBBzjYB9Sgx81qlohhGi07WRpHub0894WSbYyi3La3lWxiMR3AFLFsj007beOMM8M">
      <Stack screenOptions={{ headerShown: false }} />
    </StripeProvider>
  );
}