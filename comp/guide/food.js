import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Food = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.recommendation}>Recommended Food</Text>
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
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 20, // Reduced value to move content higher
  },
  recommendation: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 0, // You can adjust this if needed to fine-tune position
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  additional: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Food;
