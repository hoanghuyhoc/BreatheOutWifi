import { LineChart } from "react-native-chart-kit";

export default function MyLineChart({
    height,
    width,
}: {
    height: number;
    width: number;
}) {
    return (
        <LineChart
            data={{
                labels: ["17:00", "17:15", "17:30", "17:45", "18:00"],
                datasets: [
                    {
                        data: [15, 17, 18, 19, 20],
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
