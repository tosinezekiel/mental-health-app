"use client"
import React, { useState } from 'react'
import ReportSection from "../../../_components/report-section"
import { useReportDataContext } from '~/app/context/report-content';
import { useRouter } from 'next/navigation';

// const defaultReportData = {
//         "PotentialProblem": [
//          "Anxiety related to new job leading to difficulty concentrating and changes in sleep and appetite",
//          "Uncertainty about team dynamics and company culture at the new job"
//         ],
//         "PositiveAspect": [
//          "Overall positive mood with feelings of happiness and hopefulness",
//          "Excitement and motivation regarding the new job",
//          "Active engagement in social activities and maintaining connections with loved ones", 
//          "Utilization of healthy coping mechanisms such as reading and socializing",
//          "Openness to exploring relaxation techniques and setting goals for personal growth", 
//          "Presence of a strong support system consisting of friends and family"
//         ],
//         "ThingsToWorkOn": [
//          "Developing effective strategies for managing work-related anxiety and stress",
//          "Improving concentration and focus, potentially through mindfulness techniques or addressing underlying anxiety",
//          "Establishing healthy sleep patterns and addressing changes in appetite",
//          "Gaining a better understanding of the new job's company culture and team dynamics to alleviate uncertainty"
//         ],
//         "Recommendations": [
//          "Implement relaxation techniques like deep breathing exercises, meditation, or progressive muscle relaxation to manage anxiety and promote better sleep.",
//          "Explore mindfulness practices to enhance focus and reduce distracting thoughts.",
//          "Set clear and achievable goals for the new job to boost confidence and a sense of accomplishment.",
//          "Seek information about the company culture and team dynamics through available resources, such as the company website or employee testimonials, or by connecting with current employees.",
//          "Continue engaging in enjoyable social activities and maintaining open communication with friends and family for support.", 
//          "Consider exploring additional coping mechanisms such as regular physical exercise or spending time in nature."
//         ],
//         "AdditionalComments": [
//          "Transitioning to a new job often involves a period of adjustment and it's natural to experience some anxiety or stress during this time.",
//          "Proactive management of these challenges and utilization of available resources can significantly improve the adjustment process and overall well-being."
//         ],
//         "PotentialDisorderToConsider": [
//          "While a formal diagnosis requires a comprehensive evaluation by a mental health professional, the presented symptoms, particularly their relation to the new job and its uncertainties, could potentially suggest an adjustment disorder with mixed anxiety and depressed mood."
//         ] 
//     };

const ReportPage = () => {

  const router = useRouter();
  const {
    query: { data },
  } = router;

  // const [reportData, updateReportData] = useState(null);

  // const userData = JSON.parse(props.router.query.data);


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
