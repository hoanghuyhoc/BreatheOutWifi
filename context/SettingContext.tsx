import { createContext, useState } from "react";

export const SettingContext = createContext<{
    selectedLanguage: "English" | "Tiếng Việt";
    setSelectedLanguage: Function;
    serverAddress: string;
    setServerAddress: Function;
}>({
    selectedLanguage: "Tiếng Việt",
    setSelectedLanguage: () => {},
    serverAddress: "",
    setServerAddress: () => {},
});

export default function SettingProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [selectedLanguage, setSelectedLanguage] = useState<
        "English" | "Tiếng Việt"
    >("English");
    const [serverAddress, setServerAddress] = useState("");

    return (
        <SettingContext.Provider
            value={{
                selectedLanguage,
                setSelectedLanguage,
                serverAddress,
                setServerAddress,
            }}
        >
            {children}
        </SettingContext.Provider>
    );
}
