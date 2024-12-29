import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Alert, BackHandler, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Home() {
  const handleBackPress = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.logo}
      />
      <Text style={styles.header}>Welcome to Event Manager</Text>
      <Text style={styles.description}>
        Plan, organize, and manage your events effortlessly. Navigate through the app to explore features and keep track of your event details.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Feature Coming Soon', 'Explore upcoming features in future updates!')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with ❤ by Abdul Rafay</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e76f51',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#f1f1f1',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#264653',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#e9c46a',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  footer: {
    marginTop: 40,
  },
  footerText: {
    fontSize: 16,
    color: '#f1f1f1',
    textAlign: 'center',
  },
});
