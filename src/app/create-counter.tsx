import { CounterCreator } from "@/src/components/CounterCreator";
import { router } from "expo-router";
import React from "react";

export default function CreateCounterScreen() {
  const handleCounterCreated = () => {
    // Navigate back to the counter screen which will show the newly created counter
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return <CounterCreator onCounterCreated={handleCounterCreated} onCancel={handleCancel} />;
}
