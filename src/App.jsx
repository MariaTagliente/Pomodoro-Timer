import { RouterProvider } from 'react-router'
import './App.css'
import router from './routing/router'
import { ModesProvider } from './context/ModesContext'

function App() {

  return (
    <>
      <ModesProvider>
        <RouterProvider router={router}/>
      </ModesProvider>    
    </>
  )
}

export default App