import { View, Text } from "react-native";
import MyLineChart from "@/components/MyLineChart";
import { useContext } from "react";
import { ScreenContext } from "@/context/ScreenContext";
import { LanguageContext } from "@/context/LanguageContext";
import LineChart from "@/components/AnotherLineChart";
export default function Dashboard() {
    const { selectedLanguage } = useContext(LanguageContext);
    const screen = useContext(ScreenContext);
    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
            }}
        >
            {/* <MyLineChart
                height={
                    screen.windowOrientation === "portrait"
                        ? 0.8 * screen.windowWidth
                        : 0.6 * screen.windowHeight
                }
                width={
                    screen.windowOrientation === "portrait"
                        ? 0.8 * screen.windowWidth
                        : 0.6 * screen.windowHeight
                }
            /> */}
            <LineChart
                containerStyle={{
                    width: "80%",
                    height: "50%",
                    backgroundColor: "white",
                }}
            />
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "90%",
                    height: "40%",
                    gap: 20,
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexGrow: 1,
                        backgroundColor: "white",
                        borderRadius: 20,
                        width: "45%",
                        height: "60%",
                        padding: 10,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "SpaceGrotesk_bold",
                            fontSize: 25,
                            color: "#2eb5fa",
                        }}
                    >
                        {selectedLanguage == "English"
                            ? "Average rate"
                            : "Trung bình"}
                    </Text>
                    <View
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-end",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "SpaceGrotesk_bold",
                                fontSize: 50,
                                height: 52,
                            }}
                        >
                            19
                        </Text>
                        <Text
                            style={{
                                fontFamily: "SpaceGrotesk_regular",
                                fontSize: 15,
                                height: 17,
                            }}
                        >
                            {selectedLanguage == "English"
                                ? "breath/min"
                                : "nhịp/phút"}
                        </Text>
                    </View>
                </View>
                {/* <View
                    style={{
                        flexGrow: 1,
                        backgroundColor: "white",
                        borderRadius: 20,
                        width: "45%",
                        height: "60%",
                        padding: 10,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "SpaceGrotesk_bold",
                            fontSize: 25,
                            color: "#2eb5fa",
                        }}
                    >
                        {selectedLanguage == "English"
                            ? "Heart rate"
                            : "Nhịp tim"}
                    </Text>
                    <View
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-end",
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "SpaceGrotesk_bold",
                                fontSize: 50,
                                height: 52,
                            }}
                        >
                            70
                        </Text>
                        <Text
                            style={{
                                fontFamily: "SpaceGrotesk_regular",
                                fontSize: 15,
                                height: 17,
                            }}
                        >
                            {selectedLanguage == "English"
                                ? "beat/min"
                                : "nhịp/phút"}
                        </Text>
                    </View>
                </View> */}
            </View>
        </View>
    );
}
