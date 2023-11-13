import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Main from "./views/Main";

const Router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Main/>
            },
        ]
    }
])

export default Router