import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function HorizontalChart() {
  const chartData = {
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany",
        ],
      },
    },
  };
  return (
    <Box bg="white" shadow={"lg"} mx={2} flex={1}>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      <Text textAlign={"center"} my={2} py={2}>
        Appointment stats this week
        <Text textAlign={"center"} fontSize="xs" my={1}>
          {moment().startOf("week").format("MMM DD, YYYY")} -{" "}
          {moment().endOf("week").format("MMM DD, YYYY")}
        </Text>
      </Text>
    </Box>
  );
}
