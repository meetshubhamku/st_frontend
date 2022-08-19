import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { Suspense } from "react";
import Base from "../../Components/Base";
import CustomLoader from "../../Components/CustomLoader";
import HorizontalChart from "./Charts/HorizontalChart";
import MultitypeChart from "./Charts/MultitypeChart";
import PieChart from "./Charts/PieChart";
import * as Yup from "yup";
import moment from "moment";
import MixedChart from "./Charts/MixedChart";

export default function AdminChartComponent() {
  const dateSchema = Yup.object().shape({
    fromDate: Yup.date()
      .required("From date is required")
      .max(moment().format("YYYY-MM-DD"), "Invalid Date"),

    toDate: Yup.date()
      .required("To date is required")
      .min(moment().format("YYYY-MM-DD"), "Invalid Date"),
  });

  const formik = useFormik({
    initialValues: {
      fromDate: "",
      toDate: "",
    },
    validationSchema: dateSchema,
    onSubmit: async (values, onSubmitProp) => {
      console.log("fromt date : ", values.fromDate);
      console.log("to date : ", values.toDate);
    },
  });
  return (
    <>
      <Suspense fallback={<CustomLoader />}>
        <Base>
          {/* <form
            style={{
              marginBottom: "15px",
              paddingLeft: "5px",
              paddingRight: "5px",
            }}
          >
            <Flex justifyContent={"center"} alignItems="center">
              <FormControl>
                <FormLabel htmlFor="first-name">From Date</FormLabel>
                <input
                  style={{
                    width: "320px",
                    height: "40px",
                    paddingLeft: "10px",
                  }}
                  type="date"
                  id="fromDate"
                  name="fromDate"
                  onChange={formik.handleChange}
                  value={formik.values.fromDate}
                />
                {formik.errors.fromDate ? (
                  <FormHelperText color="red">
                    {formik.errors.fromDate}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="first-name">To Date</FormLabel>
                <input
                  style={{
                    width: "320px",
                    height: "40px",
                    paddingLeft: "10px",
                  }}
                  type="date"
                  id="toDate"
                  name="toDate"
                  onChange={formik.handleChange}
                  value={formik.values.toDate}
                />
                {formik.errors.toDate ? (
                  <FormHelperText color="red">
                    {formik.errors.toDate}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Button variant="solid" colorScheme="green" type="submit" px={7}>
                Search
              </Button>
            </Flex>
          </form> */}
          <Flex>
            <PieChart />
            <HorizontalChart />
          </Flex>

          <MultitypeChart />
          <MixedChart />
        </Base>
      </Suspense>
    </>
  );
}
