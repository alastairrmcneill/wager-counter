export default {
  expo: {
    name: "Spinz",
    slug: "spinz",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "spinz",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.alastairrmcneill.spinz",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.alastairrmcneill.spinz",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-dev-client",
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      // Analytics configuration
      mixpanelProjectToken: process.env.MIXPANEL_PROJECT_TOKEN,
      analyticsEnabled: true, //process.env.NODE_ENV === "production" || process.env.ENABLE_ANALYTICS === "true",
      analyticsDebug: false, //process.env.NODE_ENV !== "production",
    },
  },
};
