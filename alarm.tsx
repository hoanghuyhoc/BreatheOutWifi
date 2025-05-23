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
import { NativeModules } from "react-native";

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
    const deleteButtonRef = useRef<any>(null);
    let fDate =
        datetime.getDate() +
        "/" +
        (datetime.getMonth() + 1) +
        "/" +
        datetime.getFullYear();
    let fTime = datetime.getHours() + ":" + datetime.getMinutes();
    // function deleteReminder(id: number, removeFromList: (id: number) => void) {
    //     removeFromList(id);
    // }
    return (
        <View
            key={id}
            style={{
                borderRadius: 10,
                backgroundColor: "#ffffff",
                padding: 10,
                margin: 15,
                shadowRadius: 4,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                display: "flex",
                flexDirection: "row",
            }}
        >
            <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    {title}
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                    }}
                >{`${fDate}  ${fTime}`}</Text>
            </View>
            <Pressable
                ref={deleteButtonRef}
                style={{
                    aspectRatio: 1,
                    borderRadius: 9999,
                    backgroundColor: "#ff0000",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20%",
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

function AddReminder({
    addReminder,
    show,
    setShow,
}: {
    addReminder: ({
        title,
        datetime,
    }: {
        title: string;
        datetime: Date;
    }) => void;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [title, setTitle] = useState("");
    const modalContentRef = useRef<View>(null);
    const [tempDate, setTempDate] = useState(new Date());
    const { selectedLanguage } = useContext(SettingContext);
    function close() {
        setShow(false);
    }
    function onChange(event: DateTimePickerEvent, selectedDate?: Date) {
        const currentDate = selectedDate || tempDate;
        setShow(Platform.OS === "ios");
        setTempDate(currentDate);

        let tempDate_ = new Date(currentDate);
        let fDate =
            tempDate_.getDate() +
            "/" +
            (tempDate_.getMonth() + 1) +
            "/" +
            tempDate_.getFullYear();
        let fTime = tempDate_.getHours() + ":" + tempDate_.getMinutes();
        console.log("Selected date: ", fDate, "Selected time: ", fTime);
    }

    function showAlert() {
        let title = "";
        let message = "";
        if (selectedLanguage === "English") {
            title = "Error";
            message = "You cannot choose a date in the past";
        } else {
            title = "Lỗi";
            message = "Bạn không thể chọn ngày trong quá khứ";
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
                            // alignItems: "center",
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
                            }}
                            onChangeText={(text) => {
                                setTitle(text);
                            }}
                            value={title}
                        />
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={tempDate}
                            mode="datetime"
                            display="inline"
                            onChange={onChange}
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
                                if (tempDate <= new Date()) {
                                    showAlert();
                                } else {
                                    addReminder({
                                        title: title,
                                        datetime: tempDate,
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
                value={tempDate}
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
        { id: number; title: string; datetime: Date }[]
    >([]);

    function addReminder({
        title,
        datetime,
    }: {
        title: string;
        datetime: Date;
    }) {
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

        setReminderList((prev) => [...prev, { id: nextId, title, datetime }]);
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
                                datetime={item.datetime}
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
            <AddReminder
                addReminder={addReminder}
                show={show}
                setShow={setShow}
            />
        </>
    );
}
