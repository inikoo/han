import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  Button,
  Text,
  Icon,
  Chip,
  AnimatedFAB,
} from "react-native-paper";
import Request from "../../../utils/request";
import { useNavigation } from "@react-navigation/native";
import { COLORS, ROUTES } from "../../../constants";
import { showMessage, hideMessage } from "react-native-flash-message";
import Header from "../../../components/Header"

const WorkingPlaces = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getDataList = () => {
    setLoading(true);
    Request(
      "get",
      "hr-working-places",
      {},
      {},
      [],
      onLoginSuccess,
      onLoginFailed
    );
  };

  const onLoginSuccess = async (res) => {
    console.log(res);
    setData(res.data);
    setLoading(false);
  };

  const onLoginFailed = (res) => {
    console.log(res);
    setLoading(false);
    showMessage({
      message: "failed to get user data",
      type: "danger",
    });
  };

  useEffect(() => {
    getDataList();
  }, []);

  return !loading ? (
    <View style={styles.container}>
      <Header />
      <Card style={styles.card}>
        {data.map((place, index) => (
          <Card.Content key={place.slug} style={styles.cardContent}>
            <Text style={styles.placeName}>{place.name}</Text>
            <View style={styles.buttonContainer}>
              <Button
                icon="chevron-right"
                onPress={() => {
                  navigation.navigate(ROUTES.TIMESHEETS, {
                    id: place.id,
                  });
                }}
                style={styles.button}
              ></Button>
            </View>
          </Card.Content>
        ))}
      </Card>
      <AnimatedFAB
        icon={"plus"}
        label={"Label"}
        onPress={() => console.log("Pressed")}
        visible={true}
        animateFrom={"right"}
        iconMode={"static"}
        style={[styles.fabStyle]}
      />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    /* paddingHorizontal: 16, */
    paddingTop: 16,
    paddingBottom: 8,
  },
  titleContainer: {},
  headerTitle: {
    fontSize: 16,
    padding: 0,
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconArea: {
    marginHorizontal: 5,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});

export default WorkingPlaces;
