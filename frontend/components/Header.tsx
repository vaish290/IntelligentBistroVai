import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export default function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>AI FULL-STACK CHALLENGE</Text>
        <Text style={styles.title}>Intelligent Bistro</Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>AI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 55,
    marginBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.1,
  },
  title: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "900",
    marginTop: 4,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 16,
  },
});