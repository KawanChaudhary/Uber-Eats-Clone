import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Animated, Platform } from "react-native";
import { Icon } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LottieView from "lottie-react-native";

export const localRestaurants = [
  {
    name: "Beachside Bar",
    image_url:
      "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Benihana",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 3.7,
  },
  {
    name: "India's Grill",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    categories: ["Indian", "Bar"],
    price: "$$",
    reviews: 700,
    rating: 4.9,
  },
];

export default function RestaurantItems({ navigation, ...props }) {

  return (
    <>
      {props.restaurantData.map((restaurant, index) => (

        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 5 }}
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.review_count,
              rating: restaurant.rating,
              categories: restaurant.categories,
            })
          }
        >
          <View
            style={{ marginTop: 5, paddingHorizontal: 5, paddingTop: 5, backgroundColor: "white", borderRadius: 10, marginHorizontal: 8, height: 220 }}
          >
            <RestaurantImage image={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>

      ))
      }

    </>
  );
}

const RestaurantImage = (props) => {
  const index = 10;
  const [liked, setLiked] = useState(false);
  const [counter, setCounter] = useState(-2);
  const [visible, setVisible] = useState(false);

  const OnPressLike = () => {
    if (liked == false) {
      setVisible(true);
    }
    setLiked(!liked);
    setCounter(index)
  }

  const currentValue = new Animated.Value(1);

  useEffect(() => {
    if (liked) {
      Animated.spring(currentValue, {
        toValue: 2,
        friction: 3,
        useNativeDriver: true
      }).start(() => { setVisible(false) })
    }
  }, [liked])

  return (
    <>
      <Image
        source={{
          uri: props.image,
        }}
        style={{ width: "100%", height: 180, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
      />
      <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
        {/* <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" /> */}
        <Icon name={liked && (index == counter) ? "favorite" : "favorite-border"}
          type="material"
          color={liked && (index == counter) ? "#da2c43" : "#fff"}
          size={30}
          onPress={OnPressLike}
        />
      </TouchableOpacity>
      <View style={{ marginTop: 0, alignItems: 'center', justifyContent: 'center', }}>
        {visible && (index == counter) &&
          <Animated.View style={{ transform: [{ scale: currentValue }] }} >
            <LottieView
              style={{
                height: 100,
                top: Platform.OS === 'ios' ? -32 : -50,
                width: 100,
                position: "absolute",
                alignSelf: "center",
                justifyContent: "center",
              }}
              source={require("../../assets/animations/heart-beat.json")}
              autoPlay
              speed={1}
              loop={false}
            />
          </Animated.View>
        }
      </View>
    </>
  )
};

const RestaurantInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      top: -15,
      paddingTop: 5,
      paddingHorizontal: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>
      <Text style={{ fontSize: 13, color: "gray" }}>30-45 • min</Text>
    </View>
    <View
      style={{
        backgroundColor: "#eee",
        height: 30,
        paddingHorizontal: 5,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        borderRadius: 15,
      }}
    >
      <Text>{props.rating}</Text>
      <Icon
        name="star"
        type="font-awesome"
        size={18}
        color="#ffd700"
        style={{ marginLeft: 5 }}
      />
    </View>
  </View>
);
