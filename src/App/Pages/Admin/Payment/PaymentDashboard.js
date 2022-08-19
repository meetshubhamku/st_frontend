import React, { useEffect } from "react";
import Base from "../../../Components/Base";
import { getPaymentApi } from "../../../Helpers/Payment";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useState } from "react";
import moment from "moment";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function PaymentDashboard() {
  const [paymentList, setPaymentList] = useState([]);
  const getPaumentFunction = async () => {
    const res = await getPaymentApi();
    console.log("res : ", res);
    if (res.success) {
      setPaymentList(res.data);
    } else {
      setPaymentList([]);
    }
  };

  useEffect(() => {
    getPaumentFunction();
  }, []);
  return (
    <>
      <Base>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Transaction ID</Th>
                <Th>Amount(Rs)</Th>
                <Th>Email</Th>
                <Th>Date</Th>
                <Th>Receipt</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paymentList.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.id}</Td>
                  <Td>{item.transaction_id}</Td>
                  <Td>{item.amount / 100}</Td>
                  <Td>{item.email}</Td>
                  <Td>
                    {moment(item.createdAt).format("MMM DD, YYYY HH:MM:ss A")}
                  </Td>
                  <Td>
                    <a href={item.receipt_url} target="_blank">
                      <ExternalLinkIcon />
                    </a>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Base>
    </>
  );
}
