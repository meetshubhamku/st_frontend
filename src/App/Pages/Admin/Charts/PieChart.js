import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, chakra } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["Appointments", "Customers", "Profit", "Loss", "Services", "Offers"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#F56565",
        "#4299e1",
        "#ECC94B",
        "#68D391",
        "#9F7AEA",
        "#ED8936",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChart() {
  return (
    <>
      <Box maxW="sm" pt={1} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
          color="green.400"
        >
          Statistics
        </chakra.h1>
        <Pie data={data} />
      </Box>
    </>
  );
}
