import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#B0E0E6',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#B0E0E6',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  chartCard: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: width - 32,
    borderColor: '#004d40',
    borderWidth: 1,
    alignItems: 'center',
    maxHeight: height * 0.35,
    overflow: 'hidden',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#004d40',
  },
  chartContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
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
    borderColor: '#004d40',
    width: width - 32,
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
    color: '#004d40',
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
  sensorImage: {
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
  filterButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between to position items at ends
    alignItems: 'center', // Center the button content vertically
    backgroundColor: '#004d40', // Dark background for contrast
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3, // Shadow effect for better visibility
    width: '100%', // Ensure the button extends horizontally
    alignSelf: 'center', // Center the button itself
  },
  filterButtonText: {
    color: '#fff', // White text for visibility
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center', // Center the text
    flex: 1, // Allows the text to take available space in the row
  },
  filterIcon: {
    width: 45,
    height: 20,
    marginRight: 10, // Spacing between the icon and text
  },
  chooseTankText: {
    color: '#fff', // White text for visibility
    fontWeight: 'normal', // Adjust as needed
    fontSize: 14, // Adjust the size as needed
  },
});

export default styles;
