"use client"

import React, { useState } from 'react'
import StepCard from './step-card'

interface CardDetail {
    title: string;
    serialNumber: string;
  }

const SidePanel = () => {

    //Mock Data
    const cardDetails : CardDetail[] = [{
        title: 'Basic Summary',
        serialNumber: '1'
    },
    {
        title: 'Key Metric',
        serialNumber: '2',
    },
    {
        title: 'Additional Details',
        serialNumber: '3',
    },
    {
        title: 'Upload Media',
        serialNumber: '4',
    }];

    const [selectedStep, setSelectedStep] = useState<CardDetail | null>(null);

    const handleItemClick = (cardDetail: CardDetail) => {
        console.log(cardDetail);
        setSelectedStep(cardDetail);
      };


    return (
        <div className="bg-black p-4">
            {
                cardDetails.map((cardDetail) => {
                   return (
                    <div className="mb-4 mx-2" key={cardDetail.serialNumber}>
                   <StepCard cardDetail={cardDetail}
                   isSelected={selectedStep?.serialNumber === cardDetail.serialNumber}
                   onItemClick={handleItemClick}></StepCard>
                   </div>)
                })
            }
        </div>
    )
}

export default SidePanel