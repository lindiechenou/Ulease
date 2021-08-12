


import React, {useState, useRef, useEffect} from 'react';
import { View, Alert, Modal, TouchableOpacity, Pressable, ScrollView} from 'react-native';
import { Divider, Icon, Layout, StyleService,  ViewPager, Button, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components';
import {BackIcon, DeleteIcon, ForwardIcon, PersonIcon, PinIcon, HomeIcon, ImageIcon} from '../../../components/icons'
import { ImageResponse, ProfileScreenParamList, ImageRequest, SubleaseInfo, SubleaseResponse, AddressResponse} from 'types';
import { Menu, MenuItem } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import {Walkthrough} from './walkthrough'
import {Location} from './location'
import Availability from './availability';
import Info from './info'
import Amenities from './amenities'
import Images from "./images";
import Description from './description';
type Props = {
    
   cancel:Function
   back:Function
   title:string
};


export const Header = (props:Props) => {
    const styles= useStyleSheet(themedStyles)
    const cancel = ( () => {
        props.cancel()
    })
  
  return(
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
            <Text category='h2' style={styles.headerText}>{props.title}</Text>
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
                        style={styles.menuDisabledIcon}
                        fill='#8F9BB3'
                        name={'clock-outline'}
                        pack='eva'
                    />
                        <Text style={styles.buttonDisabledText} category='s1' >Availability{'\n'}</Text>
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
  );

}
const themedStyles = StyleService.create({
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
      backgroundColor:'white'
      
    },
    pickerError:{
      margin:5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      backgroundColor:'white',
      shadowOpacity: 0.20,
      shadowRadius: 4,
      elevation: 3,
      padding:12,
      borderColor:'red',
      borderWidth:1,
    },
    buttonText:{
      color:'white'
    },
    buttonDisabledText:{
      color:'#8F9BB3',
    },

    iconView:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    error:{
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
      justifyContent:'flex-end',
      alignItems: "center",
      marginTop: 22
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
      padding: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
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
      paddingHorizontal:20,
      paddingTop:10,
      flex:1,
      marginBottom:5,
    },
    modalText: {
      margin:5,
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
          
      }
  });
