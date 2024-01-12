import React from 'react';
import {StyleSheet, View} from 'react-native';
import BaseList from '~/components/Base/BaseList';
import {ROUTES} from '~/constants';
import {Avatar, IconButton, Card, AnimatedFAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {get} from 'lodash';

const TimeSheets = p => {
  const navigation = useNavigation();

  const cardContent = (data: object) => {
    const handleEdit = () => {
      navigation.navigate(`${ROUTES.TIMESHEETS} Add`, {id: data.id});
    };

    return (
      <Card.Title
        title={data.name}
        subtitle={data.type}
        left={props => <Avatar.Icon {...props} icon="alarm-check" />}
        right={props => (
          <IconButton {...props} icon="chevron-right" onPress={handleEdit} />
        )}
      />
    );
  };

  const renderAddButton = () => {
    return (
      <AnimatedFAB
        icon={'plus'}
        label={'Label'}
        onPress={() =>
          navigation.navigate(ROUTES.TIMESHEETS + ' Add', {id: p.route.params.id})
        }
        visible={true}
        animateFrom={'right'}
        iconMode={'static'}
        style={[styles.fabStyle]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <BaseList
        urlKey="hr-time-sheets"
        urlPrefix={ROUTES.TIMESHEETS}
        args={[p.route.params.id]}
        cardContent={cardContent}
        renderAddButton={renderAddButton}
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
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
