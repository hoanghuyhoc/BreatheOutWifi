import {
    View,
    Text,
    Switch,
    ScrollView,
    TextInput,
    Pressable,
    Image,
    StyleSheet,
    InteractionManager,
} from "react-native";
import { useState, useContext, useEffect, useRef } from "react";
import { BreathRateContext } from "@/context/BreathRateContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-native-markdown-display";
import { SettingContext } from "@/context/SettingContext";

export default function Chat({
    windowHeight,
    isTracking,
}: {
    windowHeight: number;
    isTracking: boolean;
}) {
    const AImodel = new GoogleGenerativeAI(
        "AIzaSyD6_gvBXrTittuuzC4cLCyKmKUeAo2w1aA"
    ).getGenerativeModel({ model: "gemini-1.5-flash" });

    // console.log(completion.choices[0].message.content);
    const { emotion } = useContext(BreathRateContext);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [sendButtonPress, setSendButtonPress] = useState(false);
    const { selectedLanguage } = useContext(SettingContext);
    const [count, setCount] = useState(0);
    const [change, setChange] = useState(false);
    let isScrolledToEnd = false; // Flag to track if the scroll view is scrolled to the end

    useEffect(() => {
        if (count > 60) {
            setCount(0);
            setChange(!change);
            return;
        }
        setCount(count + 1);
    }, [emotion]);

    useEffect(() => {
        if (!isTracking) return;
        // Check whether all 10 elements in emotion in the array are the same, if so, return
        const allSame = emotion.every((item) => item === emotion.at(-1));
        if (allSame) return;
        let tempQuestion = "";
        switch (emotion.at(-1)) {
            case "Happy":
                tempQuestion =
                    selectedLanguage == "English"
                        ? "I am happy. Give me some short advice."
                        : "Tôi đang rất vui. Hãy cho tôi một lời khuyên ngắn khoảng 6 câu.";
                break;
            case "Sad":
                tempQuestion =
                    selectedLanguage == "English"
                        ? "I am sad. Give me some short advice."
                        : "Tôi đang buồn. Hãy cho tôi một lời khuyên ngắn khoảng 6 câu.";
                break;
            case "Angry":
                tempQuestion =
                    selectedLanguage == "English"
                        ? "I am angry. Give me some short advice."
                        : "Tôi đang tức giận. Hãy cho tôi một lời khuyên ngắn khoảng 6 câu.";
                break;
            case "Neutral":
                tempQuestion =
                    selectedLanguage == "English"
                        ? "I am neutral. Give me some short advice."
                        : "Tôi đang cảm thấy bình thường. Hãy cho tôi một lời khuyên ngắn khoảng 6 câu.";
                break;
            default:
                tempQuestion =
                    selectedLanguage == "English"
                        ? "I am neutral. Give me some short advice."
                        : "Tôi đang cảm thấy bình thường. Hãy cho tôi một lời khuyên ngắn khoảng 6 câu.";
                break;
        }

        AImodel.generateContent(tempQuestion)
            .then((response) => {
                console.log("Received answer");
                const AIresponse = response.response.text();
                setAnswer((currentText) => {
                    return currentText + "**[Gemini]** " + AIresponse + "\n";
                });
                scrollViewRef.current?.scrollToEnd({ animated: true });
                console.log("Showed answer");
            })
            .catch((error) => {
                setAnswer((currentText) => {
                    return (
                        currentText +
                        "[" +
                        (selectedLanguage == "English" ? "Error" : "Lỗi") +
                        "]: " +
                        error +
                        "\n"
                    );
                });
            });
    }, [change]);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            // wait for 2 seconds before scrolling to end
            // setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
            console.log("Scrolled to end");
            // }, 2000);
        });
    }, [answer]);

    const scrollViewRef = useRef<ScrollView>(null);

    return (
        <View
            style={{
                width: "90%",
                borderRadius: 10,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                borderWidth: 2,
            }}
        >
            <ScrollView
                ref={scrollViewRef}
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#808080",
                    // padding: 0,
                    minHeight: 1 * (0.03 * windowHeight + 10) + 20,
                    maxHeight: 4 * (0.03 * windowHeight + 10) + 20,
                }}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingBottom: 5,
                }}
            >
                <Markdown
                    style={{
                        _: {
                            width: "100%",
                            // fontSize: 0.03 * windowHeight,
                            textAlign: "left",
                            textAlignVertical: "top",
                            fontFamily: "SpaceGrotesk_regular",
                        },
                    }}
                >
                    {answer === ""
                        ? selectedLanguage == "English"
                            ? "Hello, how are you doing today?"
                            : "Xin chào, hôm nay của bạn như thế nào?"
                        : answer}
                </Markdown>
            </ScrollView>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // padding: 10,
                    backgroundColor: "#cfcfcf",
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                }}
            >
                <TextInput
                    placeholder={
                        selectedLanguage == "English"
                            ? "Share your feelings..."
                            : "Chia sẻ cảm xúc của bạn..."
                    }
                    style={{
                        flex: 1,
                        margin: 10,
                    }}
                    value={question}
                    onChangeText={(text) => setQuestion(text)}
                />
                <Pressable
                    style={{
                        borderRadius: 5,
                        padding: 5,
                        margin: 5,
                        backgroundColor: sendButtonPress
                            ? "#1d7099"
                            : "#2eb5fa",
                    }}
                    onPressIn={() => {
                        setSendButtonPress(true);
                    }}
                    onPressOut={() => {
                        setSendButtonPress(false);
                    }}
                    onPress={() => {
                        console.log(question);
                        setAnswer((currentText) => {
                            return (
                                currentText +
                                "**[" +
                                (selectedLanguage == "English"
                                    ? "You"
                                    : "Bạn") +
                                "]** " +
                                question +
                                "\n\n"
                            );
                        });
                        AImodel.generateContent(question)
                            .then((response) => {
                                console.log("Received answer");
                                const AIresponse = response.response.text();
                                setAnswer((currentText) => {
                                    return (
                                        currentText +
                                        "**[Gemini]** " +
                                        AIresponse +
                                        "\n"
                                    );
                                });
                                scrollViewRef.current?.scrollToEnd({
                                    animated: true,
                                });
                                // console.log("Scrolled answer");
                                setQuestion("");
                            })
                            .catch((error) => {
                                console.log("Received error");
                                setAnswer((currentText) => {
                                    return (
                                        currentText +
                                        "[" +
                                        (selectedLanguage == "English"
                                            ? "Error"
                                            : "Lỗi") +
                                        "]: " +
                                        error +
                                        "\n"
                                    );
                                });
                                scrollViewRef.current?.scrollToEnd({
                                    animated: true,
                                });
                                console.log("Scrolled error");
                            });
                        console.log("sent");
                    }}
                >
                    <Image
                        source={require("@/assets/images/send-icon.png")} // Import the image
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    />
                </Pressable>
            </View>
        </View>
    );
}
