import { createContext } from "react";
import useStatusBarHeight from "@/components/useStatusBarHeight";
import { Dimensions, Platform } from "react-native";

export const ScreenContext = createContext<{
    platform: string;
    statusBarHeight: number;
    windowHeight: number;
    windowWidth: number;
    windowOrientation: "portrait" | "landscape";
}>({
    platform: "",
    statusBarHeight: 0,
    windowHeight: 0,
    windowWidth: 0,
    windowOrientation: "portrait",
});
export default function ScreenProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ScreenContext.Provider
            value={{
                platform: Platform.OS,
                statusBarHeight: useStatusBarHeight(),
                windowHeight: Dimensions.get("window").height,
                windowWidth: Dimensions.get("window").width,
                windowOrientation:
                    Dimensions.get("window").height >
                    Dimensions.get("window").width
                        ? "portrait"
                        : "landscape",
            }}
        >
            {children}
        </ScreenContext.Provider>
    );
}
