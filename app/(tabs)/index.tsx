import { View, Text, Switch } from "react-native";
import { useState, useContext } from "react";
import { ScreenContext } from "@/context/ScreenContext";
import BreathRate from "@/components/BreathRate";
import EmotionState from "@/components/EmotionState";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);
export default function Home() {
    const screen = useContext(ScreenContext);
    const [breathRate, setBreathRate] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    return (
        <View //chung
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                gap: 0.05 * screen.windowHeight,
            }}
        >
            <EmotionState breathRate={breathRate} enabled={isEnabled} />
            {/* hiển thị kết quả */}
            <View
                style={{
                    // aspectRatio: "0.8/1",
                    width:
                        screen?.windowOrientation === "portrait"
                            ? "75%"
                            : "40%",
                    height: "75%",
                    // screen?.windowOrientation === "landscape"
                    //     ? "75%"
                    //     : "auto",
                }}
            >
                <BreathRate
                    breathRate={breathRate}
                    setBreathRate={setBreathRate}
                    isEnabled={isEnabled}
                    setIsEnabled={setIsEnabled}
                />
            </View>
        </View>
    );
}
