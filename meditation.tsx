import { Pressable, StyleSheet, Text, View } from "react-native";
import { useContext, useState, useEffect, useRef } from "react";
import { ScreenContext } from "@/context/ScreenContext";
import { SettingContext } from "@/context/SettingContext";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Ionicons } from "@expo/vector-icons";
import EmotionState from "@/components/EmotionState";
import { BreathRateContext } from "@/context/BreathRateContext";

export default function Meditation() {
    const { selectedLanguage } = useContext(SettingContext);
    const screen = useContext(ScreenContext);
    const [playState, setPlayState] = useState<
        "playing" | "paused" | "stopped"
    >("stopped");
    const [initialCountDown, setInitialCountDown] = useState(60);
    const [countdown, setCountdown] = useState(initialCountDown);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const breathIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const { emotion } = useContext(BreathRateContext);

    // const emotion = {Stressed: "Căng thẳng", Normal: "Ổn định"};
    // const [emotionState, setEmotionState] = useState(emotion.Normal);

    const [isFirstRun, setIsFirstRun] = useState(true);
    const [breathRate, setBreathRate] = useState(0);
    function getRandomNumber() {
        const min = 17,
            max = 18;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        if (playState === "playing") {
            breathIntervalRef.current = setInterval(() => {
                setIsFirstRun((prevIsFirstRun) => {
                    if (prevIsFirstRun) {
                        return false;
                    }
                    // fetchBreathRate();
                    setBreathRate(getRandomNumber());
                    return prevIsFirstRun;
                });
            }, 1000);
        } else if (playState === "stopped") {
            clearInterval(breathIntervalRef.current);
            setBreathRate(0);
        } else if (playState === "paused") {
            clearInterval(breathIntervalRef.current);
        }
        return () => {
            clearInterval(breathIntervalRef.current);
            setBreathRate(0);
        };
    }, [playState]);

    useEffect(() => {
        if (playState === "playing") {
            intervalRef.current = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(intervalRef.current);
                        setPlayState("stopped");
                        return 0;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        } else if (playState === "stopped") {
            clearInterval(intervalRef.current);
            setCountdown((prevCountdown) => initialCountDown);
        } else if (playState === "paused") {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [playState]);

    function Buttons({
        playState,
        setPlayState,
    }: {
        playState: "playing" | "paused" | "stopped";
        setPlayState: Function;
    }) {
        if (playState === "stopped")
            return (
                <Pressable //Start button
                    // onPressIn={() => setIsPlayButtonPressed(true)}
                    // onPressOut={() => setIsPlayButtonPressed(false)}
                    onPress={() => {
                        setPlayState("playing");
                    }}
                    style={{
                        width: "20%",
                        aspectRatio: "1/1",
                        borderRadius: 9999,
                        backgroundColor: "#2eb5fa",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Ionicons
                        name="play"
                        color="white"
                        style={{ fontSize: 0.11 * screen.windowWidth }}
                    />
                </Pressable>
            );
        else if (playState === "playing")
            return (
                <View
                    style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Pressable //pause button
                        // onPressIn={() => setIsPauseButtonPressed(true)}
                        onPressOut={() => {
                            // setIsPauseButtonPressed(false);
                            setPlayState("paused");
                        }}
                        style={{
                            width: 0.2 * screen.windowWidth,
                            aspectRatio: "1/1",
                            borderRadius: 9999,
                            backgroundColor: "#ffcb2e",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons
                            name="pause"
                            color="white"
                            style={{ fontSize: 0.11 * screen.windowWidth }}
                        />
                    </Pressable>
                    <Pressable //stop button
                        // onPressIn={() => setIsStopButtonPressed(true)}
                        onPressOut={() => {
                            // setIsStopButtonPressed(false);
                            setPlayState("stopped");
                        }}
                        style={{
                            width: 0.2 * screen.windowWidth,
                            aspectRatio: "1/1",
                            borderRadius: 9999,
                            backgroundColor: "#ff622e",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons
                            name="stop"
                            color="white"
                            style={{ fontSize: 0.11 * screen.windowWidth }}
                        />
                    </Pressable>
                </View>
            );
        else if (playState === "paused")
            return (
                <View
                    style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Pressable //Start button
                        // onPressIn={() => setIsPlayButtonPressed(true)}
                        onPressOut={() => {
                            // setIsPlayButtonPressed(false);
                            setPlayState("playing");
                        }}
                        style={{
                            width: 0.2 * screen.windowWidth,
                            aspectRatio: "1/1",
                            borderRadius: 9999,
                            backgroundColor: "#2eb5fa",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons
                            name="play"
                            color="white"
                            style={{ fontSize: 0.11 * screen.windowWidth }}
                        />
                    </Pressable>
                    <Pressable //stop button
                        // onPressIn={() => setIsStopButtonPressed(true)}
                        onPressOut={() => {
                            // setIsStopButtonPressed(false);
                            setPlayState("stopped");
                        }}
                        style={{
                            width: 0.2 * screen.windowWidth,
                            aspectRatio: "1/1",
                            borderRadius: 9999,
                            backgroundColor: "#ff622e",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons
                            name="stop"
                            color="white"
                            style={{ fontSize: 0.11 * screen.windowWidth }}
                        />
                    </Pressable>
                </View>
            );
    }

    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f0f0f0",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
            }}
        >
            <Text
                style={{
                    fontFamily: "SpaceGrotesk_bold",
                    fontSize: screen.windowHeight * 0.07,
                }}
            >
                {selectedLanguage == "English" ? "Let's relax" : "Hãy thư giãn"}
            </Text>
            {/* <Text
                style={{
                    fontFamily: "SpaceGrotesk_bold",
                    fontSize: screen.windowHeight * 0.07 * 0.5,
                    color: "#8f8f8f",
                }}
            >
                Theme: Twilight
            </Text> */}
            <EmotionState
                enabled={playState !== "stopped"}
                emotion={emotion}
            />
            <AnimatedCircularProgress
                size={screen.windowWidth * 0.7}
                width={screen.windowWidth * 0.03}
                fill={(countdown / initialCountDown) * 100}
                tintColor="#2eb5fa"
                backgroundColor="#f0f0f0"
                rotation={0}
                lineCap="round"
            >
                {() => (
                    <View
                        style={{
                            aspectRatio: "1/1",
                            width: "100%",
                            backgroundColor: "transparent",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 35,
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "black",
                                    fontFamily: "SpaceGrotesk_bold",
                                    fontSize: 0.15 * screen.windowHeight,
                                    height: 0.16 * screen.windowHeight,
                                }}
                            >
                                {breathRate}
                            </Text>
                            <Text
                                style={{
                                    color: "black",
                                    fontFamily: "SpaceGrotesk_regular",
                                    fontSize: 0.03778 * screen.windowHeight,
                                }}
                            >
                                {selectedLanguage == "English"
                                    ? "breath/min"
                                    : "nhịp/phút"}
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontFamily: "SpaceGrotesk_bold",
                                fontSize: screen.windowHeight * 0.045,
                                color: "#8f8f8f",
                            }}
                        >
                            {String(Math.floor(countdown / 60)).padStart(
                                2,
                                "0"
                            )}
                            :{String(countdown % 60).padStart(2, "0")}
                        </Text>
                    </View>
                )}
            </AnimatedCircularProgress>
            <Buttons playState={playState} setPlayState={setPlayState} />
        </View>
    );
}
