import { VictoryBar, VictoryChart } from "victory";

export default function TaskGraph({ data }) {
  return (
    <div>
      {data != [] ? (
        <VictoryChart
          domainPadding={{
            x: 200,
          }}
          width={1000}
        >
          <VictoryBar
            barRatio={0.8}
            style={{ data: { fill: "#3bd399" } }}
            alignment="middle"
            data={data}
            x="time"
            y="count"
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
        </VictoryChart>
      ) : undefined}
    </div>
  );
}
