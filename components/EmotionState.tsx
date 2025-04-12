import { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { SettingContext } from "@/context/SettingContext";
import { BreathRateContext, Emotion } from "@/context/BreathRateContext";

export default function EmotionState({
    emotion,
    enabled,
}: {
    emotion: Emotion[];
    enabled: boolean;
}) {
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
            TextColor: "#295228",
            Background: "#89ff87",
        },
        Happy: {
            EngText: "Happy",
            VieText: "Vui vẻ",
            TextColor: "#0067ed",
            Background: "#f7ffa1",
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

    return (
        <View
            style={{
                borderRadius: 9999,
                padding: 20,
                backgroundColor: backgroundColor,
                display: enabled ? "flex" : "none",
                borderWidth: 1,
            }}
        >
            <Text
                style={{
                    color: textColor,
                    fontSize: 20,
                    fontFamily: "SpaceGrotesk_bold",
                }}
            >
                {`${
                    selectedLanguage == "English" ? "Emotion" : "Cảm xúc"
                }: ${text}`}
            </Text>
        </View>
    );
}
