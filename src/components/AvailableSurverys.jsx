import React, { useEffect, useState } from "react";

const AvailableSurverys = ({ onSurveySelect }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null); // To track the selected survey

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/v2/assets.json`, {
        headers: {
          Authorization: `Token e9218ca8da90d8b169ca284cc84ead3bfc81de01`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      setData(json.results || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    }
  };

  const handleSurveySelect = (uid, index) => {
    setSelectedSurvey(uid);
    onSurveySelect(uid, index);
  };

  return (
    <div>
      {error && (
        <div className="text-red-500 p-2 mb-2 border border-red-500 rounded">
          Error: {error}
        </div>
      )}
      <div className="cursor-pointer">
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSurveySelect(item.uid, index)}
            className={`border shadow-md p-2 rounded-lg mb-2 cursor-pointer ${
              selectedSurvey === item.uid
                ? "bg-blue-500 text-white"
                : "hover:bg-black/10"
            }`}
          >
            <h1>{item.name}</h1>d
            <h4 className="text-sm">{item.settings?.sector?.value || "N/A"}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableSurverys;
