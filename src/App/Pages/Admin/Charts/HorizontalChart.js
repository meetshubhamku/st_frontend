import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getAppointmentsByServiceCount } from "../../../Helpers/Appointment";

export default function HorizontalChart() {
  const config = {
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    options: {
      noData: {
        text: "No data text",
        align: "center",
        verticalAlign: "middle",
      },
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: [],
          },
          export: {
            csv: {
              filename: "Test",
            },
          },
        },
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
  const [chartData, setChartData] = useState(config);

  const getAnalytics = async () => {
    const res = await getAppointmentsByServiceCount(
      moment().startOf("week").format("YYYY-MM-DD"),
      moment().endOf("week").format("YYYY-MM-DD")
    );
    if (res.success === true) {
      let tempLables = [];
      let tempSeries = [];
      let tempData = res.data;
      tempData.map((item) => {
        tempLables.push(item.service.name);
        tempSeries.push(item.count);
      });

      let series = [
        {
          data: tempSeries,
        },
      ];

      setChartData({
        ...chartData,
        series: series,
        options: {
          xaxis: {
            categories: tempLables,
          },
        },
      });
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);
  return (
    <Box bg="white" shadow={"lg"} mx={2} flex={1}>
      <div id="chart">
        {chartData.series.length > 0 && (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        )}
      </div>
      <Text textAlign={"center"} my={2} py={2}>
        Service count this week
        <Text textAlign={"center"} fontSize="xs" my={1}>
          {moment().startOf("week").format("MMM DD, YYYY")} -{" "}
          {moment().endOf("week").format("MMM DD, YYYY")}
        </Text>
      </Text>
    </Box>
  );
}
