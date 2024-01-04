import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, ROUTES } from '../../../constants';

const HomeHR = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
      }}>
      <Text>DASBOARD</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.WORKINGPLACES)}
        style={styles.button}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>WORKING PLACES</Text>
      </TouchableOpacity>

     {/*  <TouchableOpacity
        onPress={() =>navigation.navigate(ROUTES.TIMESHEETS)}
        style={styles.button}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>TIME SHEETS</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default HomeHR;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 17,
    margin: 10,
    borderRadius: 5,
    fontSize: 18,
    width: 180,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
