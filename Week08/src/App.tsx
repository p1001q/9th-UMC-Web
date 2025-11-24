import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TestDebouncePage from "./pages/TestDebouncePage";
import TestThrottlePage from "./pages/TestThrottlePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TestDebouncePage />,
  },
  {
    path: "/test-throttle",
    element: <TestThrottlePage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
