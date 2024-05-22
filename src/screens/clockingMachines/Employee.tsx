import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { MAINCOLORS } from '~/Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { color } from '@rneui/base';

type CardsComponentsProps = {};

const Cards: React.FunctionComponent<CardsComponentsProps> = ({ route }) => {
    const employee = route.params.data
    const navigate = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <Card>
                    <Card.Title style={{ color : MAINCOLORS.primary}}>Welcome {employee.employee.contact_name}</Card.Title>
                    <Card.Divider />
                    <Card.Image
                        style={styles.cardImage}
                        source={{ uri: employee.photo.original ?   employee.photo.original : ''}}
                    />
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.label}>Attend At:</Text>
                        <Text style={styles.descriptionText}>
                            {employee.attend_at ? employee.attend_at : '-'}
                        </Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.label}>Finish At:</Text>
                        <Text style={styles.descriptionText}>
                            {employee.finish_at ? employee.finish_at : '-'}
                        </Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.label}>Worker Number:</Text>
                        <Text style={styles.descriptionText}>
                            {employee.employee.worker_number}
                        </Text>
                    </View>
                </Card>
                <View style={styles.timerContainer}>
                    <CountdownCircleTimer
                        isPlaying
                        duration={2}
                        onComplete={()=>navigate.navigate('EnterPin')} 
                        colors={MAINCOLORS.primary}
                        size={100}
                        strokeWidth={6}
                    >
                        {({ remainingTime }) => (
                            <Text>{remainingTime}</Text>
                        )}
                    </CountdownCircleTimer>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    cardImage: {
        padding: 0,
        minWidth : 300,
        maxWidth : 500,
        marginVertical : 10
    },
    descriptionContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    descriptionText: {
        flex: 1,
    },
    timerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default Cards;
