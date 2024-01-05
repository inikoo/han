import {
  StyleSheet,
  View,
} from "react-native";
import BaseList from '../../../../components/Base/BaseList'
import { COLORS, ROUTES } from "../../../../constants";


const WorkingPlaces = () => {
  return (
    <View style={styles.container}>
      <BaseList 
        urlKey = 'hr-working-places'
        urlPrefix = {ROUTES.WORKINGPLACES}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
});

export default WorkingPlaces;
