import React, { createContext, useState } from "react";

export type Emotion = "Happy" | "Sad" | "Angry" | "Neutral" | "";
export const BreathRateContext = createContext<{
    isHomeEnabled: boolean;
    setIsHomeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    isFocusEnabled: boolean;
    setIsFocusEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    emotion: Emotion[];
    setEmotion: React.Dispatch<React.SetStateAction<Emotion[]>>;
}>({
    isHomeEnabled: false,
    setIsHomeEnabled: () => {},
    emotion: ["Neutral"],
    setEmotion: () => {},
    isFocusEnabled: false,
    setIsFocusEnabled: () => {},
});

export default function BreathRateProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [emotion, setEmotion] = useState<Emotion[]>(["Neutral"]);
    const [isHomeEnabled, setIsHomeEnabled] = useState(false);
    const [isFocusEnabled, setIsFocusEnabled] = useState(false);
    return (
        <BreathRateContext.Provider
            value={{
                isHomeEnabled: isHomeEnabled,
                setIsHomeEnabled: setIsHomeEnabled,
                emotion: emotion,
                setEmotion: setEmotion,
                isFocusEnabled: isFocusEnabled,
                setIsFocusEnabled: setIsFocusEnabled,
            }}
        >
            {children}
        </BreathRateContext.Provider>
    );
}
