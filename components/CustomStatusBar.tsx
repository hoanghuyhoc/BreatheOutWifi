import useStatusBarHeight from "./useStatusBarHeight";
import { View, StatusBar } from "react-native";

export default function CustomStatusBar() {
    const statusBarHeight = useStatusBarHeight();
    return (
        <View
            style={{
                height: statusBarHeight,
                backgroundColor: "blue",
            }}
        >
            <StatusBar
                barStyle={"default"}
                translucent
                networkActivityIndicatorVisible
            />
        </View>
    );
}
