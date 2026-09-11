import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS } from "../constants/theme";

export default function OrderSuccessScreen() {
  const router = useRouter();

  const { total, orderId } = useLocalSearchParams<{
    total: string;
    orderId: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✓</Text>

      <Text style={styles.title}>Payment Successful</Text>

      <Text style={styles.subtitle}>
        Your order has been placed successfully.
      </Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Order ID</Text>
          <Text style={styles.value}>{orderId}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>${total}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.status}>Confirmed</Text>
        </View>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>
          Back to Menu
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: "center",
  },

  icon: {
    fontSize: 64,
    textAlign: "center",
    color: "#22C55E",
    marginBottom: 16,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    color: COLORS.mutedText,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 28,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  label: {
    color: COLORS.mutedText,
  },

  value: {
    color: COLORS.text,
    fontWeight: "800",
  },

  status: {
    color: "#22C55E",
    fontWeight: "900",
  },

  button: {
    backgroundColor: "#7C3AED",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },
});