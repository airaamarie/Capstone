import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e9ecef',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
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
    backgroundColor: '#3333fb', // Sky blue background for the sidebar
    flex: 1,
  },
  sidebarItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text for better visibility
  },
  sidebarSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default styles;
