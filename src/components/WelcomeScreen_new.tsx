import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { ThemedView } from "@/src/components/ThemedView";
import { Button } from "@/src/components/ui/Button";
import { brandColors } from "@/src/constants/DesignSystem";
import { useOnboardingStore } from "@/src/store";

export function WelcomeScreen() {
  const { setCurrentStep } = useOnboardingStore();

  const handleContinue = () => {
    setCurrentStep(1);
    // TODO: Navigate to first wizard step when created
    console.log("Continuing to wizard step 1");
  };

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
          <View style={styles.testimonial}>
            <View style={styles.testimonialContent}>
              <Text style={styles.leftLaurel}>🌿</Text>
              <View style={styles.testimonialCenter}>
                <Text style={styles.testimonialAuthor}>Ritchie N.</Text>
                <Text style={styles.testimonialText}>Simple idea but executed perfectly, love the widget</Text>
                <View style={styles.starsContainer}>
                  <Text style={styles.stars}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
                </View>
              </View>
              <Text style={styles.rightLaurel}>🌿</Text>
            </View>
          </View>

          <View style={styles.testimonial}>
            <View style={styles.testimonialContent}>
              <Text style={styles.leftLaurel}>🌿</Text>
              <View style={styles.testimonialCenter}>
                <Text style={styles.testimonialAuthor}>Sarah M.</Text>
                <Text style={styles.testimonialText}>
                  Finally, a simple way to track my gambling sessions without the complexity.
                </Text>
                <View style={styles.starsContainer}>
                  <Text style={styles.stars}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
                </View>
              </View>
              <Text style={styles.rightLaurel}>🌿</Text>
            </View>
          </View>

          <View style={styles.testimonial}>
            <View style={styles.testimonialContent}>
              <Text style={styles.leftLaurel}>🌿</Text>
              <View style={styles.testimonialCenter}>
                <Text style={styles.testimonialAuthor}>James R.</Text>
                <Text style={styles.testimonialText}>
                  The clean interface helps me stay focused on my budget goals.
                </Text>
                <View style={styles.starsContainer}>
                  <Text style={styles.stars}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
                </View>
              </View>
              <Text style={styles.rightLaurel}>🌿</Text>
            </View>
          </View>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
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
  testimonial: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  testimonialContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftLaurel: {
    fontSize: 24,
    marginRight: 16,
    color: brandColors.mint[400],
  },
  rightLaurel: {
    fontSize: 24,
    marginLeft: 16,
    color: brandColors.mint[400],
  },
  testimonialCenter: {
    flex: 1,
    alignItems: "center",
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
  },
  continueButton: {
    marginBottom: 16,
  },
});
