import { RouterProvider } from "react-router";
import GetRouter from "./router/GetRouter.tsx";


function App() {
  return <RouterProvider router={GetRouter}>
  </RouterProvider>;
}

export default App;