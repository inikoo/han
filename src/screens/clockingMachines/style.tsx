import { StyleSheet } from 'react-native';
import { MAINCOLORS } from '~/Utils/Colors';

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 50,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    margin: 5,
    borderRadius: 10,
  },
  emojiCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 24,
  },
  keyboardContainer: {
    width: '100%',
    marginTop: 20,
  },
  keyboardSection: {
    marginBottom: 20,
  },
  keyboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  keyboardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emojiButton: {
    width: '20%',
    alignItems: 'center',
    marginVertical: 10,
  },
  emoji: {
    fontSize: 30,
  },
  activeCell: {
    borderColor: MAINCOLORS.primary,
    borderWidth: 2,
  },
});

export default styles;
