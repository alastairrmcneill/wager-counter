import { Counter } from "@/src/types/domain";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacing } from "../constants/Spacing";
import { CounterListItem } from "./CounterListItem";
import { EmptyState } from "./EmptyState";
import { HomeHeader } from "./HomeHeader";
import { ThemedView } from "./ThemedView";

interface HomeScreenProps {
  counters: Counter[];
  onCounterPress: (counter: Counter) => void;
  onCreateCounter: () => void;
  onDeleteCounter: (counter: Counter) => void;
}

interface ListItemProps {
  item: Counter;
}

export function HomeScreen({ counters, onCounterPress, onCreateCounter, onDeleteCounter }: HomeScreenProps) {
  const renderCounter = ({ item }: ListItemProps) => (
    <CounterListItem counter={item} onPress={onCounterPress} onDelete={onDeleteCounter} />
  );

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
            length: 120,
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
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
});
