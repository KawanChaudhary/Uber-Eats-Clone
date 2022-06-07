import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import firebase from "../firebase";
import MenuItems from "../components/restaurantDetail/MenuItems";


// import "firebase/compat/firestore";
// import { getDocs } from "firebase/firestore";


export default function OrderCompleted({ navigation }) {
  const [lastOrder, setlastOrder] = useState({
    items: [
      {
        title: "Chilly Pasta",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image:
          "https://www.rajnisrecipe.com/wp-content/uploads/2016/12/pasta.jpg",
      },
    ],
  });

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setlastOrder(doc.data());
        });
      });

    return () => unsubscribe();
  }, []);

  // total
  const totalINR = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <StatusBar translucent={true} barStyle="dark-content" backgroundColor={'transparent'} />
      <View
        style={{
          flex: 1,
          margin: 15,
          alignItems: "center",
          height: "100%",
        }}
      >
        <LottieView
          style={{
            height: 100,
            alignSelf: "center",
            marginBottom: 10,
          }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Your order at {restaurantName} has been placed for ₹ {totalINR * 10}.
        </Text>
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <MenuItems foods={lastOrder.items} hideCheckbox={true} />
        </ScrollView>
        <LottieView
          style={{
            height: 300,
            alignSelf: "center",
            marginRight: 10,
          }}
          source={require("../assets/animations/delivery.json")}
          autoPlay
          speed={1}
          loop={true}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "green",
            borderRadius: 30,
            alignItems: "center",
            padding: 13,
            width: 300,
            marginBottom: 30,
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            Let's Go Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
    backgroundColor: "white",
  },
});
