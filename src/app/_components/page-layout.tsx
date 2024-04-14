"use client"

import React from 'react'
import SidePanel from './side-panel'
import MainPanel from './main-panel'
import { NextUIProvider } from '@nextui-org/react'


const PageLayout = () => {
  return (
    <NextUIProvider>
    <div className='flex'>
        <SidePanel></SidePanel>
        <MainPanel></MainPanel>
    </div>
    </NextUIProvider>
  )
}

export default PageLayout
