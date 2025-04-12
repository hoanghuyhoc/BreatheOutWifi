import {
    View,
    Text,
    Switch,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { ScreenContext } from "@/context/ScreenContext";
import { BreathRateContext } from "@/context/BreathRateContext";
import { LogBox } from "react-native";
import Chat from "@/components/Chat";
import EmotionCheck from "@/components/EmotionCheck";

LogBox.ignoreAllLogs(true);
export default function Home() {
    const screen = useContext(ScreenContext);
    const { isHomeEnabled, setIsHomeEnabled, emotion } = useContext(BreathRateContext);

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
            }}
            keyboardVerticalOffset={20}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on platform
        >
            <ScrollView //chung
                style={{
                    width: "100%",
                    backgroundColor: "#f0f0f0",
                }}
                contentContainerStyle={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 5,
                    paddingBottom: 10,
                }}
            >
                <View
                    style={{
                        height: "auto",
                        width: "100%",
                        backfaceVisibility: "hidden",
                        // backgroundColor: "#f2b3ae",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingBottom: 0.05 * screen.windowHeight,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.05 * screen.windowHeight,
                    }}
                >
                    <View
                        style={{
                            borderRadius: 9999,
                            padding: 20,
                            // backgroundColor: backgroundColor,
                            opacity: 0,
                        }}
                    >
                        {/* <Text
                            style={{
                                // color: textColor,
                                fontSize: 20,
                                fontFamily: "SpaceGrotesk_bold",
                            }}
                        >
                        </Text> */}
                    </View>
                    {/* hiển thị kết quả */}
                    <View
                        style={{
                            // aspectRatio: "0.8/1",
                            width:
                                screen?.windowOrientation === "portrait"
                                    ? "75%"
                                    : "40%",
                            height: "auto",
                            // screen?.windowOrientation === "landscape"
                            //     ? "75%"
                            //     : "auto",
                        }}
                    >
                        <EmotionCheck />
                    </View>
                </View>
                <Chat
                    windowHeight={screen.windowHeight}
                    isTracking={isHomeEnabled}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
