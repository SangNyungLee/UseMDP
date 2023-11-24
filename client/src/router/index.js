import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import HomePage from "../pages/HomePage";
import MyPage from "../pages/MyPage";
import PlannerPage from "../pages/PlannerPage";
import App from "../App";
import MyCalendar from "../component/home/MyCalendar";
import DefaultLoadMap from "../component/defaultLoadMap/DefaultLoadMap";
import TestPage from "../pages/TestPage";
import Redirection from "../pages/Redirection";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
  {
    path: "/planner",
    element: <PlannerPage />,
  },
  {
    path: "home",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <DefaultLoadMap />,
      },
      {
        path: "calendar",
        element: <MyCalendar />,
      },
    ],
  },
  {
    path: "/testpage",
    element: <TestPage />,
  },
  {
    path: "/google/callback",
    element: <Redirection provider="google" />,
  },
  {
    path: "/github/callback",
    element: <Redirection provider="github" />,
  },
]);

export default Router;
