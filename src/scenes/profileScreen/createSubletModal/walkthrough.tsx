

import React, {useState, useRef, useEffect} from 'react';
import { View, Alert, Modal, Pressable} from 'react-native';
import { Divider, Icon, Layout, StyleService,  ViewPager, Button, Text, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components';
import {BackIcon, DeleteIcon, ForwardIcon, PersonIcon, PinIcon, HomeIcon, ImageIcon} from '../../../components/icons'
import { ImageResponse, ProfileScreenParamList, ImageRequest} from 'types';
import { Menu, MenuItem } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { PropsService } from '@ui-kitten/components/devsupport';

type Props = {
    cancel:Function
    next:Function
}

export const Walkthrough = (props:Props) => {
    const styles = useStyleSheet(themedStyles);
    

    const PreferenceTitle = () =>{
        return(
            <View style={styles.MenuInfo}>
                <View style={styles.MenuTitle}>
                    <Icon
                    style={styles.menuIcon}
                    name={'person-outline'}
                    pack='material'
                    />
                    <Text category='s1' >Leaser Preferences{'\n'}</Text>
                </View>
            </View>
            )

        }
    
    const cancel = ( () => {
            props.cancel()
    }
    )



    const DescriptionTitle = () =>{

        return(
            <View style={styles.MenuInfo}>
                <View style={styles.MenuTitle}>
                <Icon
                    style={styles.menuIcon}
                    fill='#8F9BB3'
                    name={'list-outline'}
                    pack='eva'
                />
                    <Text category='s1' >Lease Description{'\n'}</Text>
                </View>
               
                </View>
            )

    }
    const AvailabilityTitle = () =>{

        return(
            <View style={styles.MenuInfo}>
                <View style={styles.MenuTitle}>
                <Icon
                    style={styles.menuIcon}
                    fill='#8F9BB3'
                    name={'clock-outline'}
                    pack='eva'
                />
                    <Text category='s1' >Availability{'\n'}</Text>
                </View>
               
                </View>
            )

    }

    const LocationTitle = ()=> {
       
        return (
    
        <View style={styles.MenuInfo}>
                <View style={styles.MenuTitle}>
                <Icon
                    style={styles.menuIcon}
                    fill='#8F9BB3'
                    name={'pin-outline'}
                    pack='eva'
                />
                    <Text category='s1' >Location{'\n'}</Text>
                </View>
                </View>
     )}
     const CostTitle = () =>{
      
      return(
      <View style={styles.MenuInfo}>
          <View style={styles.MenuTitle}>
              <Icon
              style={styles.menuIcon}
              fill='#8F9BB3'
              name={'pricetags-outline'}
              pack='eva'
              />
              <Text category='s1' >Lease Details{'\n'}</Text>
          </View>
        </View>
      )
  }
  const AmenitiesTitle = ()=> {
       
    return(
      <View style={styles.MenuInfo}>
          <View style={styles.MenuTitle}>
              <Icon
              style={styles.menuIcon}
              fill='#8F9BB3'
              name={'home-outline'}
              pack='eva'
              />
              <Text category='s1' >Amenities{'\n'}</Text>
          </View>
      </View>
      )
}
const ImagesTitle = ()=> {
 
  return (
  <View style={styles.MenuInfo}>
          <View style={styles.MenuTitle}>
              <Icon
              style={styles.menuIcon}
              fill='#8F9BB3'
              name={'image-outline'}
              pack='eva'
              />
              <Text category='s1' >Images{'\n'}</Text>
          </View>
      </View>
)
  }

    
    
    return(
        <React.Fragment>
        <View style={styles.backgroundHeader}>
                    <Text category='h1' style={styles.headerText}>Let's walk you through your new listing</Text>
                    <Pressable onPress={cancel}>
                    <Icon
                    style={styles.icon}
                    name={'close'}
                    pack='material'
                    />
                    </Pressable>
                    </View>
                    <View style={styles.contentView}>
                        <Text category='h6'>You will need...</Text>
                        <Menu>
                            <MenuItem style={styles.MenuItem} title={()=> LocationTitle()} />
                            <MenuItem style={styles.MenuItem} title={()=>AvailabilityTitle()}/>
                            <MenuItem style={styles.MenuItem} title={()=>CostTitle()}/>
                            <MenuItem style={styles.MenuItem} title={()=>AmenitiesTitle()}/>
                            <MenuItem style={styles.MenuItem} title={()=>ImagesTitle()}/>
                            <MenuItem style={styles.MenuItem} title={()=>DescriptionTitle()}/>
                            
                            
                        </Menu>
                    <View style={styles.buttonGroup}>
                    <Button style={styles.button}
                        onPress={() => {props.next()}}
                        size='medium'
                        >
                    I'm ready!
                    </Button>
                    
                    </View>
                    </View>
            </React.Fragment>

    );
}
const themedStyles = StyleService.create({
    MenuItem:{
        minHeight:70,
    },
    tab:{
      height:'100%'  
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
      flexDirection:'row',
      
  },
  headerText:{
    textAlign:'left',
    margin:15,
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
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    MenuInfo: {
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around'
    },
    MenuTitle:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    buttonClose: {
      backgroundColor: "#2196F3",
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
    icon: {
        marginVertical:20,
        color:'black',
        backgroundColor:'white',
        overflow:'hidden',
        borderRadius:13,
        width: 26,
        height: 26,
      },
      menuIcon:{
        color:'#8F9BB3',
        width: 20,
        height: 20,
        marginRight:15
          
      }
  });
