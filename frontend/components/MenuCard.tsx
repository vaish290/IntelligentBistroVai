import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import { MenuItem } from "../data/menu";

type Props = {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
};

export default function MenuCard({ item, onAdd }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.footer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>

          <Pressable style={styles.addButton} onPress={() => onAdd(item)}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 12,
    marginBottom: 14,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: 105,
    height: 115,
    borderRadius: 18,
    backgroundColor: COLORS.cardSoft,
  },
  content: {
    flex: 1,
    marginLeft: 13,
  },
  category: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  name: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },
  description: {
    color: COLORS.mutedText,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 999,
  },
  addText: {
    color: COLORS.text,
    fontWeight: "900",
  },
});