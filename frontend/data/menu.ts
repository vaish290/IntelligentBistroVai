export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Paneer Tikka Wrap",
    price: 9.99,
    description:
      "Grilled paneer, onions, peppers, mint sauce in a warm wrap.",
    category: "Wrap",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Veggie Burger",
    price: 10.99,
    description:
      "Plant-based patty with lettuce, tomato, cheese, and house sauce.",
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Loaded Cheese Fries",
    price: 5.49,
    description:
      "Crispy fries topped with melted cheese and jalapeños.",
    category: "Side",
    image:
      "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Caesar Salad",
    price: 7.99,
    description:
      "Fresh romaine lettuce, parmesan, croutons, and Caesar dressing.",
    category: "Salad",
    image:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Mango Smoothie",
    price: 4.99,
    description:
      "Refreshing mango smoothie blended with yogurt and ice.",
    category: "Drink",
    image:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Masala Lemon Soda",
    price: 3.49,
    description:
      "Sparkling lemon soda with Indian spices and mint.",
    category: "Drink",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
  },
];