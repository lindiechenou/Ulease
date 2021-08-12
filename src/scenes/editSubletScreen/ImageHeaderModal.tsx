
import React, {useEffect, useState} from 'react';
import Svg, {   
    Circle,
  } from 'react-native-svg';
import {Alert, Modal, Image, ImageBackground, StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import {Button, Input, ButtonGroup, List, Text, Icon, StyleService, useStyleSheet} from '@ui-kitten/components';
import { AddressInfo, ImageResponse } from 'types';

type Props = {
    images:ImageResponse[]
    imageHeaderModal:boolean
    callbackModal:Function
    callbackCancelModal:Function
  };

export default function ImageHeaderModal(props:Props){
    const styles = useStyleSheet(themedStyles);
    const [images, setImages] = useState<ImageResponse[]>(props.images)
    const [oldHeader, setOldHeader] = useState<ImageResponse | undefined>(props.images.find(element => element.is_primary == true))
    console.log("oldheader:", oldHeader)
    console.log("images available: ", JSON.stringify(props.images))
    const [newHeader, setNewHeader] = useState<ImageResponse | undefined>( props.images.find(element => element.is_primary == true))
    
    useEffect(() => {
      setImages(props.images);
      setOldHeader(props.images.find(element => element.is_primary == true));
  }, [props])
  
    const cancel = ( () => {
        setImages(props.images);
        setNewHeader(undefined);
        props.callbackCancelModal(ImageHeaderModal)
    }
    )
    
    
      
      const chooseImage = (id:string) => {

        console.log("chose header: ", id)
        let newarray = [...images]; // make a separate copy of the array
        const old_primary = newarray.findIndex(image => image.is_primary==true);
        const new_primary = newarray.findIndex(image => image.id==id)
        

        if (old_primary !== -1) {
          newarray[old_primary].is_primary = false
        }
        if(new_primary != -1){
          newarray[new_primary].is_primary = true;
          setNewHeader(newarray[new_primary]);
        }
        
        setImages([...newarray]);
        
    };

    const submit = () => {
      props.callbackModal(oldHeader?.id, newHeader?.id)
    }
    const renderPrimaryImage = ():React.ReactElement=>{
      const pImage = images.find(image => image.is_primary==true)
      if(pImage === undefined){
        return(
         <View style={styles.imagePlaceholder}>
            <Text category='p1' style={styles.subText}>No Image Provided</Text>
        </View>
        )
      }
      return(
        <View style={styles.imagePlaceholder}>
        <ImageBackground
              style={styles.primaryImageItem}
              source={{uri: pImage.image}}>
        </ImageBackground>
      </View>
      )
    }
    const renderList = ():React.ReactElement=>(
     images.length ?
      <FlatList
      
      horizontal={true}
      keyExtractor={(item) => item.id}
      data={[...images]}
      renderItem={renderImageItem}
      
    /> :
    <Text category='p1' style={styles.subTextMargin}>No Images Provided {'\n'} Upload Images to Choose a Header</Text>
    )
    
    type ImageProps ={
      item: ImageResponse,
      index:number
    }
      const renderImageItem = ({item, index}:ImageProps): React.ReactElement => {
        //console.log("index", index, "images", images.length)
        
        return(
        <TouchableOpacity onPress={() => {chooseImage(item.id)}}>
          <ImageBackground
              style={styles.imageItem}
              source={{uri: item.image}}
        ></ImageBackground>
        </TouchableOpacity>

      )};
    return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.imageHeaderModal}
                onRequestClose={() => {
                  cancel()
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.backgroundHeader}>
                    <Text category='s1' style={styles.headerText}>Edit Image Header</Text>
                  </View>
                    <Text category='s1' style={styles.subText}>Current Image Header</Text>
                    {renderPrimaryImage()}
                    <Text category='s1' style={styles.subText}>Available Images</Text>
                    <View style={styles.flatlistcaption}>
                    <View style={styles.list}>
                    {renderList()}
                    </View>
                    <Text category='p2' style={styles.caption}>1. Click an uploaded image from the list</Text>
                    <Text category='p2' style={styles.caption}>2. View your header choice with your leasing by previewing how your leasing looks to users</Text>
                    </View>
                    <View style={styles.buttonGroup}>
                      <Button style={styles.button}
                          size='medium'
                          onPress={() => submit()}>
                          submit
                      </Button>
                     
                      
                      </View>
                </View>
                </View>
                
            </Modal>
  )
}
const themedStyles = StyleService.create({
  buttonGroup:{
    marginTop:10,
    justifyContent:'center',
    alignContent:'center',
    flexDirection:'row',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginVertical:10,
    marginHorizontal:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 4,
    elevation: 5,
  },
  backgroundHeader:{
    backgroundColor:"color-primary-500",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      paddingBottom:20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'90%',
  },
    headerText:{
      textAlign:'center',
      marginTop:15,
      color:'white',
    },
    subText:{
      textAlign:'center',
      marginTop:20,
      marginBottom:5,
    },
    subTextMargin:{
      textAlign:'center',
      margin:20,
    },
    inputView: {
      margin:10,
    },
   
    caption:{
      textAlign:'left',
      alignSelf:'flex-start',
      padding:0
    },
    flatlistcaption:{
      paddingHorizontal:10,
    },
    list:{
      paddingRight:10,
      paddingLeft:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor: "color-primary-transparent-100",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    imagePlaceholder:{
      justifyContent:'center',
      alignSelf:'center',
      height: 160,
      width:240,
      borderRadius: 8,
      margin: 5,
      backgroundColor: "color-primary-transparent-100",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    imageItem: {
        flexDirection:'row',
        justifyContent:'flex-end',
        width: 130,
        height: 120,
        borderRadius: 8,
        margin: 5,
      },
      primaryImageItem: {
        alignSelf:'center',
        height: 160,
        width:240,
        borderRadius: 8,
        margin: 5,
      },
      addItem: {
        alignItems: "center",
        justifyContent:'center',
        width: 130,
        height: 120,
        borderRadius: 8,
        margin: 8,
        borderColor:'black',
        borderWidth:1,
      },
      addIcon:{
        width: 40,
        height: 40,
      },
      icon: {
        margin:-5,
        color:'black',
        borderColor:'black',
        backgroundColor:'white',
        overflow:'hidden',
        borderWidth:1,
        borderRadius:11,
        width: 22,
        height: 22,
      },
  });