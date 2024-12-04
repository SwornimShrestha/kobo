import React, { useContext, useEffect, useState } from "react";
import { ApiConfigContext } from "../context/ApiConfigContext";
import { useNavigate } from "react-router-dom";

const AvailableSurverys = ({ onSurveySelect }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const { apiconfig, clearLocalStorage } = useContext(ApiConfigContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  console.log(apiconfig?.apikey);
  console.log(apiconfig?.baseUrl);

  const fetchData = async () => {
    try {
      const res = await fetch(`/${apiconfig?.baseUrl}.json`, {
        headers: {
          Authorization: `Token ${apiconfig?.apikey}`,
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
  const handleClear = () => {
    clearLocalStorage();
    navigate("/");
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
            <h1>{item.name}</h1>
            <h4 className="text-sm">{item.settings?.sector?.value || "N/A"}</h4>
          </div>
        ))}
        <h1 onClick={handleClear} className="text-red-400">
          clear
        </h1>
      </div>
    </div>
  );
};

export default AvailableSurverys;
