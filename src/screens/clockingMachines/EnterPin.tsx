import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text, Button} from '@rneui/base';
import ConnectImage from '../../assets/image/20943993.jpg';
import {BottomSheet} from '@rneui/themed';
import styles from './style';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Request} from '~/Utils';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useSelector} from 'react-redux';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import EmojiPicker, {emojisByCategory, EmojiObject} from 'rn-emoji-keyboard';

const specificEmojis = [
  '🌴', '😀', '👽', '🍄', '👻', '👍🏼', '🚀', '🦄', '🐋', '☘️'
];
const CELL_COUNT = 2;

const WelcomeScreen = () => {
  const [valueText, setValueText] = useState('');
  const [valueEmoji1, setValueEmoji1] = useState('');
  const [valueEmoji2, setValueEmoji2] = useState('');
  const [valueActiveFields, setValueActiveFields] = useState(1);
  const [valueNumber, setValueNumber] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const ref1 = useBlurOnFulfill({value: valueText, cellCount: CELL_COUNT});
  const ref3 = useBlurOnFulfill({value: valueNumber, cellCount: CELL_COUNT});

  const [propsText, getCellOnLayoutHandlerText] = useClearByFocusCell({
    value: valueText,
    setValue: setValueText,
  });
  const [propsNumber, getCellOnLayoutHandlerNumber] = useClearByFocusCell({
    value: valueNumber,
    setValue: setValueNumber,
  });

  const navigation = useNavigation();
  const user = useSelector(state => state.userReducer);

  useFocusEffect(
    useCallback(() => {
      setValueText('');
      setValueEmoji2('');
      setValueEmoji1('');
      setValueNumber('');
    }, []),
  );

  const SendPin = async () => {
    console.log(`${user.organisation_id}:${valueText}${valueEmoji1}${valueEmoji2}${valueNumber}`)
    await Request(
      'post',
      'cloking-pin',
      {},
      {
        pin: `${user.organisation_id}:${valueText}${valueEmoji1}${valueEmoji2}${valueNumber}`,
      },
      [],
      onSuccess,
      onFailed,
    );
  };

  const onSuccess = e => {
    console.log(e)
    navigation.navigate('TakeImage', {employee: e.data});
  };

  const onFailed = e => {
    console.log(e)
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: e.response.data.message,
    });
  };

  const handleEmojiPick = (emoji: EmojiObject) => {
    if (valueActiveFields == 1) setValueEmoji1(emoji.emoji);
    if (valueActiveFields == 2) setValueEmoji2(emoji.emoji);

    setEmojiPickerVisible(false);
  };

  const getCustomEmojis = () => {
    const customEmojis = [];
    for (const [, value] of Object.entries(emojisByCategory)) {
      const newData = value.data.filter(emoji =>
        specificEmojis.includes(emoji.emoji),
      );
      customEmojis.push(...newData);
    }
    return [{title: 'Custom', data: customEmojis}];
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={ConnectImage}
            style={styles.connectImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>Enter Your Pin</Text>

        <View style={styles.inputContainer}>
          <CodeField
            ref={ref1}
            {...propsText}
            value={valueText}
            onChangeText={setValueText}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="default"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandlerText(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          <View style={styles.emojiFields}>
            <TouchableOpacity
              style={[styles.cell, styles.emojiCell]}
              onPress={() => {
                setEmojiPickerVisible(true);
                setValueActiveFields(1);
              }}>
              <Text style={styles.emojiText}>{valueEmoji1}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cell, styles.emojiCell]}
              onPress={() => {
                setEmojiPickerVisible(true);
                setValueActiveFields(2);
              }}>
              <Text style={styles.emojiText}>{valueEmoji2}</Text>
            </TouchableOpacity>
          </View>

          <CodeField
            ref={ref3}
            {...propsNumber}
            value={valueNumber}
            onChangeText={setValueNumber}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandlerNumber(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <Button
          icon={{
            name: 'login',
            type: 'material-community',
            size: 19,
            color: 'white',
          }}
          buttonStyle={{...styles.loginButton, marginTop: 30}}
          onPress={SendPin}>
          <Text style={{color: '#ffff', fontWeight: 'bold', fontSize: 20}}>
            Submit
          </Text>
        </Button>

        {/* <EmojiPicker
          open={emojiPickerVisible}
          onClose={() => setEmojiPickerVisible(false)}
          expandable={true}
          emojisByCategory={getCustomEmojis()}
          onEmojiSelected={handleEmojiPick}
        /> */}
        <BottomSheet
          isVisible={emojiPickerVisible}
          containerStyle={{ backgroundColor : 'transparent'}}
          onBackdropPress={() => setEmojiPickerVisible(false)}>
          <View style={styles.bottomSheetContainer}>
            <ScrollView contentContainerStyle={styles.emojiContainer}>
              {specificEmojis.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.emojiButton}
                  onPress={() => handleEmojiPick({emoji: item})}>
                  <Text style={styles.emoji}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
