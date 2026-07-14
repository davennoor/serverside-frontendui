import React from "react";
import { Route,Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Itineraries from "../pages/Itineraries";
import Builder from "../pages/Builder";
import Preview from "../pages/Preview";
import ProtectedRoute from "./ProtectedRoute";
import PagesLayout from "../Layout/PagesLayout";

function AppRoute(){
    return(
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>}/>
            <Route element={<ProtectedRoute>
                <PagesLayout/>
                </ProtectedRoute>}>
                <Route path="/itineraries" element={<Itineraries/>}/>
                <Route path="/itineraries/:slug/builder" element={<Builder/>}/>
                <Route path="/itineraries/:slug/preview" element={<Preview/>}/>
            </Route>
        </Routes>
)}
export default AppRoute;