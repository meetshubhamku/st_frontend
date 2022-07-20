import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function ColumnChart() {
  const [data, setData] = useState({
    series: [
      {
        data: [21, 22, 10, 28, 16, 21, 13, 30],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          ["John", "Doe"],
          ["Joe", "Smith"],
          ["Jake", "Williams"],
          "Amber",
          ["Peter", "Brown"],
          ["Mary", "Evans"],
          ["David", "Wilson"],
          ["Lily", "Roberts"],
        ],
        labels: {
          style: {
            colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
            fontSize: "12px",
          },
        },
      },
    },
  });
  return (
    <>
      <Box bg={"white"} shadow="lg">
        <div id="chart">
          <ReactApexChart
            options={data.options}
            series={data.series}
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
