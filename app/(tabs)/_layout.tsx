import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import useStatusBarHeight from "@/components/useStatusBarHeight";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { View, StatusBar, Dimensions, Platform } from "react-native";
import { SettingContext } from "@/context/SettingContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { selectedLanguage } = useContext(SettingContext);
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
        <View style={{ height: "100%", width: "100%" }}>
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
                <View
                    style={{
                        height: statusBarHeight,
                        backgroundColor: "#f0f0f0",
                    }}
                >
                    <StatusBar
                        barStyle={"dark-content"}
                        backgroundColor={"#f0f0f0"}
                    />
                </View>
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
                            height: 60
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
                        name="alarm"
                        options={{
                            title:
                                selectedLanguage == "English"
                                    ? "Reminder"
                                    : "Nhắc nhở",
                            tabBarIcon: ({ color, focused }) => (
                                <TabBarIcon
                                    name={focused ? "alarm" : "alarm-outline"}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="timer"
                        options={{
                            title:
                                selectedLanguage == "English"
                                    ? "Focus"
                                    : "Tập trung",
                            tabBarIcon: ({ color, focused }) => (
                                <TabBarIcon
                                    name={focused ? "timer" : "timer-outline"}
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
        </View>
    );
}
