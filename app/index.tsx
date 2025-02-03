import { useRef } from "react";
import { View, Button } from "react-native";
import { ExpoRoomPlanView } from "../modules/expo-room-plan";
import type { ExpoRoomPlanViewInterface } from "../modules/expo-room-plan";

export default function Index() {
	const roomPlanRef = useRef<ExpoRoomPlanViewInterface>(null);

	const handleScanComplete = (event: {
		nativeEvent: { success: boolean; path?: string; error?: string };
	}) => {
		if (event.nativeEvent.success) {
			console.log("Scan completed:", event.nativeEvent.path);
		} else {
			console.error("Scan failed:", event.nativeEvent.error);
		}
	};
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<View style={{ flex: 1 }}>
				<ExpoRoomPlanView
					ref={roomPlanRef}
					style={{ flex: 1 }}
					onScanComplete={handleScanComplete}
				/>

				<Button
					title="Start Scan"
					onPress={() => roomPlanRef.current?.startScanning()}
				/>

				<Button
					title="Stop Scan"
					onPress={() => roomPlanRef.current?.stopScanning()}
				/>
			</View>
		</View>
	);
}
