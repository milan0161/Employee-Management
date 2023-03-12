import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import { tokenLoader } from "./utils/get-auth";
import TaskPage from "./pages/TaskPage";
import CompletedTasksPage, { loader as completedTaskLoader } from "./pages/CompletedTasksPage";
import ErrorPage from "./pages/ErrorPage";


function App() {



    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            loader: tokenLoader,
            id: 'root',
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                { path: 'employee', element: <EmployeePage /> },
                { path: 'tasks', element: <TaskPage /> },
                { path: 'completed-tasks', element: <CompletedTasksPage />, }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    );
}

export default App;
