import type { StyleProp, ViewStyle } from "react-native";

export type ScanCompleteEvent = {
	success: boolean;
	path?: string;
	error?: string;
};

export type ExpoRoomPlanViewProps = {
	style?: StyleProp<ViewStyle>;
	onScanComplete: (event: { nativeEvent: ScanCompleteEvent }) => void;
};

export interface ExpoRoomPlanViewInterface {
	startScanning(): void;
	stopScanning(): void;
}
