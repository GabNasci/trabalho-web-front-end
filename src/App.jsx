import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './views/Login/Login';
import List from './views/ListCharacters/List';
import Character from "./views/Character/Character";
import { PageContext } from "./views/Context.jsx";
import { useState } from "react";

function App() {
  const [page, setPage] = useState('https://rickandmortyapi.com/api/character?page=1')

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login></Login>
    },
    {
      path: '/targetlist',
      element: <List></List>
    },
    {
      path: '/character/:id',
      element: <Character></Character>
    }

  ])

  return (
    <PageContext.Provider value={{page, setPage}}>
      <RouterProvider router={router}></RouterProvider>
    </PageContext.Provider>
  )
}

export default App
