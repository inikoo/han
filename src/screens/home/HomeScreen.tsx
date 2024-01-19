import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {Avatar, Card, Divider, Text, Chip} from 'react-native-paper';
import {COLORS, ROUTES} from '~/constants';
import Request from '~/utils/request';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dayjs = require('dayjs');
  const navigation = useNavigation();

  const getDataList = () => {
    setLoading(true);
    Request('get', 'hr-clocking-machines', {}, {}, [], onSuccess, onFailed);
  };
  const onSuccess = async res => {
    setData(res.data);
    setLoading(false);
  };
  const onFailed = res => {
    console.log(res)
    setLoading(false);
    showMessage({
      message: 'failed to get  data',
      type: 'danger',
    });
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Title
            title="Working Places"
            subtitle="67"
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
            left={props => (
              <Avatar.Icon
                {...props}
                icon="google-maps"
                style={styles.avatarStyle}
              />
            )}
          />
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="Time Sheets"
            subtitle="19"
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
            left={props => (
              <Avatar.Icon
                {...props}
                icon="clock-check"
                style={styles.avatarStyle}
              />
            )}
          />
        </Card>
      </View>
      <View style={{marginVertical: 5}}>
        <Text>Today's Attendance</Text>
        <Divider bold={true} style={{marginVertical: 3}} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <ScrollView style={styles.listContainer}>
          {data.map((item, index) => (
             <Card style={styles.card}>
             <Card.Title
               title="Time Sheets"
               subtitle="19"
               titleStyle={styles.cardTitle}
               subtitleStyle={styles.cardSubtitle}
               left={props => (
                 <Avatar.Icon
                   {...props}
                   icon="human"
                   style={styles.CardAvatarListStyle}
                 />
               )}
             />
           </Card>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingVertical: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffff',
  },
  cardTitle: {
    fontSize: 12,
  },
  cardSubtitle: {
    fontSize: 18,
  },
  avatarStyle: {
    backgroundColor: COLORS.primary,
    margin: 10,
  },
  CardAvatarListStyle: {
    backgroundColor: COLORS.gray,
    margin: 10,
  },
});

export default Home;
