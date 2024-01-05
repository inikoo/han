import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";
const Profile = () => {
  const data = useSelector((state) => state.userReducer);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.bgColor,
      }}
    >
      <Text>profile!</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
