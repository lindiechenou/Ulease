

import React, { useEffect, useState } from 'react';
import { Text} from '@ui-kitten/components';
import { AddressInfo, AddressResponse } from 'types';

interface AddressComponentProps {
  address:AddressResponse
  category:string
}
export function AddressComponent({address, category}:AddressComponentProps) {
    
    const [latitude, setLatitude] = useState<string | null>('')
    const [longitude, setLongitude] = useState<string | null>('')
    const [street, setStreet] = useState('')
    const [street2, setStreet2] = useState<string | null>('')
    const [city, setCity] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [state, setState] = useState('')
  
    useEffect( () => {
      setLatitude(address.latitude)
      setLongitude(address.longitude)
      setCity(address.city)
      setStreet(address.street)
      setStreet2(address.street2)
      setZipcode(address.zipcode)
      setState(address.state)
    });

    const formatString = () => {
        if(street2 == undefined || street2.length == 0){
            return (
                <Text category={category}>
                 {street}, {city}, {state} {zipcode}
                </Text>
             )
        } else{
            return (
                <Text category={category}>
                 {street} {street2}, {city}, {state} {zipcode}
                </Text>
             )

        }
    }
    return (
      formatString()
    )
  } //*/