import React from "react";
import { View, Text } from "react-native";

export default function OrderItems({ item }) {
  const { title, price } = item;
  const priceINR = Number(price.replace("$", ""));

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#999",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          color: "black",
        }}
      >
        {title}
      </Text>
      <Text style={{ opacity: 0.7, fontSize: 16 }}>₹ {priceINR * 10}</Text>
    </View>
  );
}
