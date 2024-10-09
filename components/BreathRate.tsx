import { Pressable, Text, View } from "react-native";
import { useContext, useEffect, useState, useRef } from "react";
import { ScreenContext } from "@/context/ScreenContext";
import { LanguageContext } from "@/context/LanguageContext";

export default function BreathRate({
    breathRate,
    setBreathRate,
    isEnabled,
    setIsEnabled,
}: {
    breathRate: number;
    setBreathRate: (breathRate: number) => void;
    isEnabled: boolean;
    setIsEnabled: (enabled: boolean) => void;
}) {
    const { selectedLanguage } = useContext(LanguageContext);
    const screen = useContext(ScreenContext);
    const [isStartPressed, setIsStartPressed] = useState(false);
    const [isStopPressed, setIsStopPressed] = useState(false);

    const [isFirstRun, setIsFirstRun] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    function getRandomNumber() {
        const min = 17,
            max = 18;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //call API Giangvien: 10.10.30.115:8000
    // const fetchBreathRate = async () => {
    //     try {
    //         const response = await fetch('https://35d3p0g9-8000.asse.devtunnels.ms/breath');
    //         const data = await response.json().then((data) => data);
    //         // Adjust according to your API response structure
    //         console.log('Data fetched:', data);
    //         setBreathRate(Math.round(data));
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    useEffect(() => {
        if (!isEnabled) {
            setBreathRate(0);
            clearInterval(intervalRef.current);
        } else {
            intervalRef.current = setInterval(() => {
                setIsFirstRun((prev) => {
                    if (prev) {
                        return false;
                    }
                    setBreathRate(getRandomNumber());
                    // fetchBreathRate();
                    return prev;
                });
            }, 1000);
        }
        return () => {
            clearInterval(intervalRef.current);
            setBreathRate(0);
        };
    }, [isEnabled]);

    return (
        <View
            style={{
                // aspectRatio: "0.8/1",
                height: "100%",
                gap: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Pressable
                disabled={isEnabled}
                onPressIn={() => setIsStartPressed(true)}
                onPressOut={() => {
                    setIsStartPressed(false);
                    setIsEnabled(!isEnabled);
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
                    backgroundColor: isStartPressed ? "#1f77a3" : "#2eb5fa",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {isEnabled ? (
                    <>
                        <Text
                            style={{
                                color: "white",
                                fontFamily: "SpaceGrotesk_bold",
                                fontSize: 0.15 * screen.windowHeight,
                            }}
                        >
                            {breathRate}
                        </Text>
                        <Text
                            style={{
                                color: "white",
                                fontFamily: "SpaceGrotesk_regular",
                                fontSize: 0.03778 * screen.windowHeight,
                            }}
                        >
                            {selectedLanguage == "English"
                                ? "breath/min"
                                : "nhịp/phút"}
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
                        {selectedLanguage == "English" ? "START" : "BẮT ĐẦU"}
                    </Text>
                )}
            </Pressable>
            <Pressable
                disabled={!isEnabled}
                onPressIn={() => setIsStopPressed(true)}
                onPressOut={() => {
                    setIsStopPressed(false);
                    setIsEnabled(!isEnabled);
                }}
                style={{
                    opacity: isEnabled ? 1 : 0,
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
