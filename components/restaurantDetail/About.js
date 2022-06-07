import React from "react";
import { View, Text, Image, StatusBar } from "react-native";

export default function About(props) {
  const { name, image, price, reviews, rating, categories } =
    props.route.params;

  const formattedCategories = categories.map((cat) => cat.title).join(" • ");

  const description = `${formattedCategories} ${" • ₹₹"} • 🎫 • ${rating} ⭐ (${reviews}+)`;
  return (
    <View style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor={'rgba(52,52,52,0.4)'} />
      <RestaurantImage image={image} />
      <View style={{ backgroundColor: "white", borderTopRightRadius: 30, borderTopLeftRadius: 30, top: -25, }}>
        <RestaurantName name={name} />
        <RestaurantDescription description={description} />
      </View>
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ width: "100%", height: 250 }} />
);

const RestaurantName = (props) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: "600",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.name}
  </Text>
);

const RestaurantDescription = (props) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: "400",
      fontSize: 15.5,
    }}
  >
    {props.description}
  </Text>
);
