import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Request from "../../../../utils/request";
import { useNavigation } from "@react-navigation/native";

export default function FormWorkingSpace(p) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getDataList = () => {
    setLoading(true);
    Request("get", 'hr-retrive-working-places', {}, {},[1], onSuccess, onFailed);
  };
  const onSuccess = async (res) => {
    console.log(res)
    setData(res.data);
    setLoading(false);
  };
  const onFailed = (res) => {
    setLoading(false);
    showMessage({
      message: "failed to get user data",
      type: "danger",
    });
  };

  useEffect(() => {
    getDataList();
  }, []);

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Working Space Detail</Text>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  formItem: {
    padding: 5,
    margin: 4,
  },
  formLabel: {
    padding: 2,
    fontSize: 12,
    fontWeight: "500",
  },
});
