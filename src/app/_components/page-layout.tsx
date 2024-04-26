"use client"

import React from 'react'
import SidePanel from './side-panel'
import MainPanel from './main-panel'
import { NextUIProvider } from '@nextui-org/react'
import { QuestionResponseProvider } from '../context/question-context'


const PageLayout = () => {
  return (
    <NextUIProvider>
    <div className='flex h-screen'>
    <QuestionResponseProvider>
        <SidePanel></SidePanel>
        <MainPanel></MainPanel>
    </QuestionResponseProvider>
    </div>
    </NextUIProvider>
  )
}

export default PageLayout
