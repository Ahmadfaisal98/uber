import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOption from "../components/NavOption";
import { useDispatch } from "react-redux";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setDestination, setOrigin } from "../slices/NavSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={[
        tw`bg-white h-full`,
        { flex: 1, marginTop: StatusBar.currentHeight },
      ]}
    >
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCeTfTBnBuCJwtddlReH5otlLR_hX9Y_qg5CgFrOW3tCaOc6GNoF--_357H8TE7m1DVZY&usqp=CAU",
          }}
        />

        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where from?"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          minLength={2}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
        />

        <NavOption />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
