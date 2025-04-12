import { useFont } from "@shopify/react-native-skia";
import { Text as SKText } from "@shopify/react-native-skia";
import { useDerivedValue, type SharedValue } from "react-native-reanimated";
import { Bar, CartesianChart, Line, useChartPressState } from "victory-native";
import { ScrollView, View, ViewStyle } from "react-native";

export default function LineChart({
    containerStyle,
    DATA,
}: {
    containerStyle: ViewStyle;
    DATA: { minute: number; breathRate: number }[];
}) {
    const font = require("@/assets/fonts/SpaceGrotesk_regular.ttf");
    return (
        <View style={containerStyle}>
            <CartesianChart
                data={DATA}
                xKey="minute"
                yKeys={["breathRate"]}
                axisOptions={{
                    font: useFont(font, 12),
                    labelColor: "black",
                    lineColor: "black",
                    axisSide: { x: "bottom", y: "right" },
                }}
                // domain={{ x: [xMin, xMax], y: [yMin, yMax] }}
                domainPadding={{ bottom: 100, top: 100 }}
            >
                {({ points, chartBounds }) => {
                    return (
                        <Line
                            points={points.breathRate}
                            color={"black"}
                            strokeWidth={3}
                            animate={{ type: "spring", duration: 0 }}
                        />
                    );
                }}
            </CartesianChart>
        </View>
    );
}
