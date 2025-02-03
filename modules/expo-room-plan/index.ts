import { NativeModulesProxy } from "expo-modules-core";

// Export the view component
export { default as ExpoRoomPlanView } from "./src/ExpoRoomPlanView";
export * from "./src/ExpoRoomPlan.types";

// Export the module
const { ExpoRoomPlan } = NativeModulesProxy;
export default ExpoRoomPlan;
