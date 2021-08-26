import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectOrigin } from "../slices/NavSlice";

const data = [
  {
    id: "1",
    title: "Get a ride",
    image:
      "https://iconarchive.com/download/i99117/icons-land/transporter/Car-Left-Red.ico",
    screen: "MapScreen",
  },
  {
    id: "2",
    title: "Order Food",
    image:
      "https://cdn.iconscout.com/icon/free/png-512/fast-food-1851561-1569286.png",
    screen: "EatsScreen",
  },
];

const NavOption = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pt-6 pb-8 bg-gray-200 m-2 w-36`}
          disabled={!origin}
        >
          <View style={tw`${!origin && "opacity-20"}`}>
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: "contain",
              }}
              source={{ uri: item.image }}
            />
            <Text style={tw`font-semibold mt-2 text-lg`}>{item.title}</Text>
            <Icon
              style={tw`bg-black p-2 rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOption;
