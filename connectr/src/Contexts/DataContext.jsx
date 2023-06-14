import { createContext, useEffect, useReducer } from "react";
import { DataReducer, initialState } from "../Reducers/DataReducer";

export const DataContext = createContext()

export const DataProvider = ({children}) =>{
    const [state , dispatch] =  useReducer(DataReducer , initialState)
    const getData = async() =>{
        try{
            // fetching landing page posts
            const response = await fetch("/api/posts")
            const {posts} = await response.json()
            dispatch({type: "User_Posts" , payload: posts})
        }
        catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
getData()
    },[])
return <div>
    <DataContext.Provider value={{state , dispatch}}>
        {children}
    </DataContext.Provider>
</div>
}