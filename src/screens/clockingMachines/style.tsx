import { StyleSheet } from 'react-native';
import { MAINCOLORS, COLORS } from '~/Utils/Colors';

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  connectImage: {
    width: 150,
    height: 150,
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeFieldRoot: {
    justifyContent: 'center',
    marginTop: 20,
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
  focusCell: {
    borderColor: '#000',
  },
  loginButton: {
    backgroundColor: MAINCOLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  emojiFields : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  emojiContainer: {
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
  emojiCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
