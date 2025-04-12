import {
    View,
    Text,
    Pressable,
    Modal,
    StyleSheet,
    TouchableOpacity,
    ModalProps,
    TextInput,
    Button,
} from "react-native";
import { useContext, useRef, useState } from "react";
import { ScreenContext } from "@/context/ScreenContext";
import { SettingContext } from "@/context/SettingContext";
import { Ionicons } from "@expo/vector-icons";
import { BreathRateContext } from "@/context/BreathRateContext";

export default function Settings() {
    const {
        selectedLanguage,
        setSelectedLanguage,
        serverAddress,
        setServerAddress,
    } = useContext(SettingContext);
    
    const [tempAddress, setTempAddress] = useState(serverAddress);
    const {
        setEmotion,
        setIsFocusEnabled,
        setIsHomeEnabled
    } = useContext(BreathRateContext);
    const screen = useContext(ScreenContext);
    const [languageOptionModalVisible, setLanguageOptionModalVisible] =
        useState(false);
    const [serverAddressModalVisible, setServerAddressModalVisible] =
        useState(false);
    const [resetDataModalVisible, setResetDataModalVisible] = useState(false);
    const languages = ["English", "Tiếng Việt"];
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
            fontSize: 0.03 * screen.windowHeight,
            color: "white",
        },
        closeButton: {
            marginTop: 20,
            fontSize: 16,
            color: "blue",
        },
    });
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
                gap: 20,
            }}
        >
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
                    onPress={() => setLanguageOptionModalVisible(true)}
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
                visible={languageOptionModalVisible}
                onRequestClose={() => setLanguageOptionModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {languages.map((language, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.languageOption}
                                onPress={() => {
                                    setSelectedLanguage(language);
                                    setLanguageOptionModalVisible(false);
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
                    {selectedLanguage == "English"
                        ? "Server address"
                        : "Địa chỉ máy chủ"}
                </Text>
                <Pressable
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                    }}
                    onPress={() => {
                        setServerAddressModalVisible(true);
                    }}
                >
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
                visible={serverAddressModalVisible}
                onRequestClose={() => setServerAddressModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View
                        style={{
                            width: "80%",
                            backgroundColor: "gray",
                            borderRadius: 10,
                            padding: 20,
                            alignItems: "center",
                            gap: 20,
                        }}
                    >
                        <TextInput
                            style={{
                                backgroundColor: "white",
                                borderRadius: 10,
                                padding: 10,
                                width: "100%",
                            }}
                            placeholder={
                                selectedLanguage == "English"
                                    ? "Enter server address"
                                    : "Nhập địa chỉ máy chủ"
                            }
                            multiline={false}
                            scrollEnabled={true}
                            value={tempAddress}
                            onChangeText={(text) => setTempAddress(text)}
                        />
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 20,
                            }}
                        >
                            <Pressable
                                style={{
                                    backgroundColor: "green",
                                    padding: 10,
                                    borderRadius: 10,
                                }}
                                onPress={() => {
                                    setServerAddressModalVisible(false);
                                    setServerAddress(tempAddress);
                                }}
                            >
                                <Text style={{ color: "white" }}>
                                    {selectedLanguage == "English"
                                        ? "Save"
                                        : "Lưu"}
                                </Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    backgroundColor: "white",
                                    padding: 10,
                                    borderRadius: 10,
                                }}
                                onPress={() => {
                                    setServerAddressModalVisible(false);
                                    setTempAddress(serverAddress);
                                }}
                            >
                                <Text style={{ color: "black" }}>
                                    {selectedLanguage == "English"
                                        ? "Cancel"
                                        : "Hủy"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

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
                    {selectedLanguage == "English"
                        ? "Reset data"
                        : "Đặt lại dữ liệu"}
                </Text>
                <Pressable
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                    }}
                    onPress={() => {
                        setResetDataModalVisible(true);
                    }}
                >
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
                visible={resetDataModalVisible}
            >
                <View style={styles.modalContainer}>
                    <View
                        style={{
                            width: "80%",
                            backgroundColor: "gray",
                            borderRadius: 10,
                            padding: 20,
                            alignItems: "center",
                            gap: 20,
                        }}
                    >
                        <Text style={styles.languageText}>
                            {selectedLanguage == "English"
                                ? "Are you sure you want to reset data?"
                                : "Bạn có chắc chắn muốn đặt lại dữ liệu không?"}
                        </Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 20,
                            }}
                        >
                            <Pressable
                                style={{
                                    backgroundColor: "green",
                                    padding: 10,
                                    borderRadius: 10,
                                }}
                                onPress={() => {
                                    setEmotion(["Neutral"]);
                                    setIsFocusEnabled(false);
                                    setIsHomeEnabled(false);
                                    setResetDataModalVisible(false);
                                }}
                            >
                                <Text style={{ color: "white" }}>
                                    {selectedLanguage == "English"
                                        ? "Yes"
                                        : "Có"}
                                </Text>
                            </Pressable>
                            <Pressable
                                style={{
                                    backgroundColor: "white",
                                    padding: 10,
                                    borderRadius: 10,
                                }}
                                onPress={() => {
                                    setResetDataModalVisible(false);
                                }}
                            >
                                <Text style={{ color: "black" }}>
                                    {selectedLanguage == "English"
                                        ? "No"
                                        : "Không"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
