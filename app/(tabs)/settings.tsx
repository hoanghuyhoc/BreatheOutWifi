import {
    View,
    Text,
    Pressable,
    Modal,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";
import { ScreenContext } from "@/context/ScreenContext";
import { LanguageContext } from "@/context/LanguageContext";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import Picker from "react-native-picker-select";

var screenWindowHeight = 0;
export default function Settings() {
    const { selectedLanguage, setSelectedLanguage } =
        useContext(LanguageContext);
    const screen = useContext(ScreenContext);
    screenWindowHeight = screen.windowHeight;
    const [modalVisible, setModalVisible] = useState(false);
    // const data = [
    //     { key: "1", value: "Tiếng Việt" },
    //     { key: "2", value: "English" },
    // ];
    const languages = ["English", "Tiếng Việt"];

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
            {/* <Text
                style={{
                    color: "#2eb5fa",
                    fontFamily: "SpaceGrotesk_bold",
                    fontSize: 0.03778 * screen.windowHeight,
                }}
            >
                Settings
            </Text> */}
            <View
                style={{
                    borderRadius: 40,
                    backgroundColor: "white",
                    width: "95%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 20,
                }}
            >
                <Text
                    style={{
                        fontFamily: "SpaceGrotesk_bold",
                        fontSize: 0.03 * screen.windowHeight,
                    }}
                >
                    {selectedLanguage == "English" ? "Language" : "Ngôn ngữ"}
                </Text>
                <Pressable
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                    }}
                    onPress={() => {
                        setModalVisible(true);
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "SpaceGrotesk_regular",
                            fontSize: 0.03 * screen.windowHeight,
                        }}
                    >
                        {selectedLanguage}
                    </Text>
                    <Ionicons
                        name="chevron-forward"
                        size={0.03 * screen.windowHeight}
                        color="black"
                    />
                </Pressable>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {languages.map((language, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.languageOption}
                                onPress={() => {
                                    setSelectedLanguage(language);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.languageText}>
                                    {language}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "gray",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    languageOption: {
        padding: 10,
        width: "100%",
        alignItems: "center",
    },
    languageText: {
        fontFamily: "SpaceGrotesk_regular",
        fontSize: 0.03 * screenWindowHeight,
        color: "white",
    },
    closeButton: {
        marginTop: 20,
        fontSize: 16,
        color: "blue",
    },
});
