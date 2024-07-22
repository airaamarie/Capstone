import React from 'react';
import { View, StyleSheet, ScrollView, Text, SafeAreaView } from 'react-native';

const Tips = () => {
  const content = [
    "1. Pond Setup: Build a pond that's at least 1/4 acre with a depth of 4-6 feet, ensuring good sunlight and water access.",
    "2. Water Quality: Maintain clean water with filtration systems and regular testing of pH, water temperature, and oxygen levels.",
    "3. Stocking and Feeding: Choose healthy fingerlings, avoid overstocking, and feed them a balanced diet of pellets supplemented with natural foods like vegetables.",
    "4. Habitat and Care: Provide shelters like PVC pipes or logs for hiding spots, and regularly remove debris to maintain water quality.",
    "5. Maintenance: Monitor pond infrastructure, control algae growth, and ensure pond integrity with proper maintenance.",
    "6. Harvesting: Use seines or traps to harvest catfish after 12-18 months, and plan for processing and storage accordingly.",
    "",
    "",
    "Following these tips can help you successfully culture catfish in your backyard, whether for personal enjoyment or small-scale production."
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>TIPS</Text>
        </View>
        {content.map((item, index) => (
          <View key={index} style={styles.tipContainer}>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures SafeAreaView takes up the full height of the screen
    backgroundColor: '#fff',
    paddingTop: 20, // To avoid overlap with the status bar
  },
  scrollContainer: {
    flexGrow: 1, // Ensures ScrollView takes up the full space available
    paddingHorizontal: 15,
    paddingBottom: 20, // Adds space at the bottom for content
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  tipContainer: {
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
    textAlign: 'left',
  },
});

export default Tips;
