import { StyleSheet, View } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import Request from "../../../../utils/request";
import { Card, Button, Text, Appbar  } from "react-native-paper";
import { IconButton, MD3Colors } from "react-native-paper";

const TimeSheets = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const workpalceId = route.params.id;

  const getDataList = () => {
    Request(
      "get",
      "hr-time-sheets",
      {},
      {},
      [workpalceId],
      onLoginSuccess,
      onLoginFailed
    );
  };

  const onLoginSuccess = async (res) => {
    setData(res.data);
    console.log(res);
  };

  const onLoginFailed = (res) => {
    console.log(res);
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <View>
      <View class={styles.header}>
      <Appbar.Header >
       <Appbar.Content/>
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon='plus' onPress={() => {}} />
    </Appbar.Header>
      </View>
      
  
      <Card style={styles.card}>
        {data.map((item, index) => (
          <Card.Content key={item.slug} style={styles.cardContent}>
            <Text style={styles.placeName}>{item.name}</Text>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  navigation.navigate("Add Time Sheets", {
                    id: workpalceId,
                  });
                }}
                style={styles.button}
              >
                open
              </Button>
            </View>
          </Card.Content>
        ))}
      </Card>
    </View>
  );
};

export default TimeSheets;

const styles = StyleSheet.create({
  header : {
    padding : 0
  }
});


