import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function FormWorkingSpace(p : object) {
  console.log(p);

  const renderFieldsForm = () => {
    switch (p.type) {
      case 'text':
        return (
          <TextInput
            {...p}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View>
      {renderFieldsForm()}
    </View>
  );
}

const styles = StyleSheet.create({});