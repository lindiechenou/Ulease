import React from 'react';
import { Platform } from 'react-native';
import axios from 'axios';

export const baseUrl = Platform.OS === 'android' ?
    'http://10.0.2.2:8000'
: 
'http://localhost:8000';



export function getSubleaseList(userToken) {
  axios.defaults.headers.common.Authorization = `Token ${userToken}`;
  return axios
    .get(baseUrl+'/api/sublet/',{
      credentials: 'include' ,
      headers: {
        'Authorization': `Token ${userToken}`
      }
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      return []
    })
}
export function postSublease(userToken, sublet) {
  console.log("sublet : ", sublet)
  const body = JSON.stringify({
    address: {
      city: sublet.address.city,
      lattitude: null,
      longitude: null,
      state: sublet.address.state,
      street: sublet.address.street,
      street2:  sublet.address.street2,
      zipcode:  sublet.address.zipcode,
    },
    status: "Available",
    saved_list: [],
    images_set: [],
    description: sublet.description,
    cost_per_month: sublet.cost_per_month,
    room_type: sublet.room_type,
    housing_type: sublet.housing_type,
    university_choices: sublet.university_choices,
    num_roomates: sublet.num_roomates,
    start_lease: sublet.start_lease,
    end_lease: sublet.end_lease,
    men_allowed: sublet.men_allowed,
    women_allowed: sublet.women_allowed,
    nb_other_allowed: sublet.nb_other_allowed,
    pets_allowed: sublet.pets_allowed,
    washer_dryer: sublet.washer_dryer,
    is_furnished: sublet.is_furnished,
    pool_available: sublet.pool_available,
    lgbt_friendly: sublet.lgbt_friendly,
    free_parking: sublet.free_parking,
    fitness_center: sublet.fitness_center,
    owner:  sublet.owner})
    console.log("body: ", body)

  axios.defaults.headers.common.Authorization = `Token ${userToken}`;
  return axios
    .post(baseUrl+'/api/sublet/', body, {
      credentials: 'include' ,
      headers: {
        'Authorization': `Token ${userToken}`,
        'Content-Type':'application/json'
      }
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(JSON.stringify(error))
      
    })
}

export function deleteImages(userToken, id) {
  axios.defaults.headers.common.Authorization = `Token ${userToken}`;
  return axios
    .delete(baseUrl+`/api/image/${id}/`, {
      credentials: 'include' ,
      headers: {
        'Authorization': `Token ${userToken}`,
      }
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log("error: ", error);
      return []
    })

}
export function patchImages(userToken, id, body) {
  axios.defaults.headers.common.Authorization = `Token ${userToken}`;
  return axios
    .patch(baseUrl+`/api/image/${id}/`, body, {
      credentials: 'include' ,
      headers: {
        'Authorization': `Token ${userToken}`,
        'Content-Type':'application/json'
      }
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log("error: ", error);
      return []
    })

}

export function postImages(userToken, id, is_primary, images) {
  axios.defaults.headers.common.Authorization = `Token ${userToken}`;
  const photos = images.map( i => 
    { return(
      {
      name: i.photo.fileName,
      type: i.photo.type,
      uri:
        Platform.OS === "android" ? i.photo.uri : i.photo.uri.replace("file://", "")
      }
        )
      })
  console.log(JSON.stringify(photos))
  let form_data = new FormData();

  photos.forEach(element => {
    form_data.append(`image`, element)
  });
  form_data.append('sublease', id);
  form_data.append('is_primary', is_primary);

  return axios
    .post(baseUrl+'/api/image/', form_data, {
      credentials: 'include' ,
      headers: {
        'Authorization': `Token ${userToken}`,
      //  'Content-Type': `multipart/form-data`
      }
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log("error: ", error);
      return []
    })
}

export function resetPassword(email){
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  return axios
    .post(baseUrl+'/api/password_reset/', {email:email},{
      credentials: 'include' ,
     
    })
     .then(response => {
      if (response.status != 200) {
          throw new Error(response[text])
        }
      else{
        return true;
      }
    }
    )
    .catch((error) => {
        alert(error.message);
        return false;
        
      });


}
export function resetPasswordChange(password, key){
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  console.log("password", password, key)
  return axios
    .post(baseUrl+'/api/password_reset/confirm/', {password:password, token:key},{
      credentials: 'include' ,
     
    })
    .then(response => {
      if (response.status != 200) {
          throw new Error(response[text])
        }
      else{
        return true;
      }
    }
    )
    .catch((error) => {
        alert(error.message);
        return false;
        
      });



}

export function getSavedList(userToken) {
  
  axios.defaults.headers.common.Authorization = `Token ${userToken}`;
  return axios
    .get(baseUrl+'/api/saved/',{
      credentials: 'include' ,
      headers: {
        'Authorization': `Token ${userToken}`
      }
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error("error: ", error)
      return []
    })
}


