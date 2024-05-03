"use client"
import React, { useState } from 'react'
import ReportSection from "../../../_components/report-section"

const ReportPage = ({ data }) => {

  return (
    <div className="report bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Well-being Report</h1>
      <ReportSection title="Potential Problems" content={data.PotentialProblem} />
      <ReportSection title="Positive Aspects" content={data.PositiveAspect} />
      <ReportSection title="Things to Work On" content={data.ThingsToWorkOn} />
      <ReportSection title="Recommendations" content={data.Recommendations} />
      <ReportSection title="Additional Comments" content={data.AdditionalComments} />
      <ReportSection title="Potential Disorder to Consider" content={data.PotentialDisorderToConsider} />
      <p className="disclaimer">
        This is a sample report and should not be used as a substitute for professional medical advice.
      </p>
    </div>
  );
};

export default ReportPage;
