import React, { Suspense } from "react";
import Base from "../../Components/Base";
import CustomLoader from "../../Components/CustomLoader";
import MultitypeChart from "./Charts/MultitypeChart";
import PieChart from "./Charts/PieChart";

export default function AdminChartComponent() {
  return (
    <>
      <Suspense fallback={<CustomLoader />}>
        <Base>
          <MultitypeChart />
          <PieChart />
        </Base>
      </Suspense>
    </>
  );
}
