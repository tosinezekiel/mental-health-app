import React from 'react'
import { Check } from '@styled-icons/bootstrap/Check';
import styled from 'styled-components'

interface CardDetail {
    title: string;
    serialNumber: number;
  }
  
  interface CardDetailtProps {
    cardDetail: CardDetail;
    currentStep: number;
  }

  const WhiteCheck = styled(Check)`
  color: white;
`

const StepCard : React.FC<CardDetailtProps> = ({ cardDetail, currentStep }) => {

  return (
    <div className='flex flex-col h-full items-center'>
      <div className={ `${cardDetail.serialNumber < currentStep ? `bg-green-500`: (cardDetail.serialNumber === currentStep) ? `bg-gray-500 text-white font-bold` : `border border-black`} h-10 w-10 rounded-full flex items-center justify-center`}>
        { cardDetail.serialNumber < currentStep ? <WhiteCheck /> : cardDetail.serialNumber }
      </div>
      {(cardDetail.serialNumber === 5) ? `` : <div className={`${cardDetail.serialNumber < currentStep ? `bg-green-500`: `bg-black`} w-1 flex-1`}></div>}
    </div>
  )
}


export default StepCard
