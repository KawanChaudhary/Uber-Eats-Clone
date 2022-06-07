import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from "react-native";
import { useSelector } from "react-redux";
import OrderItems from "./OrderItem";
import firebase from "../../firebase";
import LottieView from "lottie-react-native";

// import "firebase/compat/firestore";


export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setloading] = useState(false);

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const totalItems = items.length;
  // total
  const totalINR = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);



  const addOrderToFireBase = () => {
    setloading(true);
    const db = firebase.firestore();
    db.collection("orders")
      .add({
        items: items,
        restaurantName: restaurantName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTimeout(() => {
          setloading(false);
          navigation.navigate("OrderCompleted");
        }, 2500);
      });
  };

  const checkModal = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          {items.map((item, index) => (
            <OrderItems key={index} item={item} />
          ))}
          <View style={styles.subTotalContainer}>
            <Text style={styles.subTotal}>Subtotal:</Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              ₹ {totalINR * 10}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                borderRadius: 30,
                alignItems: "center",
                padding: 13,
                width: 300,
                position: "relative",
              }}
              onPress={() => {
                addOrderToFireBase();
                setModalVisible(false);
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                }}
              >
                Checkout
              </Text>
              <Text
                style={{
                  position: "absolute",
                  right: 20,
                  color: "white",
                  fontSize: 15,
                  top: 17,
                }}
              >
                ₹ {totalINR ? totalINR * 10 : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkModal()}
      </Modal>
      {totalINR ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: Platform.OS === 'ios' ? 20 : 2,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                borderRadius: 40,
                width: 300,
                position: "relative",
              }}
              activeOpacity={0.7}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: "white", fontSize: 15 }}>
                {totalItems > 1 ? "Items" : "Item"}: {totalItems}
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>View Cart</Text>
              <Text style={{ color: "white", fontSize: 15 }}>
                ₹ {totalINR * 10}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={1}
            loop={true}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    height: "60%",
    borderWidth: 1,
  },

  restaurantName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },

  subTotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  subTotal: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
});
