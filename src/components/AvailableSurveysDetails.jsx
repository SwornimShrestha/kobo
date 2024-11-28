import { Table } from "@mantine/core";
import React, { useEffect, useState } from "react";

const AvailableSurveysDetails = ({ surveyId }) => {
  const [surveyDetails, setSurveyDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (surveyId) {
      fetchSurveyDetails(surveyId);
    }
  }, [surveyId]);

  const fetchSurveyDetails = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/v2/assets/${id}/data.json`, {
        headers: {
          Authorization: `Token e9218ca8da90d8b169ca284cc84ead3bfc81de01`,
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

  if (!surveyId) return <div>Please select a survey to view its details.</div>;
  if (isLoading) return <div>Loading details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!surveyDetails?.results?.length)
    return <div>No data available for the selected survey.</div>;

  const tableHeaders = Object.keys(surveyDetails.results[0]).filter(
    (header) =>
      header !== "_id" &&
      header !== "formhub/uuid" &&
      header !== "start" &&
      header !== "end" &&
      header !== "__version__" &&
      header !== "submitted_by" &&
      header !== "validation_status" &&
      header !== "_notes" &&
      header !== "_tags" &&
      header !== "_status" &&
      header !== "_instanceID" &&
      header !== "_xform_id_string" &&
      header !== "_uuid" &&
      header !== "_attachments" &&
      header !== "_geolocation" &&
      header !== "instanceID" &&
      header !== "_validation_status"
  );

  return (
    <div>
      {surveyDetails ? (
        <div className="text-end mb-4">
          <p>
            <strong>No of data Submitted:</strong> {surveyDetails.count}
          </p>
        </div>
      ) : (
        <p>No details available.</p>
      )}

      <Table.ScrollContainer minWidth={500}>
        <Table striped className="shadow-md">
          <Table.Thead>
            <Table.Tr>
              {tableHeaders.map((header) => (
                <Table.Th key={header}>
                  {header.split("/").pop().replaceAll("_", " ")}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {surveyDetails.results.map((result, index) => (
              <Table.Tr key={index}>
                {tableHeaders.map((header) => (
                  <Table.Td key={header}>
                    {result[header] !== null && result[header] !== undefined
                      ? result[header].toString()
                      : "N/A"}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default AvailableSurveysDetails;
