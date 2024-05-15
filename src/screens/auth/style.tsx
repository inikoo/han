import {StyleSheet} from 'react-native';
import {MAINCOLORS} from '~/Utils/Colors';

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
  },
  image: {
    width: 300,
    height: 300,
  },
  connectImage: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: MAINCOLORS.primary,
    padding: 10,
    borderRadius: 10,
    margin: 30,
  },
  input: {
    height: 50,
    width: 300,
    padding: 10,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default styles;
