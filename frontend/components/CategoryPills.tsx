import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

const categories = ["All", "Wrap", "Burger", "Side", "Salad", "Drink"];

export default function CategoryPills() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {categories.map((category, index) => (
        <Text
          key={category}
          style={[styles.pill, index === 0 && styles.activePill]}
        >
          {category}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  pill: {
    color: COLORS.mutedText,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 10,
    fontWeight: "800",
  },
  activePill: {
    color: COLORS.text,
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
});