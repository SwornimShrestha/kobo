import { Button } from "@mantine/core";
import React, { useEffect, useState, useMemo, useContext } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { IconDownload, IconFileExcel } from "@tabler/icons-react";
import { ApiConfigContext } from "../context/ApiConfigContext";

const AvailableSurveysDetails = ({ surveyId, index }) => {
  const [surveyDetails, setSurveyDetails] = useState(null);
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { apiconfig } = useContext(ApiConfigContext);
  useEffect(() => {
    if (surveyId) {
      fetchSurveyDetails(surveyId);
    }
  }, [surveyId, index]);

  // const fetchData = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);

  //     const res = await fetch(`/api/v2/assets.json`, {
  //       headers: {
  //         Authorization: `Token e9218ca8da90d8b169ca284cc84ead3bfc81de01`,
  //       },
  //     });

  //     if (!res.ok) {
  //       throw new Error(`HTTP error! status: ${res.status}`);
  //     }

  //     const json = await res.json();

  //     const newData = json?.results?.[index] || [];
  //     setData(newData);

  //     console.log("Fetched Data:", json);
  //     console.log("Updated Data State:", newData);
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //     setError(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchSurveyDetails = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/${apiconfig?.baseUrl}/${id}/data.json`, {
        headers: {
          Authorization: `Token ${apiconfig?.apikey}`,
        },
      });

      if (!res.ok)
        throw new Error(
          `Failed to fetch survey details. Status: ${res.status}`
        );

      setSurveyDetails(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const tableHeaders = useMemo(
    () =>
      surveyDetails?.results?.length
        ? Object.keys(surveyDetails.results[0]).filter(
            (header) =>
              ![
                "_id",
                "formhub/uuid",
                "start",
                "end",
                "__version__",
                "submitted_by",
                "validation_status",
                "_notes",
                "_tags",
                "_status",
                "_instanceID",
                "_xform_id_string",
                "_uuid",
                "_attachments",
                "_geolocation",
                "instanceID",
                "_validation_status",
              ].includes(header)
          )
        : [],
    [surveyDetails]
  );

  const columns = useMemo(
    () =>
      tableHeaders.map((header) => ({
        accessorKey: header,
        header: header.split("/").pop().replaceAll("_", " "),
      })),
    [tableHeaders]
  );

  const tableData = useMemo(
    () => surveyDetails?.results || [],
    [surveyDetails]
  );

  const table = useMantineReactTable({
    columns,
    data: tableData,
    enableDensityToggle: false,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
      density: "xs",
    },
  });

  // useEffect(() => {
  //   console.log("Data state updated:", data);
  // }, [data]);

  if (!surveyId) return <div>Please select a survey to view its details.</div>;
  if (isLoading) return <div>Loading details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!surveyDetails?.results?.length)
    return <div>No data available for the selected survey.</div>;

  return (
    <div>
      {surveyDetails ? (
        <div className="text-end mb-4 flex flex-col justify-end content-center gap-5">
          <p>
            <strong>No of data Submitted:</strong> {surveyDetails.count}
          </p>
          {/* <div className="text-end mb-4 flex justify-end content-center gap-2">
            <a href={data.downloads?.[0]?.url || "#"} target="_blank">
              <Button
                color="green"
                variant=""
                leftSection={<IconFileExcel size={14} />}
                rightSection={<IconDownload size={14} />}
              >
                Excel
              </Button>
            </a>
            <a href={data.downloads?.[1]?.url || "#"} target="_blank">
              <Button
                color="blue"
                variant=""
                leftSection={<IconFileExcel size={14} />}
                rightSection={<IconDownload size={14} />}
              >
                XML
              </Button>
            </a>
          </div> */}
        </div>
      ) : (
        <p>No details available.</p>
      )}

      <MantineReactTable table={table} />
    </div>
  );
};

export default AvailableSurveysDetails;
