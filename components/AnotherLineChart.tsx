import { useFont } from "@shopify/react-native-skia";
import { Text as SKText } from "@shopify/react-native-skia";
import { useDerivedValue, type SharedValue } from "react-native-reanimated";
import { Bar, CartesianChart, Line, useChartPressState } from "victory-native";
import { ScrollView, View, ViewStyle } from "react-native";

export default function LineChart({
    containerStyle,
}: {
    containerStyle: ViewStyle;
}) {
    const font = require("@/assets/fonts/SpaceGrotesk_regular.ttf");
    const DATA = Array.from({ length: 10 }, (_, i) => ({
        time: new Date(Date.now() + i *15* 60000).toLocaleTimeString("vn-VN", {
            hour: "2-digit",
            minute: "2-digit",
        }),
        rate: 17 + 3 * Math.random(),
    }));
    return (
        <View style={containerStyle}>
            <CartesianChart
                data={DATA}
                xKey="time"
                yKeys={["rate"]}
                axisOptions={{
                    font: useFont(font, 12),
                    labelColor: "black",
                    lineColor: "black",
                    axisSide: { x: "bottom", y: "right" },
                }}
                
            >
                {({ points, chartBounds }) => {
                    return (
                        <Line
                            points={points.rate}
                            color={"black"}
                            strokeWidth={3}
                            animate={{ type: "timing", duration: 500 }}
                        />
                    );
                }}
            </CartesianChart>
        </View>
    );
}
