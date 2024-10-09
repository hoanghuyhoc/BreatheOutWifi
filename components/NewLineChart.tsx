// import { Box } from "@gluestack-ui/themed";
import React, { useState } from "react";

import {
    Circle,
    LinearGradient,
    useFont,
    vec,
} from "@shopify/react-native-skia";
import { View } from "react-native";
import { useDerivedValue, type SharedValue } from "react-native-reanimated";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";

import { Text as SKText } from "@shopify/react-native-skia";

export const LineChart = () => {
    const font = useFont("SpaceGrotesk_regular", 12);
    const chartFont = useFont("SpaceGrotesk_bold", 30);
    const { state, isActive } = useChartPressState({ x: 0, y: { rate: 0 } });
    const DATA = Array.from({ length: 10 }, (_, i) => ({
        time: i,
        rate: 17 + 5 * Math.random(),
    }));
    const [chartData, setChartData] = useState(DATA);

    const value = useDerivedValue(() => {
        return "$" + state.y.rate.value.value.toFixed(2);
    }, []);

    return (
        <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
            <View style={{ width: "95%", height: "60%" }}>
                <CartesianChart
                    data={chartData}
                    xKey="time"
                    yKeys={["rate"]}
                    domainPadding={{ top: 30 }}
                    axisOptions={{
                        font,
                    }}
                    chartPressState={state}
                >
                    {({ points, chartBounds }) => (
                        <>
                            <SKText
                                x={chartBounds.left + 10}
                                y={40}
                                font={chartFont}
                                text={value}
                                color={"dark"}
                                style={"fill"}
                            />
                            <Line
                                points={points.rate}
                                color="lightgreen"
                                strokeWidth={3}
                                animate={{ type: "timing", duration: 500 }}
                            />
                           
                            {isActive ? (
                                <ToolTip
                                    x={state.x.position}
                                    y={state.y.rate.position}
                                />
                            ) : null}
                        </>
                    )}
                </CartesianChart>
            </View>
        </View>
    );
};

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
    return <Circle cx={x} cy={y} r={8} color={"grey"} opacity={0.8} />;
}
