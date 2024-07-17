import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 44,
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    paddingHorizontal: width * 0.1,
    flexDirection: 'column',
  },
  header: {
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.1,
  },
  logoWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    aspectRatio: 1.59,
    width: '100%',
    marginTop: height * 0.04,
    maxWidth: 287,
    resizeMode: 'contain',
  },
  title: {
    color: '#000',
    textAlign: 'center',
    marginTop: height * 0.02,
    fontSize: width * 0.05,
    fontWeight: '500',
  },
  description: {
    color: '#000',
    textAlign: 'center',
    marginTop: height * 0.1,
    fontSize: width * 0.045,
    fontWeight: '500',
  },
  ctaButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.04,
    width: width * 0.75,
    height: height * 0.08,
    maxWidth: 288,
    backgroundColor: Platform.OS === 'ios' ? '#007BFF' : '#0056b3',
    borderRadius: 25,
  },
  ctaButtonText: {
    //fontFamily: 'Montserrat',
    textAlign: 'center',
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  visuallyHidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
  },
});

export default styles;
