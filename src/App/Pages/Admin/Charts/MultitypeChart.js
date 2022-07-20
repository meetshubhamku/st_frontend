import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function MultitypeChart() {
  const chartData = {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  };
  return (
    <>
      <Box bg={"white"} shadow="xl" my={5} py={5} px={5} mx={5}>
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
    </>
  );
}
