import React, { useEffect, useState } from 'react';

import Request from '../../../utils/request';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import {Chip, Button} from 'react-native-paper';
import {RemoveCredential} from '../../../utils/auth';
import { useNavigation } from "@react-navigation/native";
import { ROUTES, COLORS } from '../../../constants';
import { get } from 'lodash'

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()

  const getData = () => {
    setLoading(true);
    Request('get', 'profile', {}, {}, [], onSuccess, onFailed);
  };

  const onSuccess = res => {
    setProfileData(res.data);
    setLoading(false);
  };

  const onFailed = res => {
    setLoading(false);
  };

  const getRandomColor = () => {
    const chipColors = [
      '#F44336',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00BCD4',
      '#009688',
      '#4CAF50',
      '#8BC34A',
      '#CDDC39',
      '#FFEB3B',
      '#FFC107',
      '#FF9800',
      '#FF5722',
      '#795548',
      '#9E9E9E',
      '#607D8B',
    ];
    const randomIndex = Math.floor(Math.random() * chipColors.length);
    return chipColors[randomIndex];
  };


  const logOut =()=>{
    RemoveCredential()
    navigation.navigate(ROUTES.LOGIN);
  }

  useEffect(() => {
    getData();
  }, []);

  return !loading ? (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image style={styles.coverImage} />
      <View style={styles.avatarContainer}>
        <View>
          <Image
            source={{
              uri: get(profileData,['avatar','original'],'https://www.bootdey.com/img/Content/avatar/avatar1.png'),
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={[styles.name, styles.textWithShadow]}>
          {profileData.contact_name}
        </Text>
        <Text style={[styles.infoValue, styles.centerText]}>
        {profileData.slug}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Username:</Text>
          <Text style={styles.infoValue}>{profileData.username}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{profileData.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Roles:</Text>
          <Text style={styles.infoValue}>{profileData.roles}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text>
            <Chip
              style={[
                styles.statusText,
                profileData.status === 'Active'
                  ? styles.activeChip
                  : styles.inactiveChip,
              ]}
              textStyle={{color: '#ffff', fontSize: 12}}>
              {profileData.status}
            </Chip>
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Roles:</Text>
          {profileData.roles.map(item => (
            <Text key={item}>
              <Chip
                textStyle={{color: '#ffff', fontSize: 12}}
                style={{backgroundColor: getRandomColor()}}>
                {item}
              </Chip>
            </Text>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon="account-edit-outline"
            mode="outlined"
            onPress={() => console.log('Edit pressed')}
            style={styles.editButton}>
            Edit
          </Button>
          <Button
            icon="logout"
            mode="outlined"
            onPress={logOut}
            style={styles.logoutButton}>
            Log out
          </Button>
        </View>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  centerText: {
    textAlign: 'center',
  },
  coverImage: {
    height: 150,
    position: 'absolute',
    backgroundColor: COLORS.primary,
    top: 0,
    left: 0,
    right: 0,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
    color: COLORS.primary,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  infoValue: {
    marginTop: 5,
    color: '#333',
  },
  content: {
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  activeChip: {
    backgroundColor: '#87D068',
  },
  inactiveChip: {
    backgroundColor: '#FF5500',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  editButton: {
    marginBottom: 10,
    // Properti lain sesuai kebutuhan gaya
  },
  logoutButton: {
    // Properti lain sesuai kebutuhan gaya
  },
});

export default ProfileScreen;
