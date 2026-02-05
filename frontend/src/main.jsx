import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import router from "./routes/Router.jsx"
import { Provider } from 'react-redux'
import store from "./redux/store.js"
import { PersistGate } from 'redux-persist/integration/react'
import {persistor} from "./redux/store.js"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <PersistGate persistor={persistor}>
     <RouterProvider router={router}/>
     <Toaster/>
   </PersistGate>
  </Provider>
)
