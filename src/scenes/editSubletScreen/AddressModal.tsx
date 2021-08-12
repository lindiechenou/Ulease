
import React, {useEffect, useState} from 'react';

import {Alert, Platform, KeyboardAvoidingView, Modal, StyleSheet, Pressable, View } from "react-native";
import {Button, Input, ButtonGroup, Text, useStyleSheet, StyleService} from '@ui-kitten/components';
import { AddressInfo, AddressResponse } from 'types';
import {Panel} from '../../components/panel.component'
type Props = {
    address: AddressResponse
    addressModal:boolean
    callbackModal:Function
    callbackCancelModal:Function
  };

export default function AddressModal(props:Props){
    const styles = useStyleSheet(themedStyles);
    const [street, setStreet] = useState<string>(props.address.street)
    const [street2, setStreet2] = useState<string |  null>(props.address.street2)
    const [city, setCity] = useState<string>(props.address.city)
    const [state, setState] = useState<string>(props.address.state)
    const [zipcode, setZipCode] = useState<string>(props.address.zipcode)

    const [streetError, setStreetError] = useState<boolean>(false);
    const [cityError, setCityError] = useState<boolean>(false);
    const [stateError, setStateError] = useState<boolean>(false);
    const [zipError, setZipError] = useState<boolean>(false);
    
    useEffect(() => {
        setStreet(props.address.street)
        setStreet2(props.address.street2)
        setCity(props.address.city)
        setState(props.address.state)
        setZipCode(props.address.zipcode)
        setStreetError(false);
        setCityError(false);
        setStateError(false);
        setZipError(false);
  }, [props])

    const cancel = ( () => {
        setStreet(props.address.street)
        setStreet2(props.address.street2)
        setCity(props.address.city)
        setState(props.address.state)
        setZipCode(props.address.zipcode)
        props.callbackCancelModal(AddressModal)
    }
    )

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

    const getStreet2 = () => {
      if(street2 == null){
        return ''
      }else return street2
    }
    const submit = () => {
      let valid = true;
      if(street.trim() == ''){
        setStreetError(true)
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
      if(valid)
        props.callbackModal(street, street2, city, state, zipcode)
    }
    return(
    
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.addressModal}
                onRequestClose={() => {
                  cancel()
                }}
            >
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.container}
                  >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.backgroundHeader}>
                    <Text category='h6' style={styles.headerText}>Edit Address</Text>
                    </View>
                    <View style={styles.contentView}>
                   
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
                    </View>
                        
                    <View style={styles.buttonGroup}>
                    <Button style={styles.button}
                        size='medium'
                        onPress={() => submit()}>
                        submit
                    </Button>
                    <Button status='primary' 
                    size='medium'
                    onPress={() => cancel()}
                    style={styles.button}>cancel</Button>
                    </View>
                    {(cityError || stateError || streetError || zipError) &&
         
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
                        
                      </Panel>
                      
                      )}
                </View>
                </View>
                
              </KeyboardAvoidingView>
                
            </Modal>
  )
}
const themedStyles = StyleService.create({
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
  error:{
    textAlign:'right',
  },
  headerText:{
    textAlign:'center',
    marginTop:15,
    color:'white',
  },
  buttonGroup:{
    justifyContent:'center',
    alignContent:'center',
    flexDirection:'row'
  },
  contentView:{
    justifyContent:'center',
    alignContent:'center',
    paddingHorizontal:20,
    paddingTop:10,
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
    width: 370,
  },
    container:{
      flex: 1
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
    }
  });