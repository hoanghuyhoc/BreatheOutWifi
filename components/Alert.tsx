import { Text, Animated } from "react-native";
import { ScreenContext } from "@/context/ScreenContext";
import { useContext } from "react";

export default function Alert() {
    const { windowHeight, windowWidth } = useContext(ScreenContext);
    const opacity = new Animated.Value(0);
    return (
        <Animated.View
            style={{
                maxWidth: windowWidth * 0.9,
                padding: 10,
                borderRadius: 10,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "black",
                shadowRadius: 5,
                top: 15,
                opacity: opacity,
                position: "fixed",
            }}
        >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                Please check your input and try again.
            </Text>
        </Animated.View>
    );
}
