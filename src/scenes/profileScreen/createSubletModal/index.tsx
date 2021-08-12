


import React, {useState, useRef, useEffect} from 'react';
import { View, Alert, Modal, Pressable} from 'react-native';
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
import {UserContext}from '../../../navigations/UserProvider'
type Props = {
    modalVis:boolean
    callbackModal:Function,
    callbackCancelModal:Function,
};




export const CreateSubletModal = (props:Props) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const {postUserSublet} = React.useContext(UserContext)
    const [imageRequest, setImageRequest] = React.useState<ImageRequest[]>([])
    const [sublet, setSublet] = React.useState<SubleaseResponse>({
      id:'',
      address:{
        id:'',
        street:'',
        city:'',
        street2:'',
        state:'',
        zipcode:'',
        latitude:'',
        longitude:'',
      },
      saved_list:[],
      images:[],
      owner:'',
      description:'',
      status:'',
      room_type:'',
      housing_type:'',
      university_choices:'',
      cost_per_month:0,
      num_roomates:0,
      start_lease:'',
      end_lease:'',
      men_allowed:false,
      women_allowed:false,
      nb_other_allowed:false,
      pets_allowed:false, 
      washer_dryer:false,
      is_furnished:false,
      pool_available:false,
      lgbt_friendly: false,
      free_parking:false,
      fitness_center:false,

    });
    
    const styles = useStyleSheet(themedStyles);

    const callbackAvailabilityModal = (startDate:Date, endDate:Date) => {

      const start_lease:string = `${startDate.getUTCFullYear()}-${startDate.getUTCMonth()+1}-${startDate.getUTCDate()}`
      const end_lease:string = `${endDate.getUTCFullYear()}-${endDate.getUTCMonth()+1}-${endDate.getUTCDate()}`
 
      let newSublet:SubleaseResponse = sublet
      newSublet.start_lease = start_lease;
      newSublet.end_lease = end_lease;
      setSublet(newSublet);
  }
  const callbackInfoModal = (price:number, roommates:number, rt:string, ht:string) => {
    let newSublet:SubleaseResponse = sublet;
    newSublet.cost_per_month = price;
    newSublet.num_roomates = roommates;
    newSublet.room_type = rt;
    newSublet.housing_type = ht;
    setSublet(newSublet);
}

    const callbackAmenitiesModal = (furnished:boolean,
      fitness:boolean,
      parking:boolean,
      pool:boolean,
      laundry:boolean,
      pets:boolean,
      lgbtq:boolean,
      men:boolean,
      women:boolean,
      nb:boolean) => {
        let newSublet:SubleaseResponse = sublet;
        newSublet.is_furnished = furnished;
        newSublet.fitness_center = fitness;
        newSublet.free_parking = parking;
        newSublet.pool_available = pool;
        newSublet.washer_dryer = laundry;
        newSublet.pets_allowed = pets;
        newSublet.lgbt_friendly = lgbtq;
        newSublet.men_allowed = men;
        newSublet.women_allowed = women;
        newSublet.nb_other_allowed = nb;

        setSublet(newSublet);
        
      }
    const callbackAddressModal = (street:string, street2:string, city:string, state:string, zipcode:string, university:string) => {
     
          const address = {
              id:'',
              latitude:null,
              longitude:null,
              street:street,
              street2:street2,
              city:city,
              state: state,
              zipcode: zipcode,
          }
          let newSublet:SubleaseResponse = sublet
          newSublet.university_choices = university;
          newSublet.address = address;
          setSublet(newSublet)
          
  }
  const callbackDescriptionModal = (description:string) => {
      let newSublet:SubleaseResponse = sublet
      newSublet.description = description;
      setSublet(newSublet)
      props.callbackCancelModal();
      postUserSublet(sublet, imageRequest)
  }

    const next = () => {
        console.log("newSublet next: ", sublet)
        setSelectedIndex(selectedIndex + 1)
    }
    const goBack = () => {
      console.log("newSublet back: ", sublet)
      setSelectedIndex(selectedIndex - 1)
  }
  
   
    const cancel = ( () => {
        Alert.alert(
            "Cancel",
            "Are you sure you don't want to create your listing?",
            [
                
                  { text: "Yes, I'm sure", 
                  style: 'default',
                  onPress: () => {
                      
                    props.callbackCancelModal();
                  }
                },
                {
                    text: "No, take me back",
                    style: "cancel"
                },
            ]
        )
        
    }
    )
    const callbackImageResponse = (images: ImageRequest[]) => {
      setImageRequest(images)
      console.log("images: ", images)
      next()

    }
    const start =(s:string):(Date | undefined) => {
      if(s == ''){
        return undefined
      }else{
        return new Date(s)
      }

    }
    const end =(s:string):(Date | undefined) => {
      if(s == ''){
        return undefined;
      }else{
        const end = new Date(s);
        end.setHours(end.getHours()+12);
        return end;
      }

    }
    
    
    return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVis}
                onRequestClose={() => {
                  cancel()
                }}
            >
                
              
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {selectedIndex == 0 && 
                        <Walkthrough next={next} cancel={cancel}/>
                    }
                    {selectedIndex == 1 &&
                        <Location university={sublet.university_choices} address={sublet.address} back={goBack} callbackModal={callbackAddressModal} next={next} cancel={cancel}/>
                    }
                     {selectedIndex == 2 &&
                        <Availability start_date={start(sublet.start_lease)} end_date={end(sublet.end_lease)} back={goBack} next={next} callbackModal={callbackAvailabilityModal} cancel={cancel}/>
                    }
                     {selectedIndex == 3 &&
                       <Info housingType={sublet.housing_type} roommates={sublet.num_roomates} roomType={sublet.room_type} price={sublet.cost_per_month} back={goBack} callbackModal={callbackInfoModal} next={next} cancel={cancel}/>
                    }
                    {selectedIndex == 4 &&
                       <Amenities nb={sublet.nb_other_allowed} women={sublet.women_allowed} men={sublet.men_allowed} furnished={sublet.is_furnished} fitness={sublet.fitness_center} parking={sublet.free_parking} pool={sublet.pool_available} laundry={sublet.washer_dryer} pets={sublet.pets_allowed} lgbtq={sublet.lgbt_friendly} back={goBack} next={next} callbackModal={callbackAmenitiesModal} cancel={cancel}/>
                    }
                    {selectedIndex == 5 &&
                       <Images images={imageRequest} back={goBack} next={callbackImageResponse} cancel={cancel}/>
                    }
                    {selectedIndex == 6 &&
                       <Description description={sublet.description} back={goBack} submit={callbackDescriptionModal} cancel={cancel}/>
                    }
                    
                </View>
                </View>
            </Modal>
  )
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
    flexWrap:'wrap'
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
      justifyContent:'center',
      alignContent:'center',
      flexDirection:'row',
      marginBottom:10,
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
        marginVertical:15,
        color:'black',
        backgroundColor:'white',
        overflow:'hidden',
        borderRadius:13,
        width: 26,
        height: 26,
      },
  });
    /*
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const shouldLoadComponent = (index) => index === selectedIndex;
    const styles = useStyleSheet(themedStyles);
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={CreateVisible}

        onRequestClose={() => {
          cancel()
        }}
    >

        <ViewPager
            selectedIndex={selectedIndex}
            shouldLoadComponent={shouldLoadComponent}
            onSelect={index => setSelectedIndex(index)}>
            <Layout
            style={styles.tab}
            level='2'>
            <Text category='h5'>USERS</Text>
            </Layout>
            <Layout
            style={styles.tab}
            level='2'>
            <Text category='h5'>ORDERS</Text>
            </Layout>
            <Layout
            style={styles.tab}
            level='2'>
            <Text category='h5'>TRANSACTIONS</Text>
            </Layout>
        </ViewPager>
        </Modal>
        );*/