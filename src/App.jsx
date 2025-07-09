import { RouterProvider } from "react-router"
import routers from "./routes"
import './App.css';

export default function App() {
  return (
     <RouterProvider router={routers} />
  )
}
