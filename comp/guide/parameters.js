import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Parameters = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.heading, styles.centerText]}>WATER TEMPERATURE</Text>
          <Text style={styles.subHeading}>ACCEPTABLE RANGE: 26ºC to 32ºC</Text>
          <Text style={styles.impact}>IMPACT</Text>
          <Text style={styles.content}>
            - Affects fish metabolism; optimal temperatures support efficient metabolic processes.
          </Text>
          <Text style={styles.content}>
            - Influences feed intake; within the acceptable range, fish tend to consume feed more readily.
          </Text>
          <Text style={styles.content}>
            - Directly impacts growth rate; fish grow best within the specified temperature range.
          </Text>
          <Text style={styles.content}>
            - High temperatures can induce stress in fish, leading to decreased immunity and increased susceptibility to diseases.
          </Text>
          <Text style={styles.content}>
            - Extremely high temperatures reduce dissolved oxygen levels, further stressing fish and potentially causing mortality.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.heading, styles.centerText]}>pH LEVELS</Text>
          <Text style={styles.subHeading}>ACCEPTABLE RANGE: 6.5 to 7.5</Text>
          <Text style={styles.impact}>IMPACT</Text>
          <Text style={styles.content}>
            - Ensures fish survival by maintaining a suitable environment for physiological processes.
          </Text>
          <Text style={styles.content}>
            - Optimal pH levels promote normal growth and development of fish.
          </Text>
          <Text style={styles.content}>
            - Affects feed intake; fish may reduce consumption if pH levels are outside the acceptable range.
          </Text>
          <Text style={styles.content}>
            - High or low pH levels can induce stress in fish, compromising their health and growth.
          </Text>
          <Text style={styles.content}>
            - Indicates CO2 levels; low pH may suggest high carbon dioxide levels in water, potentially harmful to fish.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  headerWrapper: {
    width: '100%',
    position: 'relative',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#0277bd',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004d40',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
  },
  subHeading: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  impact: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    fontSize: 16,
    marginVertical: 5,
  },
  centerText: {
    textAlign: 'center',
  },
});

export default Parameters;