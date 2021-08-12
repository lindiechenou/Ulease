import {ImageLibraryOptions, launchImageLibrary} from 'react-native-image-picker';
import React, {useEffect, useState} from 'react';
import Svg, {   
    Circle,
  } from 'react-native-svg';
import {Alert, Modal, Image, ImageBackground, TouchableOpacity, View, FlatList, Platform} from "react-native";
import {Button, Input, ButtonGroup, List, Text, Icon, StyleService, useStyleSheet, ListItem} from '@ui-kitten/components';
import {  ImageResponse, ImageRequest } from 'types';

type Props = {
    images:ImageResponse[]
    imageModal:boolean
    sublease:string
    callbackModal:Function
    callbackCancelModal:Function
  };

export default function ImageModal(props:Props){
    const styles = useStyleSheet(themedStyles);
    const [tempID, setTempID] = useState<number>(0);
    //images that are already in the database
    const [images, setImages] = useState<ImageResponse[]>(props.images);
    
    const [newImages, setNewImages] = useState<ImageRequest[]>([]);

    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    
    useEffect(() => {
      setImages(props.images);
      setNewImages([]);
      setDeletedImages([]);
  }, [props])

    const cancel = ( () => {
        setTempID(0);
        setImages(props.images);
        setNewImages([])
        setDeletedImages([])
        props.callbackCancelModal(ImageModal);
    }
    )
    const handleChoosePhoto = () => {
      if(images.length == 10){
        Alert.alert("maximum number of photos reached");
        return
      }
        const options:ImageLibraryOptions= {
            mediaType:'photo'
        };
        launchImageLibrary(options, (response) => {
          if (response.uri) {
            const newImage:ImageRequest = {image: response.uri, id:tempID.toString(),photo:response};
            setTempID(tempID+1);
            setNewImages([...newImages, newImage]);
          }
        });
      };

      /*
      type ImageProp = {
        item:ImageInfo,
        index:number
      } */
      
      const placeDeleteHandler = (id:string) => {
        // delete image
        //if the image wasn't added to the database yet we don't need to do much
        if(id.length <= 2){
          const filteredData = newImages.filter(item => item.id !== id);
          setNewImages(filteredData)
        }else{
          const filteredData = images.filter(item => item.id !== id);
          setDeletedImages([...deletedImages, id])
          setImages(filteredData)
        }

      
        
    };

    const submit = () => {
      setTempID(0)
      props.callbackModal(newImages, deletedImages)
    }
    
    type addImage = {
      id:string
      image:string
    }
    type ImageProps ={
      item: ImageResponse | addImage,
      index:number
    }
      const renderImageItem = ({item, index}:ImageProps): React.ReactElement => {
        //console.log("index", index, "images", images.length)
        
        if(item.id == 'add'){
          return(
            <TouchableOpacity style={styles.addItem}
            onPress={handleChoosePhoto}>
            <Icon
                    style={styles.addIcon}
                    name={'add'}
                    pack='material'
            />
            </TouchableOpacity>
          )
        }
        return(
        <ImageBackground
          style={styles.imageItem}
          source={{uri: item.image}}
        >
        <TouchableOpacity onPress={() => {placeDeleteHandler(item.id)}}>
            <Icon
                    style={styles.icon}
                    name={'remove'}
                    pack='material'
                    
            />
        </TouchableOpacity>
    </ImageBackground>
      )};
    return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.imageModal}
                onRequestClose={() => {
                  cancel()
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.backgroundHeader}>
                    <Text category='s1' style={styles.headerText}>Edit Images</Text>
                    </View>
                    
                    <FlatList
                        style={styles.imagesList}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={false}
                        data={[...images, ...newImages, { id: 'add', image:'' }]}
                        renderItem={renderImageItem}
                    /> 
                    <Text style={styles.caption}>{images.length + newImages.length}/10 images selected</Text>
                    <View style={styles.buttonGroup}>
                    <Button style={styles.button}
                        size='medium'
                        onPress={() => submit()}>
                        submit
                    </Button>
                    <Button
                    size='medium'
                    onPress={() => cancel()}
                    style={styles.button}>cancel</Button>
                    </View>
                </View>
                </View>
                
            </Modal>
  )
}
const themedStyles = StyleService.create({
  buttonGroup:{
    justifyContent:'center',
    alignContent:'center',
    flexDirection:'row',
    marginBottom:10,
  },
  container:{

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
        paddingBottom:15,
    },
    headerText:{
      textAlign:'center',
      marginTop:15,
      color:'white',
    },
    inputView: {
      margin:10,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    caption:{
      textAlign:'right',
      paddingHorizontal:30,
    },
    /*
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width:'90%',
      height:'70%',
    }, */
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
      width: 370,
      height:500,
    },
    imagesList: {
        marginHorizontal:30,
        marginTop:15,
        backgroundColor:"color-primary-transparent-100",
        padding:4,
        borderRadius: 20,
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
        margin: 8,
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