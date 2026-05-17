import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import Header from "../components/Header";
import HeroCard from "../components/HeroCard";
import AIAssistentCrd from "../components/AIAssistentCrd";
import CategoryPills from "../components/CategoryPills";
import MenuCard from "../components/MenuCard";
import CartSection from "../components/CartSection";

import { COLORS } from "../constants/theme";
import { menuItems } from "../data/menu";
import { useCartStore } from "../components/store/cartStore";

export default function HomeScreen() {
  const {
    cart,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    clearCart,
  } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />

      <HeroCard />

      <AIAssistentCrd
        onAdd={addItem}
        onClear={clearCart}
        onRemove={removeItem}
        onUpdateQuantity={updateQuantity}
      />

      <CategoryPills />

      <Text style={styles.sectionTitle}>Vegetarian Menu</Text>

      {menuItems.map((item) => (
        <MenuCard key={item.id} item={item} onAdd={addItem} />
      ))}

      <CartSection
        cart={cart}
        total={total}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onClear={clearCart}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 14,
  },
});