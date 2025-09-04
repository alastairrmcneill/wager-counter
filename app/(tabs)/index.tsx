import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Wager Counter</ThemedText>
      <View style={styles.stepContainer}>
        <ThemedText type="subtitle">Welcome to your wager counter app!</ThemedText>
        <ThemedText>
          Your MMKV storage is working correctly with the new React Native architecture.
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
});
