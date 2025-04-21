
import "./App.css";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import AuthContextProvider from "./Context/AuthContext";
import Layout from "./assets/Layout/Layout";
import ReportedVideos from "./Components/ReportedVideos/ReportedVideos";
import AllVideos from "./Components/AllVideos/AllVideos";
import GetUser from "./Components/GetUser/GetUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Protected from "./Gaurd/Protected";
const router = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element: <Protected><Layout /></Protected>,
    children: [
      {
        index: true,
        element: <ReportedVideos />,
      },
      {
        path: "AllVideos",
        element: <AllVideos />,
      },
      {
        path: "GetUser",
        element: <GetUser />,
      }
    ]
  }
]);
const queryClient = new QueryClient()

function App() {
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthContextProvider>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
