import { createContext, useState } from "react";

export const LanguageContext = createContext<{
    selectedLanguage: string;
    setSelectedLanguage: Function;
}>({
    selectedLanguage: "Tiếng Việt",
    setSelectedLanguage: () => {},
});

export default function LanguageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [selectedLanguage, setSelectedLanguage] = useState("Tiếng Việt");

    return (
        <LanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage }}
        >
            {children}
        </LanguageContext.Provider>
    );
}
