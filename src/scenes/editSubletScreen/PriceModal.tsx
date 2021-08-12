import React, {useEffect, useState} from 'react';

import {Alert, Modal, StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";
import {Button, Input, ButtonGroup, Text, StyleService, useStyleSheet} from '@ui-kitten/components';
import { AddressInfo } from 'types';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';

type Props = {
    price:number
    priceModal:boolean
    callbackModal:Function
    callbackCancelModal:Function
  };

export default function PriceModal(props:Props){
    const styles= useStyleSheet(themedStyles)
    const [price, setPrice] = useState<string>(props.price.toString())

    const cancel = ( () => {
        setPrice(props.price.toString())
        props.callbackCancelModal(PriceModal)
    }
    )
    useEffect(() => {
      setPrice(props.price.toString()) 
    }, [props])


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
      setPrice(newText);
    }
    return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.priceModal}
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
                    <Text category='s1' style={styles.headerText}>Edit Price Per Month</Text>
                    </View>
                    <Input style={styles.inputView}
                         label={evaProps => <Text {...evaProps}>Enter Price</Text>}
                        keyboardType={'number-pad'}
                        value={price}
                        maxLength={4} 
                        onChangeText={nextValue => onChanged(nextValue)}
                    />
                   
                    <View style={styles.buttonGroup}>
                    <Button style={styles.button}
                        size='small'
                        onPress={() => props.callbackModal(Number(price))}>
                        submit
                    </Button>
                    <Button
                    onPress={() => cancel()}
                    style={styles.button}>cancel</Button>
                    </View>
                </View>
                </View>
                </KeyboardAvoidingView>
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
    container: {
      flex:1
    },
    inputView: {
      margin:10,
      paddingVertical:15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.20,
      shadowRadius: 4,
      elevation: 3,
      paddingHorizontal:30,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
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
      width:370,
      height:250,
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
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });