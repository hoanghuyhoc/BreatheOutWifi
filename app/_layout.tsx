import ScreenProvider from "@/context/ScreenContext";
import LanguageProvider from "@/context/LanguageContext";
import { Slot, Stack, Tabs } from "expo-router";
import { Text } from "react-native";

export default function App() {
    return (
        <ScreenProvider>
            <LanguageProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                </Stack>
            </LanguageProvider>
        </ScreenProvider>
    );
}
