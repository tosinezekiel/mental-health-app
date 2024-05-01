"use client"

import React from 'react'
import StepCard from './step-card'
import { useQuestionResponseContext } from '../context/question-context';

interface CardDetail {
    title: string;
    serialNumber: number;
}

const SidePanel = () => {

    //Mock Data
    const cardDetails: CardDetail[] = [{
        title: 'Basic Summary',
        serialNumber: 1
    },
    {
        title: 'Key Metric',
        serialNumber: 2,
    },
    {
        title: 'Additional Details',
        serialNumber: 3,
    },
    {
        title: 'Upload Media',
        serialNumber: 4,
    },
    {
        title: 'Summary',
        serialNumber: 5
    }];

    const { data } = useQuestionResponseContext();


    return (
        <div className="bg-white p-4 flex flex-col">
            {
                cardDetails.map((cardDetail) => {
                    return (
                        <div className="mx-2 flex-1" key={cardDetail.serialNumber}>
                            <StepCard cardDetail={cardDetail}
                                currentStep={data.currentStep}></StepCard>
                        </div>)
                })
            }
        </div>
    )
}

export default SidePanel