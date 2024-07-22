import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Food = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.hiddenBackButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.recommendation}>Recommended Food</Text>
      </View>
      <Text style={styles.heading}>Small Fingerlings</Text>
      <Text style={styles.description}>
        Feeds may include fish meal or other animal proteins, typically comprising 45-50% protein.
        Feeds are often in a meal-type form with protein levels of 28 or 32%.
      </Text>
      
      <Text style={styles.heading}>Advanced Fingerlings</Text>
      <Text style={styles.description}>
        Larger fingerlings are typically fed small floating pellets (1/8 inch diameter) containing 35% protein.
        Advanced fingerlings (5-6 inches) and food fish are generally fed floating feeds with 28-32% protein, in sizes ranging from 5/32 to 3/16 inches in diameter.
      </Text>
      
      <Text style={styles.additional}>
        Additional Considerations:
        Antibiotics may also be included in the feed to treat bacterial infections in catfish.
        It's important to choose the appropriate feed size for different growth seasons or winter conditions.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  headerWrapper: {
    width: '100%',
    position: 'relative',
    paddingTop: 30,
  },
  hiddenBackButtonContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#0277bd',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  recommendation: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#004d40',
    textAlign: 'center',
    marginVertical: 10,
  },
  additional: {
    fontSize: 16,
    color: '#004d40',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Food;
