import React from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { COLORS } from "../constants/theme";
import type { CartItem } from "./store/cartStore";

type Props = {
  cart: CartItem[];
  total: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onClear: () => void;
};

export default function CartSection({
  cart,
  total,
  onIncrease,
  onDecrease,
  onClear,
}: Props) {
  const handleCheckout = () => {
    Alert.alert(
      "Order Confirmed",
      "Your vegetarian order has been placed successfully. Estimated pickup time: 20 minutes."
    );
    onClear();
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>

        {cart.length > 0 && (
          <Pressable onPress={onClear}>
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        )}
      </View>

      {cart.length === 0 ? (
        <Text style={styles.empty}>No items yet. Add something delicious.</Text>
      ) : (
        cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                ${item.price.toFixed(2)} × {item.quantity}
              </Text>
            </View>

            <View style={styles.quantityRow}>
              <Pressable
                style={styles.qtyButton}
                onPress={() => onDecrease(item.id)}
              >
                <Text style={styles.qtyText}>−</Text>
              </Pressable>

              <Text style={styles.qtyNumber}>{item.quantity}</Text>

              <Pressable
                style={styles.qtyButton}
                onPress={() => onIncrease(item.id)}
              >
                <Text style={styles.qtyText}>+</Text>
              </Pressable>
            </View>
          </View>
        ))
      )}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
      </View>

      {cart.length > 0 && (
        <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: 18,
    marginTop: 12,
    marginBottom: 45,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 12,
  },
  clearText: {
    color: COLORS.danger,
    fontWeight: "900",
  },
  empty: {
    color: COLORS.mutedText,
    marginBottom: 14,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  name: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
  },
  meta: {
    color: COLORS.mutedText,
    marginTop: 3,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qtyButton: {
    backgroundColor: COLORS.cardSoft,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: "900",
  },
  qtyNumber: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "900",
    minWidth: 18,
    textAlign: "center",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 14,
  },
  totalLabel: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
  },
  total: {
    color: COLORS.secondary,
    fontSize: 21,
    fontWeight: "900",
  },
  checkoutButton: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
  },
  checkoutText: {
    color: "#07110B",
    fontWeight: "900",
    fontSize: 15,
  },
});