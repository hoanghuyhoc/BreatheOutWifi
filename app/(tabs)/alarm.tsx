import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { SettingContext } from "@/context/SettingContext";
import {
    Alert,
    Modal,
    Platform,
    Pressable,
    Text,
    View,
    TextInput,
    FlatList,
} from "react-native";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

function ReminderCard({
    id,
    title,
    datetime,
    removeFromList,
}: {
    id: number;
    title: string;
    datetime: Date;
    removeFromList: (id: number) => void;
}) {
    const { selectedLanguage } = useContext(SettingContext);
    const deleteButtonRef = useRef<any>(null);
    let fTime =
        String(datetime.getHours()).padStart(2, "0") +
        ":" +
        String(datetime.getMinutes()).padStart(2, "0");

    useEffect(() => {
        const countdown = setInterval(() => {
            let title = "";
            let message = "";
            if (selectedLanguage === "English") {
                title = "Reminder";
                message = "Let's take a break!";
            } else {
                title = "Nhắc nhở";
                message = "Hãy nghỉ ngơi một chút";
            }
            Alert.alert(title, message, [{ text: "OK" }]);
        }, datetime.getHours() * 3600 * 1000 + datetime.getMinutes() * 60 * 1000);
        return () => clearInterval(countdown);
    }, []);

    return (
        <View
            key={id}
            style={{
                borderRadius: 10,
                backgroundColor: "#ffffff",
                margin: 15,
                shadowRadius: 4,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                display: "flex",
                flexDirection: "row",
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    padding: 10,
                }}
            >
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    {title}
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >{`${
                    selectedLanguage == "English" ? "Period" : "Thời gian"
                }: ${fTime}`}</Text>
            </View>
            <Pressable
                ref={deleteButtonRef}
                style={{
                    height: "100%",
                    backgroundColor: "#ff0000",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20%",
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                }}
                onPressIn={() => {
                    deleteButtonRef.current?.setNativeProps({
                        style: { backgroundColor: "#ab0000" },
                    });
                }}
                onPressOut={() => {
                    deleteButtonRef.current?.setNativeProps({
                        style: { backgroundColor: "#ff0000" },
                    });
                }}
                onPress={() => {
                    removeFromList(id);
                }}
            >
                <Ionicons name="trash-outline" size={35} color="#ffffff" />
            </Pressable>
        </View>
    );
}

