import { requireNativeView } from "expo";

import * as React from "react";

import {
	ExpoRoomPlanViewProps,
	ExpoRoomPlanViewInterface,
} from "./ExpoRoomPlan.types";

// Define the native view props type including ref

type NativeViewType = ExpoRoomPlanViewProps & {
	ref?: React.RefObject<any>;
};

const NativeView: React.ComponentType<NativeViewType> =
	requireNativeView("ExpoRoomPlan");

export default React.forwardRef<
	ExpoRoomPlanViewInterface,
	ExpoRoomPlanViewProps
>((props, ref) => {
	const nativeRef = React.useRef<ExpoRoomPlanViewInterface>(null);

	React.useImperativeHandle(ref, () => ({
		startScanning: () => {
			nativeRef.current?.startScanning();
		},

		stopScanning: () => {
			nativeRef.current?.stopScanning();
		},
	}));

	return <NativeView ref={nativeRef} {...props} />;
});