export function postSaved(data, userToken){
  axios.defaults.headers.common.Authorization = `Token ${userToken}`;
  return axios
    .post(baseUrl+`/api/saved/${data}/add_saved/`, {
      credentials: 'include' ,
      headers: {
        'Authorization': `Token ${userToken}`
      }
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error("error: ", error)
      return []
    })
  }


  export function deleteSaved(data, userToken){
    axios.defaults.headers.common.Authorization = `Token ${userToken}`;
    return axios
      .delete(baseUrl+`/api/saved/${data}/delete_saved/`, {
        credentials: 'include' ,
        headers: {
          'Authorization': `Token ${userToken}`
        }
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.error("error: ", error)
        return []
      })
    }
/*
        // Outputs 'user_session=abcdefg; path=/;'
        return fetch(baseUrl+'/api/saved/', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           // 'X-CSRFToken': res.csrftoken,
          },
          body: JSON.stringify({
            first_name:'bob'
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })
      //}); */
    /*
  //  var csrftoken = getCookie('csrftoken');
    console.log("hey:", JSON.stringify({sublet: data}))
    return fetch(baseUrl+'/api/rest-auth/user/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({saved: data})
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    }); */
//deprecated
export function getAddressFromSublease(item) {
  /*  address = item.address
    return fetch(baseUrl+`/api/address/${address}`)
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
      }); */
}

//deprecated
export function getImageFromSublease(item) {
  /*  album = item.album
    return fetch(baseUrl+`/api/image/?album=${album}`)
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
      }); */
}
//deprecated
export function getPrimaryImageFromSublease(album) {
    return fetch(baseUrl+`/api/image/?album=${album}&primary=true`)
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
      });
}

export function patchUserSublease(userToken, id, body){

  return axios
    .patch(baseUrl+`/api/sublet/${id}/`, body, {
      credentials: 'include' ,
      headers: {
        'Authorization': `Token ${userToken}`
      },
      
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error("error: ", error)
      return []
    })
  
}

export function getUser(userToken) {
  let headers = {"Content-Type": "application/json"};
  headers["Authorization"] = `Token ${userToken}`;
    return fetch(baseUrl+`/api/rest-auth/user/`, {headers, })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
      }); 
}
function handleErrors(response) {
    if (!response.ok) {
        // console.error("API call failed ", response.json())
        // alert("error.message");
      return response.json().then(response => {
        var text = Object.keys(response)[0]
        throw new Error(response[text])
      })
    }
    else{
      return response.json();
    }
}

export function signIn(email, password) {
    return fetch(baseUrl+`/api/rest-auth/login/`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        password: password,
    }), })
    .then(response => {
      if (!response.ok){
        return response.json().then(response => {
          var text = Object.keys(response)[0]
          throw new Error(response[text])
        })
      }
      else{
        return response.json();
      }
    }).catch((error) => {
      alert(error.message);
      return null;
    })
}

export function register(email, password, password2, firstName, lastName, university){
    return fetch(baseUrl+`/api/rest-auth/registration/`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        password1: password,
        password2: password2,
        university_choices:university,
        first_name:firstName,
        last_name:lastName,
    }), })
    .then(response => {
        if (!response.ok) {
          return response.json().then(response => {
            var text = Object.keys(response)[0]
            throw new Error(response[text])
          })
      }
    else{
      return response.json()
    }
    })
    .catch((error) => {
        alert(error.message);
        return null;
        
      });
}

export function signOut() {
    return fetch(baseUrl+`/api/rest-auth/logout/`, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
      });
}

export function deleteSublease(userToken, subletID) {
  axios.defaults.headers.common.Authorization = `Token ${userToken}`;
  return axios
    .delete(baseUrl+`/api/sublet/${subletID}/`,{
      credentials: 'include' ,
      headers: {
        'Authorization': `Token ${userToken}`
      }
    }).then(response =>{
      return response.status
    })
    .catch((error) => {
      console.error(error);
      return null
    });
  
}
export function getImageURL(){
    return baseUrl
}

export function changePWord(userToken, password, password2){
  let headers = {"Content-Type": "application/json"};
  headers["Authorization"] = `Token ${userToken}`;
  return fetch(baseUrl+`/api/rest-auth/password/change/`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
      new_password1: password,
      new_password2: password2,
  }), })
  .then(response => {
      if (!response.ok) {
        return response.json().then(response => {
          var text = Object.keys(response)[0]
          throw new Error(response[text])
        })
    }
  else{
    return response.json()
  }
  })
  .catch((error) => {
      alert(error.message);
      return null;
      
    });
}
