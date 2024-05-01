"use client";

import React from "react";
import SidePanel from "./side-panel";
import MainPanel from "./main-panel";
import { QuestionResponseProvider } from "../context/question-context";

const PageLayout = () => {
  return (
    <div className="flex h-screen">
      <QuestionResponseProvider>
          <SidePanel></SidePanel>
          <MainPanel></MainPanel>
      </QuestionResponseProvider>
    </div>
  );
};

export default PageLayout;
