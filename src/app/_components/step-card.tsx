import React from 'react'

interface CardDetail {
    title: string;
    serialNumber: string;
  }
  
  interface CardDetailtProps {
    cardDetail: CardDetail;
    isSelected: boolean;
    onItemClick: (cardDetail: CardDetail) => void;
  }

const StepCard : React.FC<CardDetailtProps> = ({ cardDetail, isSelected, onItemClick }) => {
  return (
    <div onClick={() => onItemClick(cardDetail)}>
        <div className={`rounded-lg p-2 flex ${isSelected? `bg-white` :`bg-gray-600`}`}>
            <div className={`${isSelected? `text-black` :`text-white`} mb-2 Roboto flex justify-center items-center`}>
                <span> { cardDetail.title }</span>
            </div>
            <div className={`${isSelected? `text-black` :`text-white`} p-2 mr-2 mb-2 text-4xl font-semibold italic font-serif`}> { cardDetail.serialNumber } </div>
        </div>
    </div>
  )
}

export default StepCard
