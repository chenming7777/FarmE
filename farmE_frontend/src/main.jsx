import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import "./App.css";
import Dashboard from "./pages/dashboard/Dasboard";
import Notification from "./pages/notification/Notification";
import RootLayout from "./RootLayout";
import VirtualTwin from "./pages/virtual-twin/VirtualTwin";
import FinancialOverview from "./pages/financial-overview/FinancialOverview";
import SolarInsight from "./pages/solar-insight/SolarInsight";
import SystemCare from "./pages/system-care/SystemCare";
import SmartAssistant from "./pages/smart-assistant/SmartAssistant";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "/virtual-twin",
        element: <VirtualTwin />,
      },
      {
        path: "/financial-overview",
        element: <FinancialOverview />,
      },
      {
        path: "/solar-insights",
        element: <SolarInsight />,
      },
      {
        path: "/system-care",
        element: <SystemCare />,
      },
      {
        path: "/smart-assistant",
        element: <SmartAssistant />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
