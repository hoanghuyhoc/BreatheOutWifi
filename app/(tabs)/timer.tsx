import { Alert, Pressable, Text, View } from "react-native";
import { useContext, useState, useEffect, useRef } from "react";
import { ScreenContext } from "@/context/ScreenContext";
import { SettingContext } from "@/context/SettingContext";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Ionicons } from "@expo/vector-icons";
import { TimerPickerModal } from "react-native-timer-picker";
import EmotionState from "@/components/EmotionState";
import { BreathRateContext } from "@/context/BreathRateContext";

export default function Timer() {
    const { selectedLanguage } = useContext(SettingContext);
    const screen = useContext(ScreenContext);
    const [playState, setPlayState] = useState<
        "playing" | "paused" | "stopped"
    >("stopped");
    const [initialCountDown, setInitialCountDown] = useState(0);
    const [countdown, setCountdown] = useState(initialCountDown);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const [showTimerPickerModal, setShowTimerPickerModal] = useState(false);
    const [isTimeDisplayed, setIsTimeDisplayed] = useState(true);
    const timerContainerRef = useRef<View>(null);
    const timerTextRef = useRef<Text>(null);
    const { emotion, setIsFocusEnabled } = useContext(BreathRateContext);
    const [isEmotionStateVisible, setIsEmotionStateVisible] = useState(false);
    useEffect(() => {
        if (playState === "playing") {
            setCountdown((prevCountdown) => prevCountdown - 1);
            intervalRef.current = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown == 0) {
                        clearInterval(intervalRef.current);
                        setPlayState("stopped");
                        setIsFocusEnabled(false);
                        setIsEmotionStateVisible(false);
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

    useEffect(() => {
        if (playState === "playing") {
            if (emotion.length < 10) return;
            const allBad = emotion.every(
                (emotion) => emotion === "Sad" || emotion === "Angry"
            );
            if (allBad) {
                onBadEmotionChanged();
            }
        }
    }, [playState, emotion]);

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
                        if (countdown > 0) {
                            setPlayState("playing");
                            setIsEmotionStateVisible(true);
                            setIsFocusEnabled(true);
                        }
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
                            setIsEmotionStateVisible(false);
                            setIsFocusEnabled(false);
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
                            setIsEmotionStateVisible(false);
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

    function onBadEmotionChanged() {
        if (playState === "playing") {
            setPlayState("paused");
            showAlert();
        }
    }
    function showAlert() {
        let alertTitle = "";
        let alertMessage = "";
        let okButtonText = "";
        let cancelButtonText = "";
        if (selectedLanguage == "English") {
            alertTitle = "Alert";
            alertMessage =
                "It seems you are not in a good condition. Please take a break";
            okButtonText = "I am good now";
            cancelButtonText = "I will quit";
        } else {
            alertTitle = "Chú ý";
            alertMessage =
                "Có vẻ tâm trạng của bạn không tốt lắm. Hãy nghỉ ngơi một chút";
            okButtonText = "Tôi đã ổn hơn rồi";
            cancelButtonText = "Tôi sẽ dừng lại";
        }

        Alert.alert(alertTitle, alertMessage, [
            {
                text: okButtonText,
                onPress: () => {
                    setPlayState("playing");
                    // setIsEmotionStateVisible(true);
                },
            },
            {
                text: cancelButtonText,
                onPress: () => {
                    setPlayState("stopped");
                    setIsEmotionStateVisible(false);
                    setIsFocusEnabled(false);
                },
                style: "cancel",
            },
        ]);
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
                    fontSize: 35,
                    color: "#000000",
                    marginTop: 20,
                    display: !isEmotionStateVisible
                        ? "flex": "none",
                }}
            >
                {selectedLanguage == "English"
                    ? "Focus Timer"
                    : "Thời gian tập trung"}
            </Text>
            <EmotionState emotion={emotion} enabled={isEmotionStateVisible} />
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: 30,
                    marginBottom: 40,
                }}
            >
                <AnimatedCircularProgress
                    size={screen.windowWidth * 0.7}
                    width={screen.windowWidth * 0.03}
                    fill={
                        playState !== "stopped"
                            ? (countdown / initialCountDown) * 100
                            : 100
                    }
                    tintColor="#2eb5fa"
                    backgroundColor="#f0f0f0"
                    rotation={0}
                    lineCap="round"
                >
                    {() => (
                        <View
                            ref={timerContainerRef}
                            onLayout={(event) => {
                                const { width, height } =
                                    event.nativeEvent.layout;
                                // calculate the needed font size of timer text to fit the width of this container
                                const fontSize = width / 8 / 0.6;
                                timerTextRef.current?.setNativeProps({
                                    style: { fontSize: fontSize },
                                });
                                setIsTimeDisplayed(true);
                            }}
                            style={{
                                aspectRatio: "1/1",
                                width: "100%",
                                backgroundColor: "transparent",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Pressable
                                onPress={() => {
                                    setShowTimerPickerModal(true);
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "SpaceGrotesk_bold",
                                        fontSize: screen.windowWidth * 0.1,
                                        color: "#8f8f8f",
                                        display: isTimeDisplayed
                                            ? "flex"
                                            : "none",
                                    }}
                                    ref={timerTextRef}
                                    // onLayout={event => {

                                    //     const { width, height } = event.nativeEvent.layout;
                                    //     console.log(width, height, screen.windowWidth * 0.1)
                                    // }}
                                >
                                    {String(
                                        Math.floor(countdown / 3600)
                                    ).padStart(2, "0")}
                                    :
                                    {String(
                                        ((countdown - (countdown % 60)) / 60) %
                                            60
                                    ).padStart(2, "0")}
                                    :{String(countdown % 60).padStart(2, "0")}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </AnimatedCircularProgress>
                <Buttons playState={playState} setPlayState={setPlayState} />
            </View>
            <TimerPickerModal
                visible={showTimerPickerModal}
                setIsVisible={setShowTimerPickerModal}
                modalTitle={
                    selectedLanguage == "English"
                        ? "Focus period"
                        : "Thời gian tập trung"
                }
                onCancel={() => {
                    setShowTimerPickerModal(false);
                }}
                onConfirm={({ hours, minutes, seconds }) => {
                    setInitialCountDown(hours * 3600 + minutes * 60 + seconds);
                    setCountdown(hours * 3600 + minutes * 60 + seconds);
                    setShowTimerPickerModal(false);
                }}
                closeOnOverlayPress
                styles={{
                    theme: "light",
                }}
            />
        </View>
    );
}
