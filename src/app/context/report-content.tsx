import React, { createContext, useContext, useState } from 'react';
import type { Question, Response } from '../models/Question';

const defaultReportData = {
    "PotentialProblem": [
     "Anxiety related to new job leading to difficulty concentrating and changes in sleep and appetite",
     "Uncertainty about team dynamics and company culture at the new job"
    ],
    "PositiveAspect": [
     "Overall positive mood with feelings of happiness and hopefulness",
     "Excitement and motivation regarding the new job",
     "Active engagement in social activities and maintaining connections with loved ones", 
     "Utilization of healthy coping mechanisms such as reading and socializing",
     "Openness to exploring relaxation techniques and setting goals for personal growth", 
     "Presence of a strong support system consisting of friends and family"
    ],
    "ThingsToWorkOn": [
     "Developing effective strategies for managing work-related anxiety and stress",
     "Improving concentration and focus, potentially through mindfulness techniques or addressing underlying anxiety",
     "Establishing healthy sleep patterns and addressing changes in appetite",
     "Gaining a better understanding of the new job's company culture and team dynamics to alleviate uncertainty"
    ],
    "Recommendations": [
     "Implement relaxation techniques like deep breathing exercises, meditation, or progressive muscle relaxation to manage anxiety and promote better sleep.",
     "Explore mindfulness practices to enhance focus and reduce distracting thoughts.",
     "Set clear and achievable goals for the new job to boost confidence and a sense of accomplishment.",
     "Seek information about the company culture and team dynamics through available resources, such as the company website or employee testimonials, or by connecting with current employees.",
     "Continue engaging in enjoyable social activities and maintaining open communication with friends and family for support.", 
     "Consider exploring additional coping mechanisms such as regular physical exercise or spending time in nature."
    ],
    "AdditionalComments": [
     "Transitioning to a new job often involves a period of adjustment and it's natural to experience some anxiety or stress during this time.",
     "Proactive management of these challenges and utilization of available resources can significantly improve the adjustment process and overall well-being."
    ],
    "PotentialDisorderToConsider": [
     "While a formal diagnosis requires a comprehensive evaluation by a mental health professional, the presented symptoms, particularly their relation to the new job and its uncertainties, could potentially suggest an adjustment disorder with mixed anxiety and depressed mood."
    ] 
};

interface ContextType {
    reportData: typeof defaultReportData;
    updateReportData: (value: unknown) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ReportDataContext = createContext<ContextType>({reportData: defaultReportData, updateReportData: () => {}});

export const QuestionResponseProvider = ({ children } : {
    children: React.ReactNode;
  }) => {

  const [reportData, setReportData] = useState(defaultReportData);

  const updateReportData = (value : unknown) => {
    console.log('Inside context :', value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setReportData(value);
  };

  return (
    <ReportDataContext.Provider value={{ reportData, updateReportData }}>
      {children}
    </ReportDataContext.Provider>
  );
};

export const useReportDataContext = () => useContext(ReportDataContext);