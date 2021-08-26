import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/NavSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom and fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
    });
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <MapView
        // style={tw`flex-1 absolute top-0 left-0 right-0 bottom-0`}
        style={styles.map}
        ref={mapRef}
        mapType="mutedStandard"
        initialRegion={{
          latitude: origin?.location?.lat,
          longitude: origin?.location?.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {origin && destination && (
          <MapViewDirections
            origin={origin?.description}
            destination={destination?.description}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`
              );
            }}
            onError={(errorMessage) => {
              console.log("error");
              console.log(errorMessage);
            }}
            onReady={(result) => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
            }}
          />
        )}

        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin?.location.lat,
              longitude: origin?.location.lng,
            }}
            title="Origin"
            description={origin?.description}
            identifier="origin"
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination?.location.lat,
              longitude: destination?.location.lng,
            }}
            title="Destination"
            description={destination?.description}
            identifier="destination"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Map;
