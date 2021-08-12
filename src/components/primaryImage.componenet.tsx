import React, { useEffect, useState } from 'react';

import { ImageBackground} from 'react-native';
import { Text} from '@ui-kitten/components';
import {baseUrl} from '../services/subleaseList'
import {  ImageResponse } from 'types';

interface ImageHeaderProps {
    images:Array<ImageResponse>,
    style:{},
}
export function ImageHeader({images, style}:ImageHeaderProps) {
    const [image, setImage] = useState({uri: ''})
    useEffect( () => {
        let mounted = true;
        const primaryImage = images.find(element => element.is_primary);
        if(mounted) {
            if(primaryImage){
                var formatURL = primaryImage.image;
                if(primaryImage.image.startsWith('/')){
                  formatURL = baseUrl + primaryImage.image
                }
                setImage({ uri: formatURL });
            }
            else{
                setImage({uri: ''});
            }
        }
        return () => { mounted = false }; 
    }, []);
        /* let mounted = true;
        getPrimaryImageFromSublease(album)
            .then((responseJson) => {
                if(responseJson.length > 1){
                    console.log("can only be one primary image")
                    
                }
                else if(responseJson.length == 0){
                    if(mounted) {
                        setImage({uri: ''})
                    }
                 
                }
                else {
                    if(mounted) {
                        setImage({ uri: responseJson[0].image })};
                    }
            });
        return () => { mounted = false }; */

    const renderImage = () => {
     if(image.uri != ''){
        return(
            <ImageBackground
            style={style}
            source={image}
            /> 
            )
     }
    return(

        <ImageBackground
        style={style}
        source={require('./ulease.png')} ><Text style={{display: 'flex',  alignSelf: 'flex-end'}}>No Image Provided</Text></ImageBackground>
    )
    }
    return (
        renderImage()
    )
  } //*/
