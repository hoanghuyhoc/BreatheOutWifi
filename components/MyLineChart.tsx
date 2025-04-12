import { LineChart } from "react-native-chart-kit";

export default function MyLineChart({
    height,
    width,
    breathRateList,
}: {
    height: number;
    width: number;
    breathRateList: { second: number; breathRate: number }[];
}) {
    return (
        <LineChart
            data={{
                labels: breathRateList.map((item) => item.second.toString()),
                datasets: [
                    {
                        data: breathRateList.map((item) => item.breathRate),
                        // color: (opacity=1) => "rgba(0, 162, 255, 1)",
                    },
                ],
                legend: ["Nhịp thở"],
            }}
            fromZero
            height={height}
            width={width}
            chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
            }}
        />
    );
}
