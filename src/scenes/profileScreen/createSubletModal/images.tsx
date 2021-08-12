import React, {useEffect, useState} from 'react';
import {ImageLibraryOptions, launchImageLibrary} from 'react-native-image-picker';

import {Alert, Modal, ImageBackground, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, FlatList } from "react-native";
import {Button, Input, ButtonGroup, Text, StyleService, useStyleSheet, CheckBox, } from '@ui-kitten/components';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import { Layout, RangeDatepicker } from '@ui-kitten/components';
import {DatePicker} from '../../../components/datepicker.component'
import { Pressable,} from 'react-native';
import {  Icon} from '@ui-kitten/components';
import {BackIcon, DeleteIcon, ForwardIcon, PersonIcon, HomeIcon, ImageIcon} from '../../../components/icons'
import { ImageResponse, ImageRequest} from 'types';
import { Menu, MenuItem } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { PropsService } from '@ui-kitten/components/devsupport';
import { UniversityIcon, AvailabilityIcon, PinIcon } from '../../../components/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Panel} from '../../../components/panel.component'
import RNPickerSelect from 'react-native-picker-select';
import { NavigationContext } from '@react-navigation/core';

type Props = {
    cancel:Function;
    next:Function;
    back:Function;
    images:ImageRequest[];
  };

