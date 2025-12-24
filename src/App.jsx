import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import LandingPage from "./pages/landingPage";
import Onboarding from "./pages/onboarding";
import JobListing from "./pages/jobListing";
import PostJob from "./pages/post-job";
import MyJobs from "./pages/my-jobs";
import SavedJobs from "./pages/saved-jobs";
import JobPage from "./pages/jobs";

import AppLayout from "./layouts/app-layout";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/protected-route";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <LandingPage /> },

        {
          element: <ProtectedRoute />,
          children: [
            { path: "/onboarding", element: <Onboarding/> },
            { path: "/jobs", element: <JobListing /> },
            { path: "/post-job", element: <PostJob /> },
            { path: "/my-jobs", element: <MyJobs /> },
            { path: "/saved-jobs", element: <SavedJobs /> },
            { path: "/job/:id", element: <JobPage /> },
          ],
        },
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="light" enableSystem={false} storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
