import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './components/Login';
import List from './components/List';
import Pokemon from './components/Pokemon';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login></Login>
    },
    {
      path: '/v1/list',
      element: <List></List>
    },
    {
      path: '/v1/pokemon',
      element: <Pokemon></Pokemon>
    }

  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
