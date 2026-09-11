import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";

import { useCartStore } from "../components/store/cartStore";
import { COLORS } from "../constants/theme";
import { createPaymentIntent } from "../services/api";
import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";
import { saveOrder } from "../services/api";

export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;

  const total = subtotal + tax;

  const handlePayment = async () => {
        try {
          const amountInCents = Math.round(total * 100);

          const { clientSecret } = await createPaymentIntent(cart);

          const { error: initError } = await initPaymentSheet({
            merchantDisplayName: "Intelligent Bistro",
            paymentIntentClientSecret: clientSecret,
          });

          if (initError) {
            Alert.alert("Payment Error", initError.message);
            return;
          }

          const { error: paymentError } = await presentPaymentSheet();

          if (paymentError) {
            Alert.alert("Payment Failed", paymentError.message);
            return;
          }

          const orderId = `ORD-${Date.now()}`;
          await saveOrder({
            orderId,

            items: cart.map((item) => ({
              itemId: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),

            subtotal: Number(subtotal.toFixed(2)),
            tax: Number(tax.toFixed(2)),
            total: Number(total.toFixed(2)),

            paymentStatus: "paid",
          });

          clearCart();

          router.replace({
            pathname: "/order-success",
            params: {
              total: total.toFixed(2),
              orderId,
            },
          });
          
        } catch (error) {
          console.log("PAYMENT ERROR:", error);

          Alert.alert(
            "Payment Error",
            "Something went wrong while processing payment."
          );
        }
      };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {cart.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <View>
            <Text style={styles.itemName}>
              {item.name}
            </Text>

            <Text style={styles.quantity}>
              Qty: {item.quantity}
            </Text>
          </View>

          <Text style={styles.price}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.summaryText}>
            Subtotal
          </Text>

          <Text style={styles.summaryText}>
            ${subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.summaryText}>
            Tax
          </Text>

          <Text style={styles.summaryText}>
            ${tax.toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.totalText}>
            Total
          </Text>

          <Text style={styles.totalText}>
            ${total.toFixed(2)}
          </Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>
          Proceed to Payment
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 20,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  quantity: {
    color: COLORS.text,
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  summary: {
    marginTop: 20,
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  summaryText: {
    color: COLORS.text,
    fontSize: 16,
  },

  totalText: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },

  button: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#7C3AED",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});