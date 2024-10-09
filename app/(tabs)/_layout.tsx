import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect } from "react";
import useStatusBarHeight from "@/components/useStatusBarHeight";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { View, StatusBar, Dimensions, Platform, Text } from "react-native";
import { ScreenContext } from "@/context/ScreenContext";
import { LanguageContext } from "@/context/LanguageContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { selectedLanguage } = useContext(LanguageContext);
    const statusBarHeight = useStatusBarHeight();
    const [loaded] = useFonts({
        SpaceGrotesk_regular: require("@/assets/fonts/SpaceGrotesk_regular.ttf"),
        SpaceGrotesk_bold: require("@/assets/fonts/SpaceGrotesk_bold.ttf"),
    });

    useEffect(() => {
        setTimeout(() => {}, 2000);
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <>
            {Platform.OS === "ios" ? (
                <View
                    style={{
                        height: statusBarHeight,
                        backgroundColor: "#f0f0f0",
                    }}
                >
                    <StatusBar
                        barStyle={"default"}
                        translucent
                        networkActivityIndicatorVisible
                    />
                </View>
            ) : (
                <StatusBar
                    barStyle={"default"}
                    translucent
                    backgroundColor={"#f0f0f0"}
                />
            )}
            <View
                style={{
                    height: Dimensions.get("window").height - statusBarHeight,
                    width: "100%",
                    backgroundColor: "#f0f0f0",
                }}
            >
                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor: "#2eb5fa",
                        headerShown: false,
                        tabBarStyle: {
                            shadowColor: "rgba(32, 143, 246, 0.3)",
                            shadowOffset: {
                                width: 0,
                                height: -1,
                            },
                            shadowOpacity: 1,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        },
                    }}
                >
                    <Tabs.Screen
                        name="index"
                        options={{
                            title:
                                selectedLanguage == "English"
                                    ? "Home"
                                    : "Trang chủ",
                            tabBarIcon: ({ color, focused }) => (
                                <TabBarIcon
                                    name={focused ? "home" : "home-outline"}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="dashboard"
                        options={{
                            title:
                                selectedLanguage == "English"
                                    ? "Dashboard"
                                    : "Thống kê",
                            tabBarIcon: ({ color, focused }) => (
                                <TabBarIcon
                                    name={focused ? "pulse" : "pulse-outline"}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="meditation"
                        options={{
                            title:
                                selectedLanguage == "English"
                                    ? "Meditate"
                                    : "Thiền",
                            tabBarIcon: ({ color, focused }) => (
                                <TabBarIcon
                                    name={focused ? "heart" : "heart-outline"}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="settings"
                        options={{
                            title:
                                selectedLanguage == "English"
                                    ? "Settings"
                                    : "Cài đặt",
                            tabBarIcon: ({ color, focused }) => (
                                <TabBarIcon
                                    name={
                                        focused
                                            ? "settings"
                                            : "settings-outline"
                                    }
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Tabs>
            </View>
        </>
    );
}