function AddReminderModal({
    addReminder,
    show,
    setShow,
}: {
    addReminder: ({ title, time }: { title: string; time: Date }) => void;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [title, setTitle] = useState("");
    const modalContentRef = useRef<View>(null);
    const [tempTime, setTempTime] = useState(new Date(2025, 1, 1, 0, 0, 0, 0));
    const { selectedLanguage } = useContext(SettingContext);
    function close() {
        setShow(false);
    }
    function onChange(event: DateTimePickerEvent, selectedDate?: Date) {
        const currentDate = selectedDate || tempTime;
        setShow(Platform.OS === "ios");
        setTempTime(currentDate);

        let tempDate_ = new Date(currentDate);
        let fTime = tempDate_.getHours() + ":" + tempDate_.getMinutes();
        console.log("Selected time: ", fTime);
    }

    function showAlert() {
        let title = "";
        let message = "";
        if (selectedLanguage === "English") {
            title = "Error";
            message = "Please choose a time period ";
        } else {
            title = "Lỗi";
            message = "Vui lòng chọn thời gian";
        }
        Alert.alert(title, message, [
            {
                text: "OK",
            },
        ]);
    }

    return (
        show &&
        (Platform.OS === "ios" ? (
            <Modal
                transparent={true}
                animationType="fade"
                visible={show}
                onRequestClose={close}
            >
                <Pressable
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={(event) => {
                        if (event.target != modalContentRef.current) {
                            close();
                        }
                    }}
                >
                    <View
                        ref={modalContentRef}
                        style={{
                            marginVertical: "auto",
                            marginHorizontal: 10,
                            backgroundColor: "#ffffff",
                            borderRadius: 20,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            // justifyContent: "center",
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                        }}
                    >
                        <TextInput
                            placeholder={
                                selectedLanguage === "English"
                                    ? "Enter reminder title"
                                    : "Nhập tiêu đề nhắc nhở"
                            }
                            style={{
                                backgroundColor: "#f0f0f0",
                                borderRadius: 10,
                                padding: 10,
                                fontSize: 18,
                                marginBottom: 10,
                                width: 200,
                            }}
                            onChangeText={(text) => {
                                setTitle(text);
                            }}
                            value={title}
                            // onLayout={(event)=>{
                            //     modalContentRef.current?.setNativeProps({
                            //         style: {
                            //             height: modalContentRef.current
                            //                 ?.
                            //                 .height,
                            //         },
                            //     });
                            // }}
                        />
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={tempTime}
                            mode="time"
                            display="default"
                            onChange={onChange}
                            style={{
                                transform: "translateX(-5%)",
                            }}
                        />
                        <Pressable
                            onPress={() => {
                                close();
                            }}
                            style={{
                                backgroundColor: "transparent",
                                padding: 10,
                                borderRadius: 10,
                                marginHorizontal: "auto",
                            }}
                        >
                            <Text style={{ fontSize: 18, color: "#036ffc" }}>
                                {selectedLanguage === "English"
                                    ? "Cancel"
                                    : "Huỷ bỏ"}
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                if (
                                    tempTime.toTimeString() ===
                                    new Date(
                                        2025,
                                        1,
                                        1,
                                        0,
                                        0,
                                        0,
                                        0
                                    ).toTimeString()
                                ) {
                                    showAlert();
                                } else {
                                    addReminder({
                                        title:
                                            title.length > 0
                                                ? title
                                                : selectedLanguage === "English"
                                                ? "Reminder"
                                                : "Nhắc nhở",
                                        time: tempTime,
                                    });
                                    close();
                                }
                            }}
                            style={{
                                backgroundColor: "transparent",
                                padding: 10,
                                borderRadius: 10,
                                marginHorizontal: "auto",
                            }}
                        >
                            <Text style={{ fontSize: 18, color: "#036ffc" }}>
                                {selectedLanguage === "English"
                                    ? "Add"
                                    : "Thêm"}
                            </Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        ) : (
            <DateTimePicker
                testID="dateTimePicker"
                value={tempTime}
                mode="datetime"
                display="default"
                onChange={onChange}
            />
        ))
    );
}

export default function Alarm() {
    const addButtonRef = useRef<any>(null);
    const [show, setShow] = useState(false);

    const [reminderList, setReminderList] = useState<
        { id: number; title: string; time: Date }[]
    >([]);

    function addReminder({ title, time }: { title: string; time: Date }) {
        let nextId = 0;
        const last = reminderList.find((value, index, obj) => {
            if (value.id + 1 < obj[index + 1].id) {
                return true;
            } else return false;
        });
        if (last) {
            nextId = last.id + 1;
        } else {
            nextId = (reminderList.at(-1)?.id ?? +1) || 0;
        }

        setReminderList((prev) => [...prev, { id: nextId, title, time }]);
    }

    function removeFromList(id: number) {
        setReminderList((prev) => prev.filter((item) => item.id !== id));
    }

    useEffect(() => {
        const interval = setInterval(() => {}, 1000);
    }, []);

    return (
        <>
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#f0f0f0",
                }}
            >
                <FlatList
                    data={reminderList}
                    renderItem={({ item }) => {
                        return (
                            <ReminderCard
                                id={item.id}
                                title={item.title}
                                datetime={item.time}
                                removeFromList={removeFromList}
                            />
                        );
                    }}
                ></FlatList>
                <Pressable
                    ref={addButtonRef}
                    style={{
                        aspectRatio: 1,
                        borderRadius: 9999,
                        backgroundColor: "#2eb5fa",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 65,
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        shadowRadius: 4,
                        shadowColor: "#000000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.5,
                    }}
                    onPressIn={() => {
                        addButtonRef.current?.setNativeProps({
                            style: { backgroundColor: "#228bbf" },
                        });
                    }}
                    onPressOut={() => {
                        addButtonRef.current?.setNativeProps({
                            style: { backgroundColor: "#2eb5fa" },
                        });
                    }}
                    onPress={() => {
                        setShow(true);
                    }}
                >
                    <Ionicons name="add" size={35} color="#ffffff" />
                </Pressable>
            </View>
            <AddReminderModal
                addReminder={addReminder}
                show={show}
                setShow={setShow}
            />
        </>
    );
}
