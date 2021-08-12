

import React, {useState, useRef, useEffect} from 'react';
import { View, Alert, Modal, ScrollView, Pressable, Platform} from 'react-native';
import { Input, Icon, Select, IndexPath,  Layout, StyleService,  ViewPager, Button, Text, SelectItem, TopNavigation, TopNavigationAction, useStyleSheet } from '@ui-kitten/components';
import {BackIcon, DeleteIcon, ForwardIcon, PersonIcon, HomeIcon, ImageIcon} from '../../../components/icons'
import { AddressInfo, AddressResponse, UniParams} from 'types';
import { Menu, MenuItem } from '@ui-kitten/components';
import { StackNavigationProp } from '@react-navigation/stack';
import { PropsService } from '@ui-kitten/components/devsupport';
import { UniversityIcon, AvailabilityIcon, PinIcon } from '../../../components/icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Panel} from '../../../components/panel.component'
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {Header} from './header.component'
type Props = {
    cancel:Function;
    callbackModal:Function;
    next:Function;
    back:Function;
    address:AddressResponse
    university:string;
}


const universities:UniParams[] = require('../../../components/universities.json')

export const Location = (props:Props) => {
    const styles = useStyleSheet(themedStyles);
    
    
    const cancel = ( () => {
            props.cancel()
    }
    )
    const [street, setStreet] = useState<string>(props.address.street)
    const [street2, setStreet2] = useState<string |  null>(props.address.street2)
    const [city, setCity] = useState<string>(props.address.city)
    const [state, setState] = useState<string>(props.address.state)
    const [zipcode, setZipCode] = useState<string>(props.address.zipcode)

    //error handling
    const [streetError, setStreetError] = useState<boolean>(false);
    const [cityError, setCityError] = useState<boolean>(false);
    const [stateError, setStateError] = useState<boolean>(false);
    const [zipError, setZipError] = useState<boolean>(false);
    const [universityError, setUniversityError] = useState<boolean>(false);

    
    const [university, setUniversity] = React.useState<string>(props.university)
    

    const onChanged = (text:string) =>{
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                Alert.alert("please enter numbers only");
            }
        }
        setZipCode(newText);
      }
    const renderOption = (item:UniParams, index:number) => (
        {label: item.name, value:item.key}
    );

      
    const getStreet2 = () => {

      if(street2 == null){
        return ''
      }else return street2
    }
    const submit = () => {
      console.log("submit")
      let valid = true;
      if(street.trim() == ''){
        setStreetError(true)
        console.log("street error")
        valid = false

      }
      if(city.trim() == ''){
        setCityError(true)
        valid = false

      }
      if(state.trim() == ''){
        setStateError(true)
        valid = false

      }
      if(zipcode.trim() == ''){
        valid = false
        setZipError(true)
      }
      if(university == null || university.trim() == ''){
        valid = false
        setUniversityError(true)
      }
      const uniname = universities.find( ( {key}:UniParams ) => key.toLowerCase() === university.toLowerCase() )?.name
      if(uniname == undefined){
        valid = false;
        setUniversityError(true)
      }
      if(valid){
        props.callbackModal(street, street2, city, state, zipcode, uniname)
        props.next()
      }
    }

    return(
        <React.Fragment>
                    <Header 
                    
                    title={'Tell us a bit about your leasing location'} 
                    cancel={props.cancel} back={props.back} 
                    
                    />
                    
                    <View style={styles.contentView}>
                    <KeyboardAwareScrollView
                        viewIsInsideTabBar={true}
                        scrollEnabled={(Platform.OS === 'ios')}
                        enableAutomaticScroll={true}
                        extraScrollHeight={50}
                        enableOnAndroid={true}
                        >
                        <Text category='h6' style={styles.modalText}>What is your leasing's address?</Text>
                        <Input style={streetError ? styles.errorText : styles.modalText}
                        label={evaProps => <Text {...evaProps}>Street</Text>}
                        value={street}
                        onChangeText={nextValue => {
                          setStreet(nextValue)
                          setStreetError(false)
                        }}
                    />
                    <Input style={styles.modalText}
                        label={evaProps => <Text {...evaProps}>Street 2</Text>}
                        value={getStreet2()}
                        onChangeText={nextValue => {
                          setStreet2(nextValue)}
                        }
                    />
                    <Input style={cityError ? styles.errorText : styles.modalText}
                        label={evaProps => <Text {...evaProps}>City</Text>}
                        value={city}
                        onChangeText={nextValue => {
                          setCityError(false)
                          setCity(nextValue)
                        }}
                    />
                    <Input style={stateError ? styles.errorText : styles.modalText}
                        label={evaProps => <Text {...evaProps}>State</Text>}
                        value={state}
                        onChangeText={nextValue => {
                          setStateError(false)
                          setState(nextValue)}
                        }
                    />
                    <Input style={zipError ? styles.errorText : styles.modalText}
                        label={evaProps => <Text {...evaProps}>Zipcode</Text>}
                        value={zipcode}
                        keyboardType={'number-pad'}
                        maxLength={5} 
                        onChangeText={nextValue => {
                          setZipError(false)
                          onChanged(nextValue)

                        }}
                        autoCompleteType='postal-code'
                    />
                            <Text category='h6' style={styles.modalText}>Which university is your leasing near?</Text>
                            <View style = {universityError ? styles.pickerError : styles.picker}>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                value={university}
                                onValueChange={value => {
                                  console.log("value: ", value)
                                  setUniversity(value);
                                  setUniversityError(false)
                                }}
                                
                                items={
                                  universities.map(renderOption)
                                }
                            />
                            </View>
                        </KeyboardAwareScrollView>
                    <View style={styles.buttonGroup}>
                    <Button style={styles.button}
                        size='medium'
                        onPress={() => submit()}
                        >
                   Next
                    </Button>
                    {(cityError || stateError || streetError || zipError || universityError) &&
         
                    (<Panel title={"These fields are required..."}>
                      {streetError && (
                          <Text style={styles.error}>Street</Text>)
                        }
                        {stateError && (
                          <Text style={styles.error}>State</Text>)
                        }
                        {cityError && (
                          <Text style={styles.error}>City</Text>
                        )}
                        {zipError && (
                          <Text style={styles.error}>Zipcode</Text>

                        )}
                        {universityError && (
                          <Text style={styles.error}>University</Text>
                          
                        )}
                      
                    </Panel>
                
                )}
                    
                    </View>
                    </View>
            </React.Fragment>

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
        width:'70%'
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
          marginVertical:15,
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
    