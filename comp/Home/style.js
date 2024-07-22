import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e9ecef',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    paddingTop: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  chartCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: width - 32,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sensorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  sensorIcon: {
    width: 60,
    height: 60,
    marginLeft: 'auto',
  },
  sensorText: {
    flex: 1,
    marginLeft: 10,
  },
  sensorName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  sensorData: {
    fontSize: 20,
    color: '#555',
    marginTop: 5,
  },
  cardContainer: {
    width: '100%',
  },
  sidebar: {
    backgroundColor: '#B0E0E6',
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    padding: 10,
  },
  sidebarItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#004d40',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dashboardImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  reportImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  feedImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  profileImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  guideImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  logoutImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  sidebarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d40',
    marginLeft: 12,
  },
  sidebarSeparator: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    top: height * 0.2,
    left: width * 0.1,
    width: width * 0.8,
    height: height * 0.6,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  subMenuItem: {
    marginVertical: 10,
  },
});

export default styles;