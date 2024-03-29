import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getAppointmentsByDate } from "../../../Helpers/Appointment";

export default function PieChart() {
  const config = {
    series: [],
    options: {
      noData: {
        text: "No data text",
        align: "center",
        verticalAlign: "middle",
      },
      legend: {
        position: "bottom",
      },
      chart: {
        width: 380,
        type: "pie",
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
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  const [chartData, setChartData] = useState(config);

  const getChartDataFunction = async () => {
    const res = await getAppointmentsByDate(
      moment().startOf("month").format("YYYY-MM-DD"),
      moment().endOf("month").format("YYYY-MM-DD")
    );
    if (res.success === true) {
      let tempLables = [];
      let tempSeries = [];
      let tempData = res.data;
      tempData.map((item) => {
        tempLables.push(item.status);
        tempSeries.push(item.count);
      });

      setChartData({
        ...chartData,
        series: tempSeries,
        options: {
          labels: tempLables,
        },
      });
    }
  };

  useEffect(() => {
    getChartDataFunction();
  }, []);
  return (
    <>
      <Box bg="white" maxW="sm" py={5} shadow="xl" mx={2} flex={1}>
        <div id="chart">
          {chartData.series.length > 0 && (
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="pie"
              width={380}
            />
          )}
        </div>
        <Text textAlign={"center"} mt={3}>
          Service stats this month
        </Text>
        <Text textAlign={"center"} fontSize="xs" my={1}>
          {moment().startOf("week").format("MMM DD, YYYY")} -{" "}
          {moment().endOf("week").format("MMM DD, YYYY")}
        </Text>
      </Box>
    </>
  );
}
