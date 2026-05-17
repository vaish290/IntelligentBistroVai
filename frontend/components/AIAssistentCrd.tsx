import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { COLORS } from "../constants/theme";
import type { MenuItem } from "../data/menu";
import { sendOrderMessage } from "../services/api";

type Props = {
  onAdd: (item: MenuItem, quantity?: number) => void;
  onClear: () => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
};

export default function AIAssistentCrd({
  onAdd,
  onClear,
  onRemove,
  onUpdateQuantity,
}: Props) {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const result = await sendOrderMessage(message);

      result.actions.forEach((action: any) => {
        if (action.type === "ADD_ITEM") {
          onAdd(action.item, action.quantity);
        }

        if (action.type === "REMOVE_ITEM") {
          onRemove(action.itemId);
        }

        if (action.type === "UPDATE_QUANTITY") {
          onUpdateQuantity(action.itemId, action.quantity);
        }

        if (action.type === "CLEAR_CART") {
          onClear();
        }
      });

      setReply(result.reply);
      setMessage("");
    } catch (error) {
      setReply("Could not connect to backend. Please check your API URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>BISTRO AI</Text>
      <Text style={styles.title}>Tell me what to add</Text>

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Try: Make Mango Smoothie quantity 4"
        placeholderTextColor={COLORS.mutedText}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleSend} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Send</Text>
        )}
      </Pressable>

      {reply ? <Text style={styles.reply}>{reply}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 14,
  },
  input: {
    backgroundColor: COLORS.cardSoft,
    color: COLORS.text,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.text,
    fontWeight: "900",
  },
  reply: {
    color: COLORS.secondary,
    marginTop: 12,
    fontWeight: "800",
  },
});