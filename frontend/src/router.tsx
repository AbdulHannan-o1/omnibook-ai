import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import App from "./App";
import Book from "./pages/Book";
import Chat from "./pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/book",
        element: <Book />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);

export default router;
