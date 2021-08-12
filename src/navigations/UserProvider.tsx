import React, {createContext} from 'react';
import {postSublease, getUser, patchUserSublease, postImages, deleteImages, patchImages, deleteSublease} from '../services/subleaseList'
import {ImageRequest, ImageResponse, SubleaseResponse, UserResponse} from 'types'
import { AuthContext } from './AuthProvider';
import { Alert, ImageStore } from 'react-native';
//share global data


//all the different things we can patch in a user
export type Body = 
| {address: { street:string, street2:string, city:string, state:string, zipcode:string}}
| { description:string}
| { housing_type:string }
| { start_lease:string, end_lease:string}
| { men_allowed:boolean, women_allowed:boolean, nb_other_allowed:boolean }
| { room_type:string}
| { num_roomates:number }
| { images:ImageResponse }
| { room_type:string}
| { cost_per_month:number}
| {pets_allowed:boolean 
  washer_dryer:boolean
  is_furnished:boolean
  pool_available:boolean
  lgbt_friendly: boolean,
  free_parking:boolean,
  fitness_center:boolean}
export interface UserContextData {
  createUserImages(images:ImageRequest[]):void;
  deleteUserImages(id:string[]):void;
  patchUserImages(imageID:string, is_primary:boolean):void;
  deleteSublease():void
  requestUser(userToken:string):void;
  patchUser():void;
  patchUserSublet(arg:Body):void;
  postUserSublet(sublet:SubleaseResponse, imageRequest:ImageRequest[]):void;
  userState:State;
  dispatch:any;

}


const initialState: UserContextData = {
  requestUser: () => {},
  patchUser: () => {},
  patchUserImages: () => {},
  createUserImages: () => {},
  deleteUserImages: () => {},
  deleteSublease: () => {},
  patchUserSublet: (arg:Body) => {},
  postUserSublet: () => {},
  userState: {
      id:'',
      email:'',
      first_name:'',
      last_name:'',
      university_choices:'',
      user_sublease:undefined,
    },
  dispatch:null,

};



export const UserContext = createContext<UserContextData>(initialState)
type State = UserResponse;

 type Action =
 | { type: 'REQUEST' , user:UserResponse}
 | { type: 'PATCH_USER', first_name:string, last_name:string}
 | { type: 'PATCH_USER_SUBLET', sublease:SubleaseResponse | undefined }
 | { type: 'POST', sublease:SubleaseResponse };

//allow screen to access current user in application
export const UserProvider = ({children}:any) =>{
    const {state} = React.useContext(AuthContext);
    const [userState, dispatch] = React.useReducer(
        (prevState:State, action:Action):State => {
          switch (action.type) {
            case 'REQUEST':
              return {
                id:action.user.id,
                email:action.user.email,
                first_name:action.user.first_name,
                last_name:action.user.last_name,
                university_choices:action.user.university_choices,
                user_sublease:action.user.user_sublease,  
              };
            case 'POST':
              return{
                ...prevState,
                user_sublease:action.sublease
              };
            case 'PATCH_USER':
              return {
                ...prevState,
                first_name:action.first_name,
                last_name:action.last_name,
              };
            
            case 'PATCH_USER_SUBLET':
              return {
                ...prevState,
                user_sublease:action.sublease,
              };
          }
        },
        {
          id:'',
          email:'',
          first_name:'',
          last_name:'',
          university_choices:'',
          user_sublease:undefined,
        }
      );
    return(
        <UserContext.Provider
            value={{
                userState,
                dispatch,
                requestUser: async (userToken:string) => {
                    try{
                       let response= await getUser(userToken);
                       console.log("user response: ", response)
                        dispatch({ type: 'REQUEST', user: response});
                    } catch (e) {
                        console.error(e);
                    }
                },
                patchUser:async() => {
                
                },
                patchUserSublet:async(body) => {
                  try{
                    const id:string | undefined = userState.user_sublease?.id
                    let response= await patchUserSublease(state.userToken, id, body )
                    console.log("patch response: ", response)
                     dispatch({ type: 'PATCH_USER_SUBLET', sublease: response});
                 } catch (e) {
                     console.error(e);
                 }
                 

                },
                createUserImages:async(images:ImageRequest[]) => {
                  try{
                   
                      await postImages(state.userToken, userState.user_sublease?.id, false, images)

                    //update user vals by performing get
                    let response= await getUser(state.userToken);
                    dispatch({ type: 'REQUEST', user: response});
                    
                  } catch (e) {
                     console.error(e);
                 }

                },
                deleteUserImages:async(id:string[]) => {

                  async function asyncForEach(array:string[], callback:Function) {
                    for (let index = 0; index < array.length; index++) {
                      await callback(array[index], index, array);
                    }
                  }
                  
                  const start = async () => {
                    await asyncForEach(id, async (element:string) => {
                      await deleteImages(state.userToken, element)
                      console.log(element);
                    });
                    let response= await getUser(state.userToken);
                    dispatch({ type: 'REQUEST', user: response});
                  }
                  start();


                },
                patchUserImages:async(ImageID:string, is_primary:boolean) => {

                  await patchImages(state.userToken, ImageID, {is_primary:is_primary})
            
                  let response= await getUser(state.userToken);
                  console.log("user Response: ", response)
                  dispatch({ type: 'REQUEST', user: response});
                },

                deleteSublease:async() => {
                  let response = await deleteSublease(state.userToken, userState.user_sublease?.id);
                  if (response == null) {
                    Alert.alert("Error. Try Again.")
                  }
                else{
                  dispatch({type: 'PATCH_USER_SUBLET', sublease:undefined})
                }
                },
                
                postUserSublet:async(sublet:SubleaseResponse, imageRequest:ImageRequest[]) => {
                  sublet.owner = userState.email;
                  let response = await postSublease(state.userToken, sublet)
                  await console.log("response: ", response)
                  await postImages(state.userToken, response.id, false, imageRequest)
                  let userResponse = await getUser(state.userToken)
                  dispatch({type: 'REQUEST', user: userResponse});
                
                  
                }
                
            }}
            >
                {children}
            </UserContext.Provider>
    );
}