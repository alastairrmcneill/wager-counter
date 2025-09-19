import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import React, { useRef } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";

import { trackEvent } from "@/src/analytics";
import { AnalyticsEvents } from "@/src/analytics/events";
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
  const flatListRef = useRef<FlatList>(null);

  const handleContinue = () => {
    trackEvent(AnalyticsEvents.ONBOARDING_START);
    setCurrentStep(1);
  };

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
      {/* Background/Placeholder Image with Fade Overlay */}
      <View style={styles.backgroundImageContainer}>
        <Image source={require("@/assets/images/welcome-background.png")} style={styles.backgroundImagePlaceholder} />
        <LinearGradient
          colors={["transparent", "transparent", brandColors.gunmetal[50]]}
          locations={[0, 0.2, 0.9]}
          style={styles.gradientMask}
        />
      </View>

      {/* App Icon - Overlapping the image */}
      <View style={styles.iconContainer}>
        <Image source={require("@/assets/images/icon.png")} style={styles.icon} />
      </View>

      {/* Title and Subtitle */}
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>Welcome to{"\n"}Spinz!</Text>
        <Text style={styles.subtitle}>Keep track of your wagering requirements</Text>
      </View>

      {/* Flexible spacer */}
      <View style={styles.flexSpacer} />

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
          scrollEnabled={false}
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.gunmetal[50],
  },
  backgroundImagePlaceholder: {
    width: "100%",
    height: 180,
    backgroundColor: brandColors.gunmetal[100],
    borderRadius: 0,
    resizeMode: "cover",
  },
  backgroundImageContainer: {
    position: "relative",
    height: 180,
  },
  gradientMask: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fadeOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: brandColors.gunmetal[50],
  },
  iconContainer: {
    position: "absolute",
    top: 130, // Position to overlap the bottom of the image
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 90, // Increased to account for overlapping icon
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  welcomeTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: brandColors.gunmetal[950],
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    color: brandColors.gunmetal[600],
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  flexSpacer: {
    flex: 1,
  },
  testimonialsSection: {
    paddingBottom: 32,
  },
  testimonialCarousel: {
    height: 120,
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
    paddingHorizontal: 24,
    paddingBottom: 44,
  },
  continueButton: {
    marginBottom: 16,
  },
});
