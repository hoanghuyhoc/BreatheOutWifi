import ScreenProvider from "@/context/ScreenContext";
import { Stack } from "expo-router";
import BreathRateProvider from "@/context/BreathRateContext";
import SettingProvider from "@/context/SettingContext";

export default function App() {
    return (
        <BreathRateProvider>
            <ScreenProvider>
                <SettingProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" />
                    </Stack>
                </SettingProvider>
            </ScreenProvider>
        </BreathRateProvider>
    );
}
