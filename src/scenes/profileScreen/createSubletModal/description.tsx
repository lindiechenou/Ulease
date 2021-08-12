import React, {useEffect, useState} from 'react';

import {Alert, Modal, StyleSheet, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity } from "react-native";
import {Button, Input, ButtonGroup, Text, StyleService, useStyleSheet, CheckBox, } from '@ui-kitten/components';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import { Layout, RangeDatepicker } from '@ui-kitten/components';
import {DatePicker} from '../../../components/datepicker.component'
import { Pressable,} from 'react-native';
import {  Icon} from '@ui-kitten/components';
import {BackIcon, DeleteIcon, ForwardIcon, PersonIcon, HomeIcon, ImageIcon} from '../../../components/icons'
import { UniParams} from 'types';
import { Menu, MenuItem } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { PropsService } from '@ui-kitten/components/devsupport';
import { UniversityIcon, AvailabilityIcon, PinIcon } from '../../../components/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Panel} from '../../../components/panel.component'
import RNPickerSelect from 'react-native-picker-select';
import { NavigationContext } from '@react-navigation/core';
import {Header} from './header.component'
type Props = {
    cancel:Function;
    submit:Function;
    back:Function;
    description:string
  };

export default function Description(props:Props){
    
    
    const [visible, setVisible] = useState<boolean>(false)
    const styles = useStyleSheet(themedStyles);
    const [error, setError] = React.useState<boolean>(false);

      
    const [description, setDescription] = React.useState(props.description);
  
    const cancel = ( () => {
        props.cancel()
    }
    )
    

    const submit = () => {
      if(description.trim() == ''){
        setError(true);
        return
      }
        props.submit(description)
    }
    return(
        <React.Fragment>
             <Header 
                    
                    title={'Please provide a brief description of your listing'} 
                    cancel={props.cancel} back={props.back} 
                    
                />
              <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.container}
                  >
                <View style={styles.centeredView}>
                 
                    <View style={styles.contentView}>
                    <Input style={styles.modalText}
                        label={evaProps => <Text {...evaProps}>Description</Text>}
                        multiline={true}
                        numberOfLines={16}
                        maxLength={500}
                        caption={evaProps => <Text {...evaProps}>Max 500 characters {description.length}/500</Text>}
                        value={description}
                        onChangeText={nextValue => {
                          setError(false)
                          setDescription(nextValue)}}

                    />
                {error &&
                <Text style={{color:'red'}}>Please provide a brief description of your listing</Text>}
                   
                    
                    <Button style={styles.button}
                        size='medium'
                        onPress={() => submit()}
                        >
                   Finish
                    </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </React.Fragment>
  )
}
const themedStyles = StyleService.create({
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
      width:'70%'
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
        paddingHorizontal:10,
        paddingTop:10,
        flex:1
      },
      modalText: {
        margin:10,
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