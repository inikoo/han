import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Text} from '@rneui/base';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Request} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import styles from './style';

const specificEmojis = [
  '🌴',
  '😀',
  '👽',
  '🍄',
  '👻',
  '👍🏼',
  '🚀',
  '🦄',
  '🐋',
  '☘️',
];

const specificLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'X', 'Y', 'Z'];

const specificNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const WelcomeScreen = () => {
  const [valueText1, setValueText1] = useState('');
  const [valueText2, setValueText2] = useState('');
  const [valueEmoji1, setValueEmoji1] = useState('');
  const [valueEmoji2, setValueEmoji2] = useState('');
  const [valueNumber1, setValueNumber1] = useState('');
  const [valueNumber2, setValueNumber2] = useState('');
  const [valueActiveFields, setValueActiveFields] = useState(1);

  const navigation = useNavigation();
  const user = useSelector(state => state.userReducer);

  useFocusEffect(
    useCallback(() => {
      setValueText1('')
      setValueText2('')
      setValueEmoji1('');
      setValueEmoji2('');
      setValueNumber1('')
      setValueNumber2('')
    }, []),
  );

  const SendPin = async () => {
    await Request(
      'get',
      'cloking-pin',
      {},
      {},
      [
        `${user.organisation_id}:${valueText1}${valueText2}${valueEmoji1}${valueEmoji2}${valueNumber1}${valueNumber2}`,
      ],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = e => { 
    navigation.navigate('TakeImage', {employee: e.data});
  };

  const onFailed = e => {
    console.log(e);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: e.response.data.message,
    });
  };

  const handleLettersPick = (word) => {
    if (valueActiveFields === 1) {
      setValueText1(word);
      setValueActiveFields(2);
    } else if (valueActiveFields === 2) {
      setValueText2(word);
      setValueActiveFields(3);
    }
  };

  const handleEmojiPick = (emoji) => {
    if (valueActiveFields === 3) {
      setValueEmoji1(emoji);
      setValueActiveFields(4);
    } else if (valueActiveFields === 4) {
      setValueEmoji2(emoji);
      setValueActiveFields(5);
    }
  };

  const handleNumberPick = (number) => {
    if (valueActiveFields === 5) {
      setValueNumber1(number);
      setValueActiveFields(6);
    } else if (valueActiveFields === 6) {
      setValueNumber2(number);
    }
  };

  useEffect(() => {
    if (valueNumber2 !== '' && valueNumber1 !== '' && valueText1 !== '' && valueText2 !== '' && valueEmoji1 !== '' && valueEmoji2 !== '') {
      SendPin();
    }
  }, [valueNumber2,valueNumber1,valueText1,valueText2,valueEmoji1,valueEmoji2 ]);

  return (
    <SafeAreaView style={styles.containerView}>
      <KeyboardAvoidingView style={styles.contentContainer} behavior="padding">
     

        <ScrollView contentContainerStyle={styles.keyboardContainer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[
              styles.cell,
              styles.emojiCell,
              valueActiveFields === 1 && styles.activeCell,
            ]}
            onPress={() => setValueActiveFields(1)}
          >
            <Text style={styles.emojiText}>{valueText1}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cell,
              styles.emojiCell,
              valueActiveFields === 2 && styles.activeCell,
            ]}
            onPress={() => setValueActiveFields(2)}
          >
            <Text style={styles.emojiText}>{valueText2}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cell,
              styles.emojiCell,
              valueActiveFields === 3 && styles.activeCell,
            ]}
            onPress={() => setValueActiveFields(3)}
          >
            <Text style={styles.emojiText}>{valueEmoji1}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cell,
              styles.emojiCell,
              valueActiveFields === 4 && styles.activeCell,
            ]}
            onPress={() => setValueActiveFields(4)}
          >
            <Text style={styles.emojiText}>{valueEmoji2}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cell,
              styles.emojiCell,
              valueActiveFields === 5 && styles.activeCell,
            ]}
            onPress={() => setValueActiveFields(5)}
          >
            <Text style={styles.emojiText}>{valueNumber1}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cell,
              styles.emojiCell,
              valueActiveFields === 6 && styles.activeCell,
            ]}
            onPress={() => setValueActiveFields(6)}
          >
            <Text style={styles.emojiText}>{valueNumber2}</Text>
          </TouchableOpacity>
        </View>
          <View style={styles.keyboardSection}>
            <View style={styles.keyboardRow}>
              {specificLetters.map((word, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.emojiButton}
                  onPress={() => handleLettersPick(word)}
                >
                  <Text style={styles.emoji}>{word}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.keyboardSection}>
            <View style={styles.keyboardRow}>
              {specificEmojis.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.emojiButton}
                  onPress={() => handleEmojiPick(emoji)}
                >
                  <Text style={styles.emoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.keyboardSection}>
            <View style={styles.keyboardRow}>
              {specificNumbers.map((number, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.emojiButton}
                  onPress={() => handleNumberPick(number)}
                >
                  <Text style={styles.emoji}>{number}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
