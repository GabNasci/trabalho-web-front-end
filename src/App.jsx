import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './components/Login/Login';
import List from './components/ListCharacters/List';
import Character from "./components/Character/Character";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login></Login>
    },
    {
      path: '/list',
      element: <List></List>
    },
    {
      path: '/character/:id',
      element: <Character></Character>
    }

  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
