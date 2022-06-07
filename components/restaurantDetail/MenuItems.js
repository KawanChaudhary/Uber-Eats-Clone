import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Divider } from "react-native-elements";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function MenuItems({
  restaurantName,
  foods,
  hideCheckbox,
  marginLeft,
}) {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });

  const size = foods.length;

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title === food.title));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View
            style={{
              marginVertical: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
              marginBottom: index === size - 1 ? 60 : 15,
            }}
          >
            {!hideCheckbox && (
              <BouncyCheckbox
                iconStyle={{ borderColor: "lightgrey", borderRadius: 8 }}
                fillColor="green"
                isChecked={isFoodInCart(food, cartItems)}
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
              />
            )}
            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
          <Divider
            // width={1}
            style={{ color: "black", marginHorizontal: 20 }}
            orientation="vertical"
          />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = (props) => {
  const total = Number(props.food.price.replace("$", ""));
  return (
    <View
      style={{
        width: 240,
        justifyContent: "space-evenly",
      }}
    >
      <Text style={styles.title}>{props.food.title}</Text>
      <Text>{props.food.description}</Text>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "bold",
        }}
      >
        ₹ {total * 10}
      </Text>
    </View>
  );
};

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{
        width: 100,
        height: 95,
        borderRadius: 8,
        marginLeft: marginLeft,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: "bold",
  },
});
