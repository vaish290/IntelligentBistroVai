import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export default function HeroCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>Meet Bistro AI</Text>
      <Text style={styles.title}>Order naturally. We’ll handle the cart.</Text>
      <Text style={styles.description}>
        Try commands like “Add two paneer tikka wraps and a mango smoothie”.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    padding: 22,
    marginBottom: 22,
  },
  kicker: {
    color: "#DDD6FE",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
  },
  title: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: "900",
    lineHeight: 31,
  },
  description: {
    color: "#E9D5FF",
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
  },
});