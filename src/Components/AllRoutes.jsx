import React from "react";
import { Routes, Route } from "react-router-dom";
import { Form } from "./Form";
import { Main } from "./Main";
import { Tests } from "./Tests";
export const AllRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/mainPage" element={<Main />} />
          <Route path="/mainPage/:id" element={<Tests />} />
        </Routes>
      </div>
    </>
  );
};
