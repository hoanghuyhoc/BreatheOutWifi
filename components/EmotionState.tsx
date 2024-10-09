import { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { LanguageContext } from "@/context/LanguageContext";

export default function EmotionState({
    breathRate,
    enabled,
}: {
    breathRate: number;
    enabled: boolean;
}) {
    const { selectedLanguage } = useContext(LanguageContext);
    const emotion = {
        Stressed: {
            EngText: "Stressed",
            VieText: "Căng thẳng",
            TextColor: "#c7a600",
            Background: "#ffeb85",
        },
        Normal: {
            EngText: "Neutral",
            VieText: "Bình thường",
            TextColor: "#028700",
            Background: "#89ff87",
        },
    };
    const [backgroundColor, setBackgroundColor] = useState(
        emotion.Normal.Background
    );
    const [textColor, setTextColor] = useState(emotion.Normal.TextColor);
    const [text, setText] = useState(
        selectedLanguage == "English"
            ? emotion.Normal.EngText
            : emotion.Normal.VieText
    );

    useEffect(() => {
        if (breathRate >= 19) {
            // if (true) {
            setBackgroundColor(emotion.Stressed.Background);
            setTextColor(emotion.Stressed.TextColor);
            setText(
                selectedLanguage == "English"
                    ? emotion.Stressed.EngText
                    : emotion.Stressed.VieText
            );
        } else {
            setBackgroundColor(emotion.Normal.Background);
            setTextColor(emotion.Normal.TextColor);
            setText(
                selectedLanguage == "English"
                    ? emotion.Normal.EngText
                    : emotion.Normal.VieText
            );
        }
    }, [breathRate]);

    return (
        <View
            style={{
                borderRadius: 9999,
                padding: 20,
                backgroundColor: backgroundColor,
                opacity: enabled ? 1 : 0,
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
