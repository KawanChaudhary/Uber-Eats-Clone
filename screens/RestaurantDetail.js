import React from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";

const foods = [
  {
    title: "Ice Cream",
    description: "Mixer of cream, milk and flavours for ice-cream lovers.",
    price: "$7.50",
    image:
      "https://i.pinimg.com/originals/a0/4a/12/a04a124d61dfbda797a870e8ca1b2d80.jpg",
  },
  {
    title: "Shakes & Smoothies",
    description: "A sweet drink made by blending milk, ice cream, and flavorings.",
    price: "$11.00",
    image:
      "https://cimg2.ibsrv.net/cimg/www.fitday.com/693x350_85-1/166/milk-20shakes_000037275420_Small-106166.jpg",
  },
  {
    title: "Tandoori Chicken",
    description:
      "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
    price: "$16.20",
    image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
  },
  {
    title: "Butter Chicken",
    description:
      "A type of curry made from chicken with a spiced and butter ingredients.",
    price: "$19.50",
    image:
      "https://c.ndtvimg.com/2021-08/0okn1nfo_butter-chicken-meatballs_625x300_04_August_21.jpg",
  },
  {
    title: "Paneer Tikka",
    description:
      "Paneer tikka is an Indian dish made from chunks of paneer marinated in spices and grilled in a tandoor.",
    price: "$18.50",
    image:
      "https://foodiewish.com/wp-content/uploads/2020/05/Paneer-Tikka-Tawa.jpg",
  },
  {
    title: "Chicken Biryani",
    description: "It is made with Indian spices, rice and meat.",
    price: "$21.50",
    image:
      "https://vismaifood.com/storage/app/uploads/public/e12/7b7/127/thumb__1200_0_0_0_auto.jpg",
  },


  {
    title: "Dum Biryani",
    description: "Air-cooked a biryani with meat and rice in spices which are layered in a handi.",
    price: "$29.50",
    image:
      "https://recipes.timesofindia.com/thumb/msid-53096628,width-1600,height-900/53096628.jpg",
  },

  {
    title: "Lababdar Paneer",
    description: "A spiced tomato paste along onions and paneer with full of flavours.",
    price: "$24.50",
    image:
      "https://www.cubesnjuliennes.com/wp-content/uploads/2019/11/Paneer-Butter-Masala-Recipe-1-500x500.jpg",
  },
  {
    title: "Dal Makhani",
    description: "An India dish which is a modern take on the old urad ki dal with makhan.",
    price: "$22.50",
    image:
      "https://static.toiimg.com/thumb/53097626.cms?width=1200&height=900",
  },
  {
    title: "Cheese Burger",
    description: "Cheese is usually added to the cooking hamburger patty.",
    price: "$9.50",
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlZXNlJTIwYnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  },
  {
    title: "Cheese Paasta",
    description: "Dough of wheat flour mixed with cheese or eggs.",
    price: "$11.50",
    image:
      "https://images.kitchenstories.io/communityImages/148fed1a1620ba73fb830275e0cf0f72_44c57fb4-5065-456d-8ffd-3c25b6e78f2e/148fed1a1620ba73fb830275e0cf0f72_44c57fb4-5065-456d-8ffd-3c25b6e78f2e-large-landscape-150.jpg",
  },
  {
    title: "Tandoori Roti (6)",
    description: "Wheat flour is air-baked in tandoor and serve with butter.  ",
    price: "$9.90",
    image:
      "https://spicesnflavors.com/wp-content/uploads/2020/06/tandoori-roti-2-1-500x375.jpg",
  },
  {
    title: "Indian Salad",
    description: "Vibrant and fresh and loaded with fantastic spices and flavours. ",
    price: "$5.50",
    image:
      "https://i.pinimg.com/originals/aa/26/7c/aa267cc387537d4eb16b5a0bc85f60b2.jpg",
  },
];

export default function RestaurantDetail({ route, navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <About route={route} />
      <Divider width={1} style={{ marginVertical: 0 }} />
      <MenuItems restaurantName={route.params.name} foods={foods} />
      <ViewCart navigation={navigation} />
    </View>
  );
}
