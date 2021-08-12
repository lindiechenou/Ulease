import React, {createContext} from 'react';
import { deleteSaved, getSavedList, getSubleaseList, postSaved} from '../services/subleaseList'
import {SubleaseResponse} from 'types'
import {AuthContext} from './AuthProvider'
//share global data

export interface SubleaseContextData {
  requestSubleaseList(userToken:string):void;
  requestSubleaseSaved(userToken:string):void;
  deleteSubleaseSaved(id:string, userToken:string):void;
  postSubleaseSaved(id:string, userToken:string):void;
  subleaseState:State;
  dispatch:any;

}


const initialState: SubleaseContextData = {
  requestSubleaseList: () => {},
  requestSubleaseSaved: () => {},
  deleteSubleaseSaved: () => {},
  postSubleaseSaved: () => {},
  subleaseState: {
    data: [],
    saved: []
  },
  dispatch:null,

};



export const SubleaseContext = createContext<SubleaseContextData>(initialState)

type State = {
  data: SubleaseResponse[],
  saved: SubleaseResponse[],
};

 type Action = 
 | { type: 'REQUEST' , subleaseList:SubleaseResponse[]}
 | { type: 'REQUEST_SAVED' , subleaseList:SubleaseResponse[]}

//allow screen to access current user in application
export const SubleaseProvider = ({children}:any) =>{
  const {state} = React.useContext(AuthContext);
    const [subleaseState, dispatch] = React.useReducer(
      (prevState:State, action:Action):State => {
        switch (action.type) {
          case 'REQUEST':
            return {
              ...prevState,
              data: action.subleaseList
            }
          }
          switch (action.type) {
            case 'REQUEST_SAVED':
              return {
                ...prevState,
                saved: action.subleaseList
              }
            }

      },
          {
            data:[],
            saved:[],
          }
   );
    return(
        <SubleaseContext.Provider
            value={{
                subleaseState,
                dispatch,
                requestSubleaseList: async (userToken:string) => {
                    try{
                       let response:SubleaseResponse[]= await getSubleaseList(userToken);
                       dispatch({ type: 'REQUEST', subleaseList: response});
                    } catch (e) {
                        console.error(e);
                    }
                },
                requestSubleaseSaved: async (userToken:string) => {
                  try{
                     let response = await getSavedList(userToken);
                     console.log("sublease response: ", response)
                     dispatch({ type: 'REQUEST_SAVED', subleaseList: response.saved});
                  } catch (e) {
                      console.error(e);
                  }
              },
                deleteSubleaseSaved: async (id:string, userToken:string) => {
                  try{
                    let response = await deleteSaved(id, userToken);
                    if(response == true){
                      let r = await getSavedList(userToken);
                      dispatch({ type: 'REQUEST_SAVED', subleaseList: r.saved});

                      //now update data
                      let r2:SubleaseResponse[]= await getSubleaseList(userToken);
                       const result = r2.filter(sublease => (sublease.owner != state.email));
                       dispatch({ type: 'REQUEST', subleaseList: result});
                    }
                  } catch (e) {
                      console.error(e);
                  }
              },
              postSubleaseSaved: async (id:string, userToken:string) => {
                try{
                  let response = await postSaved(id, userToken);
                  console.log("post response ", response)
                  if(response == true){
                    let r = await getSavedList(userToken);
                    dispatch({ type: 'REQUEST_SAVED', subleaseList: r.saved});

                    //now update data
                    let r2:SubleaseResponse[]= await getSubleaseList(userToken);
                    const result = r2.filter(sublease => (sublease.owner != state.email));
                    dispatch({ type: 'REQUEST', subleaseList: result});
                  }
                } catch (e) {
                    console.error(e);
                }
            },
            }}
            >
                {children}
            </SubleaseContext.Provider>
    );
}