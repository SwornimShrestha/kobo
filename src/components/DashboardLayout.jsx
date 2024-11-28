import React, { useState } from "react";
import AvailableSurverys from "./AvailableSurverys";
import AvailableSurveysDetails from "./AvailableSurveysDetails";

const DashboardLayout = () => {
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const handleSurveySelection = (id) => {
    setSelectedSurveyId(id);
  };

  return (
    <div className="bg-[#f8f9fa] p-4 min-h-screen">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Side: List of surveys */}
        <div className="w-full md:w-1/5 bg-white border-2 p-4 rounded-lg min-h-fit  md:min-h-screen shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Available Surveys
          </h2>
          <AvailableSurverys onSurveySelect={handleSurveySelection} />
        </div>

        {/* right side surcey div */}
        <div className="w-full md:w-4/5 bg-white border-2 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-center border-b-2 border-spacing-4">
            Survey Details
          </h2>
          {selectedSurveyId ? (
            <AvailableSurveysDetails surveyId={selectedSurveyId} />
          ) : (
            <p>Select a survey from the left to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
