import { Flex } from "@chakra-ui/react";
import React, { Suspense } from "react";
import Base from "../../Components/Base";
import CustomLoader from "../../Components/CustomLoader";
import ColumnChart from "./Charts/ColumnChart";
import HorizontalChart from "./Charts/HorizontalChart";
import MultitypeChart from "./Charts/MultitypeChart";
import PieChart from "./Charts/PieChart";

export default function AdminChartComponent() {
  return (
    <>
      <Suspense fallback={<CustomLoader />}>
        <Base>
          <Flex>
            <PieChart />
            <HorizontalChart />
          </Flex>

          <MultitypeChart />
          <ColumnChart />
        </Base>
      </Suspense>
    </>
  );
}
