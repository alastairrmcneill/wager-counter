import { Counter } from "@/src/types/domain";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CounterListItem } from "./CounterListItem";
import { EmptyState } from "./EmptyState";
import { HomeHeader } from "./HomeHeader";
import { ThemedView } from "./ThemedView";

// Define spacing constants
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

interface HomeScreenProps {
  counters: Counter[];
  onCounterPress: (counter: Counter) => void;
  onCreateCounter: () => void;
}

interface ListItemProps {
  item: Counter;
}

export function HomeScreen({ counters, onCounterPress, onCreateCounter }: HomeScreenProps) {
  const renderCounter = ({ item }: ListItemProps) => <CounterListItem counter={item} onPress={onCounterPress} />;

  const keyExtractor = (item: Counter) => item.id;

  // Show empty state if no counters exist
  if (counters.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <HomeHeader onAddPress={onCreateCounter} />
        <ThemedView style={styles.content}>
          <EmptyState onCreateCounter={onCreateCounter} />
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <HomeHeader onAddPress={onCreateCounter} />
      <ThemedView style={styles.content}>
        <FlatList
          data={counters}
          renderItem={renderCounter}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={10}
          updateCellsBatchingPeriod={50}
          getItemLayout={(data, index) => ({
            length: 120, // Approximate height of each item
            offset: 120 * index,
            index,
          })}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
});
