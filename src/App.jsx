
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Onboarding from './pages/onboarding'
import LandingPage from './pages/landingPage'
import AppLayout from './layouts/app-layout'
import JobListing from './pages/jobListing'
import PostJob from './pages/post-job'
import MyJobs from './pages/my-jobs'
import SavedJobs from './pages/saved-jobs'
import JobPage from './pages/jobs'
import { ThemeProvider } from './components/theme-provider'

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/onboarding',
          element: <Onboarding />
        },
        {
          path: '/jobs',
          element: <JobListing />
        },
        {
          path: '/post-job',
          element: <PostJob />
        },
        {
          path: '/my-jobs',
          element: <MyJobs />
        },
        {
          path: '/saved-jobs',
          element: <SavedJobs />
        },
        {
          path: '/job/:id',
          element: <JobPage />
        },
      ]
    }
  ])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>

  )
}

export default App
