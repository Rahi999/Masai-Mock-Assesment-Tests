import { Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export const Tests = () => {
  const params = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://rahimansari.herokuapp.com/rahi/${params.id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => setError(true));
  }, []);
  console.log("Data", data);
  return loading ? (
    <Image
      style={{ width: "30%", margin: "auto" }}
      src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"
    />
  ) : error ? (
    <Image src="https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.gif" />
  ) : (
    <>
      {" "}
      <Text
        style={{
          fontSize: "20px",
          fontStyle: "italic"
        }}
      >
        Student's Name : {data ? data.student : null}
      </Text>
      <div>
        {data && (
          <table>
            <tr>
              <th
                style={{
                  fontSize: "20px",
                  fontStyle: "italic"
                }}
                c
              >
                Tests{" "}
              </th>
            </tr>

            <tr>
              <td
                style={{
                  fontSize: "20px",
                  fontStyle: "italic"
                }}
              >
                {data.tests[0] ? data.tests[0] : "No First Test Till Now"}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontSize: "20px",
                  fontStyle: "italic"
                }}
              >
                {data.tests[1] ? data.tests[1] : "No Second Test Till Now"}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontSize: "20px",
                  fontStyle: "italic"
                }}
              >
                {data.tests[2] ? data.tests[2] : "No Third Test Till Now"}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  fontSize: "20px",
                  fontStyle: "italic"
                }}
              >
                {data.tests[3] ? data.tests[3] : "No Fourth Test Till Now"}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  fontSize: "20px",
                  fontStyle: "italic"
                }}
              >
                {data.tests[4] ? data.tests[4] : "No Fifth Test Till Now"}
              </td>
            </tr>
          </table>
        )}
      </div>
    </>
  );
};
