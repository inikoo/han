import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Avatar, Card, Divider, Text, Badge} from 'react-native-paper';
import {COLORS, ROUTES} from '~/constants';
import Request from '~/utils/request';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'lodash';
import dayjs from 'dayjs';
import Logo from '../../../asset/logo/Green_minimalist_lizard_logo6-removebg-preview.png';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const checkUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@AuthenticationToken:Key');
      if (!value) {
        setUser(null);
      } else {
        const userData = JSON.parse(value);
        setUser(userData);
        console.log('user', userData);
      }
    } catch (error) {
      console.error('Error fetching credentials from AsyncStorage:', error);
      setUser(null);
    }
  };

  const getDataList = () => {
    setLoading(true);
    Request('get', 'hr-clocking-machines', {}, {}, [], onSuccess, onFailed);
  };

  const onSuccess = async res => {
    setData(res.data);
    setLoading(false);
  };

  const onFailed = res => {
    console.log(res);
    setLoading(false);
    showMessage({
      message: 'Failed to get data',
      type: 'danger',
    });
  };

  useEffect(() => {
    getDataList();
    checkUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardContainer}>
            <Image source={Logo} style={styles.logo} />
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold'}}>AW Advantage</Text>
              <View style={{width : '80%' , fontSize: 12}}>
              <Text>Jl. Pantai Lembeng No.5, Ketewel, Kec. Sukawati, Kabupaten Gianyar, Bali 80582</Text>
              </View>
              
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Today's Attendance: </Text>
        <View
          style={[
            styles.statusContainer,
            get(user, 'clocking_status') === 'in'
              ? styles.activeStatus
              : styles.inactiveStatus,
          ]}>
          <Text style={styles.statusText}>
            {get(user, 'clocking_status') === 'in' ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      <Divider bold={true} style={styles.divider} />

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <ScrollView style={styles.listContainer}>
          {data.map((item, index) => (
            <Card key={index} style={styles.card}>
              {dayjs(item.updated_at).hour() > 8 && (
                <View style={styles.badgeContainer}>
                  <Badge
                    style={{
                      backgroundColor: 'red',
                      fontSize: 10,
                      paddingHorizontal: 5,
                    }}>
                    Late
                  </Badge>
                </View>
              )}

              <Card.Title
                title={item.name}
                subtitle={
                  <Text
                    style={{
                      fontSize: 12,
                      color:
                        dayjs(item.updated_at).hour() > 8
                          ? '#FF5500'
                          : '#87D068',
                    }}>
                    {dayjs(item.updated_at).format('dddd MM YYYY : HH mm')}
                  </Text>
                }
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
  infoContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
  },
  statusContainer: {
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 3,
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#ffff',
  },
  cardTitle: {
    fontSize: 14,
  },
  cardSubtitle: {
    fontSize: 18,
  },
  avatarStyle: {
    backgroundColor: COLORS.primary,
    margin: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  CardAvatarListStyle: {
    backgroundColor: COLORS.gray,
    margin: 10,
  },
  activeStatus: {
    backgroundColor: '#87D068',
  },
  inactiveStatus: {
    backgroundColor: '#FF5500',
  },
  badgeContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  logo: {
    maxHeight: 80,
    width: 100,
    marginRight: 10, // Add margin for separation
  },
});

export default Home;
