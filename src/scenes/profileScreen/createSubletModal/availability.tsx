import React, {useEffect, useState} from 'react';

import {Alert, Modal, StyleSheet, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity } from "react-native";
import {Button, Input, ButtonGroup, Text, StyleService, useStyleSheet} from '@ui-kitten/components';
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

type Props = {
    cancel:Function;
    next:Function;
    back:Function;
    callbackModal:Function;
    start_date:Date | undefined;
    end_date:Date | undefined;
  };

export default function Availability(props:Props){
    
    const [start, setStart] = useState<Date | undefined>(props.start_date)
    const [end, setEnd] = useState<Date | undefined>(props.end_date)
    
    const [visible, setVisible] = useState<boolean>(false)
    const styles = useStyleSheet(themedStyles);
    const [error, setError] = React.useState<boolean>(false);
    
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
      if(start == undefined || end == undefined){
        setError(true);
        return;
      }
      console.log("start: ", start, "end: ", end)
      setVisible(false);
      
      props.callbackModal(start, end);
      props.next();
    }
    const CallbackDone = ( (start:Date, end:Date) => {
      setError(false)
      setStart(start);
      setEnd(end);
    })
    
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
                    <Text category='h2' style={styles.headerText}>When is your listing available? </Text>
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
                    <TouchableOpacity style={styles.date} onPress={()=> setVisible(!visible)}><Text>From {formatDate(start)} to {formatDate(end)}</Text></TouchableOpacity>
                    {error && (
                    <Text style={styles.error}>please choose a valid date range</Text>
                    )}
                    {visible && (
                      <DatePicker callbackModal={CallbackDone} start={start} end={end}></DatePicker>
                    )}
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