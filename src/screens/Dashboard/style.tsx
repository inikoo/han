import { StyleSheet } from 'react-native';
import { MAINCOLORS, COLORS } from '~/Utils/Colors';

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  disconnectButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  disconnectButton: {
    backgroundColor: MAINCOLORS.danger,
    borderRadius: 10,
    padding: 10,
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
  containerData: {
    width: '50%',
    alignItems: 'start',
    justifyContent: 'start',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  centeredTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 12,
  },
  dataDesc: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.grey4,
  },
  loginButton: {
    backgroundColor: MAINCOLORS.primary,
    padding: 10,
    borderRadius: 10,
    margin: 30,
  },
});

export default styles;