export default function Images(props:Props){
    
    
    const [visible, setVisible] = useState<boolean>(false)
    const styles = useStyleSheet(themedStyles);
    const [error, setError] = React.useState<boolean>(false);
    const [tempID, setTempID] = useState<number>(0);
    const [newImages, setNewImages] = useState<ImageRequest[]>(props.images);
    
    const handleChoosePhoto = () => {
        if(newImages.length >= 10){
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

   
    const cancel = ( () => {
        props.cancel()
    }
    )
    
    const placeDeleteHandler = (id:string) => {
        // delete image
        //if the image wasn't added to the database yet we don't need to do much
        if(id.length <= 2){
          const filteredData = newImages.filter(item => item.id !== id);
          setNewImages(filteredData)
        }
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
                    style={styles.imageIcon}
                    name={'remove'}
                    pack='material'
                    
            />
        </TouchableOpacity>
    </ImageBackground>
      )};
    

    const submit = () => {
        props.next(newImages)
    }
    return(
        <React.Fragment>
             <View style={styles.backgroundHeader}>
                <View style={styles.iconView}>
                  <Pressable onPress={() => {props.back()}}>
                    <Icon
                    style={styles.icon}
                    name={'arrow-back'}
                    />
                    </Pressable>
                    <Pressable onPress={cancel}>
                    <Icon
                    style={styles.icon}
                    name={'close'}
                    pack='material'
                    />
                  </Pressable>        
                   </View>
                    <Text category='h2' style={styles.headerText}>Add some images to your listing </Text>
                    <ScrollView
                    style={{marginTop:10}}
                    horizontal={true}>
                       <TouchableOpacity style={styles.MenuTitle}>
                          <Icon
                              style={styles.menuIcon}
                              fill='white'
                              name={'pin-outline'}
                              pack='eva'
                          />
                            <Text style={styles.buttonText} category='s1' >Location</Text>
                       </TouchableOpacity>
                    
                    <View style={styles.MenuTitle}>
                    <Icon
                        style={styles.menuIcon}
                        fill='white'
                        name={'clock-outline'}
                        pack='eva'
                    />
                        <Text style={styles.buttonPressText} category='s1' >Availability{'\n'}</Text>
                    </View>
                    <View style={styles.MenuTitle}>
                      <Icon
                          style={styles.menuDisabledIcon}
                          fill='#8F9BB3'
                          name={'list-outline'}
                          pack='eva'
                      />
                          <Text style={styles.buttonDisabledText} category='s1' >Description{'\n'}</Text>
                      </View>
                     
                <View style={styles.MenuTitle}>
                    <Icon
                    style={styles.menuDisabledIcon}
                    name={'person-outline'}
                    pack='material'
                    />
                    <Text style={styles.buttonDisabledText} category='s1' >Preferences{'\n'}</Text>
                </View>
                    </ScrollView>
                    </View>
              <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.container}
                  >
                <View style={styles.centeredView}>
                 
                    <View style={styles.contentView}>
                    <Text style={styles.modalText}>Select Images (Choose up to ten)</Text>
                    <FlatList
                        style={styles.imagesList}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={false}
                        data={[ ...newImages, { id: 'add', image:'' }]}
                        renderItem={renderImageItem}
                    /> 
                    <Text style={styles.caption}>{ newImages.length}/10 images selected</Text>
                    
                    <Button style={styles.button}
                        size='medium'
                        onPress={() => submit()}
                        >
                   Next
                    </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </React.Fragment>
  )
}
const themedStyles = StyleService.create({
    imageIcon:{
        margin:-5,
        color:'black',
        backgroundColor:'white',
        overflow:'hidden',
        borderRadius:13,
        width: 26,
        height: 26,
        

       
    },
    caption:{
        textAlign:'right',
        paddingHorizontal:30,
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
    checkView:{
       marginVertical:10,
        paddingVertical:10,
        backgroundColor:'white',
        borderRadius:30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal:10,
        paddingHorizontal:10,
      },
    checkBoxGroup :{
        flexDirection:'row',
        flexWrap:'wrap',
        alignContent:'center',
        paddingHorizontal:20,
        paddingTop:10,
    },
    
    checkBox:{
      width:"50%",
      textAlign:'left',
      marginVertical:10,
    },
    picker:{
        margin:5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        
        shadowOpacity: 0.20,
        shadowRadius: 4,
        elevation: 3,
        padding:12,
        borderColor:'gray',
        borderWidth:1,

      },
      buttonText:{
        color:'white',
        
      },
      buttonPressText:{
        color:'white',
        fontWeight:'bold',
      },
      buttonDisabledText:{
        color:'#8F9BB3',
      },

      iconView:{
        flexDirection:'row',
        justifyContent:'space-between'
      },
      error:{
        color:'red',
        textAlign:'right',
      },
      MenuItem:{
          minHeight:70,
      },
      tab:{
        height:'100%'  
      },

    errorText: {
      margin:5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.20,
      shadowRadius: 4,
      elevation: 3,
      borderColor:'red',
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
      textAlign:'left',
      marginHorizontal:20,
      color:'white',
      flexWrap:'wrap',
      width:'80%'
    },
      container:{
        flex:1
      },
      centeredView: {
        flex: 1,
        
        
      },
      buttonGroup:{
        justifyContent:'flex-end',
        alignContent:'center',
        marginTop:15,
        margin:20,
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
        width:'100%',
        height:'90%'
      },
      button: {
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        margin:10, 
        shadowOpacity: 0.20,
        shadowRadius: 4,
        elevation: 5,
      },
      buttonOpen: {
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 4,
        elevation: 5,
        borderColor:'white'
        
      },
      MenuInfo: {
          flex:1,
          flexDirection:'column',
          justifyContent:'space-around'
      },
      MenuTitle:{
          flexDirection:'row',
          marginHorizontal:5,
          borderColor:'white',
          
      },
      buttonClose: {
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 4,
        elevation: 5,
        
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      CaptionText: {
        textAlign:'right'
      },
      contentView:{
        justifyContent:'center',
        alignContent:'center',
        paddingHorizontal:10,
        paddingTop:10,
        flex:1,
        marginBottom:10,
      },
      modalText: {
        marginHorizontal:30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 4,
        elevation: 3,
      },
      SelectText: {
         
        },
      icon: {
        marginVertical:20,
        color:'black',
        backgroundColor:'white',
        overflow:'hidden',
        borderRadius:13,
        width: 26,
        height: 26,
        marginHorizontal:20,
        },
        menuIcon:{
          color:'white',
          width: 20,
          height: 20,
          marginRight:5
            
        },
        menuDisabledIcon:{
          color:'#8F9BB3',
          width: 20,
          height: 20,
          marginRight:5
            
        },
  date:{
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
    padding:15,
    margin:10,
  },
  
  });