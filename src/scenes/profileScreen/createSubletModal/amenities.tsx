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
    next:Function;
    back:Function;
    callbackModal:Function;
    furnished:boolean
    fitness:boolean
    parking:boolean
    pool:boolean
    laundry:boolean
    pets:boolean
    lgbtq:boolean
    men:boolean;
    women:boolean;
    nb:boolean
  };

export default function Availability(props:Props){
    
    
    const [visible, setVisible] = useState<boolean>(false)
    const styles = useStyleSheet(themedStyles);
    const [error, setError] = React.useState<boolean>(false);

      
    const [fitness, setFitness] = React.useState(props.fitness);
    const [furnished, setFurnished] = React.useState(props.furnished);
    const [laundry, setLaundry] = React.useState(props.laundry);
    const [lgbtq, setLGBTQ] = React.useState(props.lgbtq);
    const [parking, setParking] = React.useState(props.parking);
    const [pets, setPets] = React.useState(props.pets);
    const [pool, setPool] = React.useState(props.pool);
    
    const [men, setMen] = React.useState(props.men);
    const [women, setWomen] = React.useState(props.women);
    const [nb, setNB] = React.useState(props.nb);

    const formatDate = (date:Date | undefined):string => {
      //console.log("start", start, "end ", end)
      if(date != undefined){
        return `${date.getUTCMonth()+1}/${date.getUTCDate()}/${date.getUTCFullYear()}`
      }else{
        return '...'
      }
    }
    const cancel = ( () => {
        props.cancel()
    }
    )
    

    const submit = () => {
        props.callbackModal( furnished,
          fitness,
          parking,
          pool,
          laundry,
          pets,
          lgbtq,
          men,
          women,
          nb)
        props.next()
    }
    return(
        <React.Fragment>
              <Header 
                    
                    title={'Select all that apply to your listing'} 
                    cancel={props.cancel} back={props.back} 
                    
                />
              <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.container}
                  >
                <View style={styles.centeredView}>
                 
                    <View style={styles.contentView}>
                    <View style={styles.checkView}>
                    <Text category='s1' >What Amenities does this listing have? (Select all that apply)</Text>
                    
                    <View style={styles.checkBoxGroup}>
                      <CheckBox style={styles.checkBox}
                        checked={fitness}
                        onChange={nextChecked => setFitness(nextChecked)}>
                        {`Fitness Center`}
                      </CheckBox>

                      <CheckBox style={styles.checkBox}
                        checked={furnished}
                        onChange={nextChecked => setFurnished(nextChecked)}>
                        {`Furnished`}
                      </CheckBox>

                      <CheckBox style={styles.checkBox}
                        checked={laundry}
                        onChange={nextChecked => setLaundry(nextChecked)}>
                        {`Laundry`}
                      </CheckBox>
                     
                      <CheckBox style={styles.checkBox}
                        checked={lgbtq}
                        onChange={nextChecked => setLGBTQ(nextChecked)}>
                        {`LGBTQ+ Friendly`}
                      </CheckBox>

                      <CheckBox style={styles.checkBox}
                        checked={parking}
                        onChange={nextChecked => setParking(nextChecked)}>
                        {`Parking`}
                      </CheckBox>

                      <CheckBox style={styles.checkBox}
                        checked={pets}
                        onChange={nextChecked => setPets(nextChecked)}>
                        {`Pet Friendly`}
                      </CheckBox>

                      <CheckBox style={styles.checkBox}
                        checked={pool}
                        onChange={nextChecked => setPool(nextChecked)}>
                        {`Pool`}
                      </CheckBox>
                    </View>
                    </View>
                    
                    <View style={styles.checkView}>
                      <Text category='s1' >Does this listing have any gender preferences? (Select all that apply)</Text>
                   
                    <View style={styles.checkBoxGroup}>
                      <CheckBox style={styles.checkBox}
                        checked={men}
                        onChange={nextChecked => setMen(nextChecked)}>
                        {`Men`}
                      </CheckBox>

                      <CheckBox style={styles.checkBox}
                        checked={women}
                        onChange={nextChecked => setWomen(nextChecked)}>
                        {`Women`}
                      </CheckBox>

                      <CheckBox style={styles.checkBox}
                        checked={nb}
                        onChange={nextChecked => setNB(nextChecked)}>
                        {`Non-Binary`}
                      </CheckBox>
                    </View>
                </View>
                    
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
        justifyContent:'center',
        alignContent:'center',
        paddingHorizontal:10,
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