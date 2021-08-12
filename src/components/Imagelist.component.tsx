

import React, { useEffect, useState } from 'react';
import { Image, ListRenderItemInfo, StyleSheet, View, ImageSourcePropType } from 'react-native';
import { Button, Card, List, Text, Input } from '@ui-kitten/components';
import {baseUrl} from '../services/subleaseList'
import {ImageResponse} from 'types'

interface ImageHeaderProps {
  imageList:ImageResponse[],
}

export function ImageList ({imageList}:ImageHeaderProps) {
    const [images, setImages] = useState<ImageResponse[]>([])

    useEffect( () => {
        let mounted = true;
        if(mounted){
          setImages(imageList)
        }
       /* getImageFromSublease(props.sublet)
            .then((responseJson) => {
            if(mounted) {
              setImages(responseJson)
              }
            }); */
        return () => { mounted = false };
    }, []);

    const renderImageItem = (item:ImageResponse): React.ReactElement => {
      console.log("item: ", JSON.stringify(item))
      var formatURL = item.image;
      if(item.image.startsWith('/')){
        formatURL = baseUrl + item.image
      }
      return(
      <Image
        style={styles.imageItem}
        source={{uri: formatURL}}
      />
    )};
    const renderImages = () =>{
      if(images.length == 0){
        return <Text style={{textAlign:'center'}}>no photos</Text>
      }
      return(
        <List
          contentContainerStyle={styles.imagesList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({item}) => renderImageItem(item)}
      /> 
      );
    }
    return (
      renderImages()
    )
  } //*/

  const styles = StyleSheet.create({
    
    itemHeader: {
      height: 160,
    },
    imagesList: {
      padding:8
    },
    imageItem: {
      width: 180,
      height: 120,
      borderRadius: 8,
      marginHorizontal: 8,
    },
})