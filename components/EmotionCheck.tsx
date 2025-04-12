import { Pressable, Text, View } from "react-native";
import { useContext, useEffect, useState, useRef } from "react";
import { ScreenContext } from "@/context/ScreenContext";
import { SettingContext } from "@/context/SettingContext";
import { BreathRateContext, Emotion } from "@/context/BreathRateContext";

export default function EmotionCheck() {
    const {
        isHomeEnabled,
        setIsHomeEnabled,
        isFocusEnabled,
        emotion,
        setEmotion,
    } = useContext(BreathRateContext);
    const { selectedLanguage } = useContext(SettingContext);
    const _emotion = {
        Angry: {
            EngText: "Angry",
            VieText: "Tức giận",
            TextColor: "#fae900",
            Background: "#bd1f00",
        },
        Neutral: {
            EngText: "Neutral",
            VieText: "Bình thường",
            TextColor: "#000000",
            Background: "#89ff87",
        },
        Happy: {
            EngText: "Happy",
            VieText: "Vui vẻ",
            TextColor: "#0067ed",
            Background: "#ffeb38",
        },
        Sad: {
            EngText: "Sad",
            VieText: "Buồn",
            TextColor: "#47afff",
            Background: "#0000b0",
        },
    };
    const [backgroundColor, setBackgroundColor] = useState(
        _emotion.Neutral.Background
    );
    const [textColor, setTextColor] = useState(_emotion.Neutral.TextColor);
    const [text, setText] = useState(
        selectedLanguage == "English"
            ? _emotion.Neutral.EngText
            : _emotion.Neutral.VieText
    );

    useEffect(() => {
        switch (emotion.at(-1)) {
            case "Happy":
                setBackgroundColor(_emotion.Happy.Background);
                setTextColor(_emotion.Happy.TextColor);
                setText(
                    selectedLanguage == "English"
                        ? _emotion.Happy.EngText
                        : _emotion.Happy.VieText
                );
                break;
            case "Sad":
                setBackgroundColor(_emotion.Sad.Background);
                setTextColor(_emotion.Sad.TextColor);
                setText(
                    selectedLanguage == "English"
                        ? _emotion.Sad.EngText
                        : _emotion.Sad.VieText
                );
                break;
            case "Angry":
                setBackgroundColor(_emotion.Angry.Background);
                setTextColor(_emotion.Angry.TextColor);
                setText(
                    selectedLanguage == "English"
                        ? _emotion.Angry.EngText
                        : _emotion.Angry.VieText
                );
                break;
            case "Neutral":
                setBackgroundColor(_emotion.Neutral.Background);
                setTextColor(_emotion.Neutral.TextColor);
                setText(
                    selectedLanguage == "English"
                        ? _emotion.Neutral.EngText
                        : _emotion.Neutral.VieText
                );
                break;

            default:
                setBackgroundColor(_emotion.Neutral.Background);
                setTextColor(_emotion.Neutral.TextColor);
                setText(
                    selectedLanguage == "English"
                        ? _emotion.Neutral.EngText
                        : _emotion.Neutral.VieText
                );
                break;
        }
    }, [emotion]);

    const screen = useContext(ScreenContext);
    const [isStartPressed, setIsStartPressed] = useState(false);
    const [isStopPressed, setIsStopPressed] = useState(false);

    let count = 0;

    const { serverAddress } = useContext(SettingContext);

    function updateEmotion(emotion: Emotion) {
        setEmotion((prev: Emotion[]) => {
            // if prev length is over 10, remove the first element
            if (emotion == "") emotion = "Neutral";
            if (prev.length >= 10) {
                return [...prev.slice(1), emotion];
            }
            return [...prev, emotion];
        });
    }
    const [_, setIsFirstRun] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const fetchEmotion = async () => {
        try {
            const response = await fetch(`${serverAddress}/`);
            const data: { emotion: Emotion } = await response
                .json()
                .then((data) => data);
            // Adjust according to your API response structure
            console.log("Emotion fetched:", data.emotion);
            updateEmotion(data.emotion);
        } catch (error) {
            console.error("Error fetching data:", error);
            updateEmotion("Neutral");
        }
    };

    useEffect(() => {
        if (!isHomeEnabled && !isFocusEnabled) {
            updateEmotion("Neutral");
            clearInterval(intervalRef.current);
        } else {
            intervalRef.current = setInterval(() => {
                setIsFirstRun((prev) => {
                    if (prev) {
                        return false;
                    }
                    // fetchEmotion();
                    // if (count < 20) {
                    //     updateEmotion("Neutral");
                    //     count++;
                    //     console.log(`update ${count} Neutral`);
                    // } else if (count < 40) {
                    //     updateEmotion("Angry");
                    //     count++;
                    //     console.log(`update ${count} Angry`);
                    // } else {
                    //     count = 0;
                    //     updateEmotion("Neutral");
                    //     count++;
                    //     console.log(`update ${count} Neutral`);
                    // }
                    if (count < 5) {
                        updateEmotion("Neutral");
                        count++;
                        console.log(`update ${count} Neutral`);
                    } else if (count < 15) {
                        updateEmotion("Angry");
                        count++;
                        console.log(`update ${count} Angry`);
                    } else if (count < 20) {
                        updateEmotion("Sad");
                        count++;
                        console.log(`update ${count} Sad`);
                    } else if (count < 25) {
                        updateEmotion("Happy");
                        count++;
                        console.log(`update ${count} Happy`);
                    } else {
                        count = 0;
                        updateEmotion("Neutral");
                        count++;
                        console.log(`update ${count} Neutral`);
                    }

                    return prev;
                });
            }, 1000);
        }
        return () => {
            clearInterval(intervalRef.current);
            // setBreathRate(0);
        };
    }, [isHomeEnabled, isFocusEnabled]);

    return (
        <View
            style={{
                // aspectRatio: "0.8/1",
                height: "auto",
                gap: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Pressable
                // ref={trackButtonRef}
                disabled={isHomeEnabled}
                onPressIn={() => setIsStartPressed(true)}
                onPressOut={() => {
                    setIsStartPressed(false);
                    setIsHomeEnabled(true);
                }}
                style={{
                    aspectRatio: "1/1",
                    width:
                        screen.windowOrientation == "portrait"
                            ? "100%"
                            : "auto",
                    height:
                        screen.windowOrientation == "portrait"
                            ? "auto"
                            : "100%",
                    borderRadius: 9999,
                    borderWidth: 1,
                    backgroundColor: isHomeEnabled
                        ? backgroundColor
                        : isStartPressed
                        ? "#1f77a3"
                        : "#2eb5fa",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {isHomeEnabled ? (
                    <>
                        <Text
                            style={{
                                color: textColor,
                                fontSize: 0.08 * screen.windowHeight,
                                fontFamily: "SpaceGrotesk_bold",
                                textAlign: "center",
                            }}
                        >
                            {text}
                        </Text>
                    </>
                ) : (
                    <Text
                        style={{
                            color: "white",
                            fontFamily: "SpaceGrotesk_bold",
                            fontSize: 0.08 * screen.windowHeight,
                        }}
                    >
                        {selectedLanguage == "English" ? "TRACK" : "THEO DÕI"}
                    </Text>
                )}
            </Pressable>
            <Pressable
                disabled={!isHomeEnabled}
                onPressIn={() => setIsStopPressed(true)}
                onPressOut={() => {
                    setIsStopPressed(false);
                    setIsHomeEnabled(false);
                }}
                style={{
                    opacity: isHomeEnabled ? 1 : 0,
                    borderRadius: 9999,
                    backgroundColor: isStopPressed ? "#b87c3d" : "#ffac54",
                    padding: 0.014 * screen.windowHeight,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontFamily: "SpaceGrotesk_bold",
                        fontSize: 0.03 * screen.windowHeight,
                    }}
                >
                    {selectedLanguage == "English" ? "STOP" : "DỪNG"}
                </Text>
            </Pressable>
        </View>
    );
}
