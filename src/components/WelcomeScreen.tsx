import { SymbolView } from "expo-symbols";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { ThemedView } from "@/src/components/ThemedView";
import { Button } from "@/src/components/ui/Button";
import { brandColors } from "@/src/constants/DesignSystem";
import { useOnboardingStore } from "@/src/store";

const { width: screenWidth } = Dimensions.get("window");

interface Testimonial {
  id: number;
  name: string;
  text: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ritchie N.",
    text: "Super simple and easy to use.",
    stars: 5,
  },
  {
    id: 2,
    name: "Sarah M.",
    text: "So helpful for keeping track of spins",
    stars: 5,
  },
  {
    id: 3,
    name: "James R.",
    text: "Never going to over wager again!",
    stars: 5,
  },
];

export function WelcomeScreen() {
  const { setCurrentStep } = useOnboardingStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleContinue = () => {
    setCurrentStep(1);
    // TODO: Navigate to first wizard step when created
    console.log("Continuing to wizard step 1");
  };

  // Auto-scroll timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % testimonials.length;
        try {
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        } catch (error) {
          console.warn("Error scrolling to index:", error);
        }
        return nextIndex;
      });
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, []);

  const renderTestimonial = ({ item }: { item: Testimonial }) => (
    <View style={styles.testimonialSlide}>
      <View style={styles.testimonial}>
        <View style={styles.testimonialContent}>
          <SymbolView name="laurel.leading" size={72} tintColor={brandColors.mint[400]} />
          <View style={styles.testimonialCenter}>
            <Text style={styles.testimonialAuthor}>{item.name}</Text>
            <Text style={styles.testimonialText}>{item.text}</Text>
            <View style={styles.starsContainer}>
              <View style={styles.starsRow}>
                {Array.from({ length: item.stars }, (_, index) => (
                  <SymbolView key={index} name="star.fill" size={16} tintColor={brandColors.mint[400]} />
                ))}
              </View>
            </View>
          </View>
          <SymbolView name="laurel.trailing" size={72} tintColor={brandColors.mint[400]} />
        </View>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* App Icon and Title */}
        <View style={styles.header}>
          <Image source={require("@/assets/images/icon.png")} style={styles.icon} />
          <Text style={styles.appName}>Wager Counter</Text>
          <Text style={styles.subtitle}>Track your betting progress with precision</Text>
        </View>

        {/* Testimonials Section */}
        <View style={styles.testimonialsSection}>
          <FlatList
            ref={flatListRef}
            data={testimonials}
            renderItem={renderTestimonial}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            style={styles.testimonialCarousel}
            onScrollToIndexFailed={(info) => {
              console.warn("Failed to scroll to index:", info);
            }}
          />
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button title="Continue" onPress={handleContinue} size="large" style={styles.continueButton} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.gunmetal[50],
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
    paddingHorizontal: 24,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 24,
    borderRadius: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: brandColors.gunmetal[950],
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: brandColors.gunmetal[600],
    textAlign: "center",
    lineHeight: 24,
  },
  testimonialsSection: {
    flex: 1,
    marginBottom: 48,
  },
  testimonialCarousel: {
    height: 200,
  },
  testimonialSlide: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  testimonial: {
    width: "100%",
    maxWidth: screenWidth - 48,
  },
  testimonialContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  leftLaurel: {
    marginRight: 0,
    color: brandColors.mint[400],
  },
  rightLaurel: {
    marginLeft: 0,
    color: brandColors.mint[400],
  },
  testimonialCenter: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
    maxWidth: screenWidth - 200, // Screen width minus laurel space (48 * 2) and padding
  },
  testimonialAuthor: {
    fontSize: 18,
    color: brandColors.gunmetal[900],
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  starsContainer: {
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  stars: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
  },
  testimonialText: {
    fontSize: 16,
    color: brandColors.gunmetal[600],
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 12,
  },
  buttonContainer: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  continueButton: {
    marginBottom: 16,
  },
});
