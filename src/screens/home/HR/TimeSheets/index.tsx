import React from "react";
import { StyleSheet, View } from "react-native";
import BaseList from "../../../../components/Base/BaseList";
import { ROUTES } from "../../../../constants";

const TimeSheets = (p) => {
  return (
    <View style={styles.container}>
      <BaseList 
        urlKey='hr-time-sheets'
        urlPrefix={ROUTES.WORKINGPLACES}
        args={[p.route.params.id]}
      />
    </View>
  );
};

export default TimeSheets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
});
