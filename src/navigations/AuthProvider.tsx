
import React, {createContext} from 'react';
import {signIn, register, signOut} from '../services/subleaseList'

type LoginProps = {
  email:string,
  password:string,
}
type RegisterProps = {
  email:string,
  password:string,
  password2:string,
  firstName:string,
  lastName:string,
  university:string,
}
//share global data
export interface AuthContextData {
  login({email, password}:LoginProps): any;
  logout(): void;
  state:State;
  dispatch:any;
  register({email, password, password2, firstName, lastName, university}:RegisterProps):any;
 
}
//making typescript happy
const initialState: AuthContextData = {
  login: () => {},
  logout: () => {},
  register: () => {},
  state: {
    isLoading: true,
    isSignout: false,
    userToken: null,
    email:null
  },
  dispatch:null,

};
export const AuthContext = createContext<AuthContextData>(initialState)

type State = {
  isLoading: boolean,
  isSignout: boolean,
  userToken: string | null,
  email:string | null,
 }
 type Action =
 | { type: 'RESTORE_TOKEN' , token:string, email:string}
 | { type: 'SIGN_IN', token:string, email:string}
 | { type: 'SIGN_OUT' };

//allow screen to access current user in application
export const AuthProvider = ({children}:any) =>{
    const [state, dispatch] = React.useReducer(
        (prevState:State, action:Action):State => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                email:action.email,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
                email:action.email,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
                email:null
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
          email:null
        }
      );
    return(
        <AuthContext.Provider
            value={{
                state,
                dispatch,
                login: async ({email, password}) => {
                    try{
                       let response = await signIn(email, password);
                        if(response != undefined){
                          dispatch({ type: 'SIGN_IN', token: response.key, email: email });
                        }
                        return response
                        
                    } catch (e) {
                        console.error(e);
                    }
                },
                register: async ({email, password, password2, firstName, lastName, university}) => {
                    try {
                        let response = await register(email, password, password2, firstName, lastName, university);
                        return response;

                    } catch(e){
                        console.error(e);
                    }
                },
                logout:  async() => {
                    try {
                        await signOut();
                        dispatch({ type: 'SIGN_OUT' })
                    } catch (e) {
                        console.error(e);
                    }
                }
            }}
            >
                {children}
            </AuthContext.Provider>
    );
}