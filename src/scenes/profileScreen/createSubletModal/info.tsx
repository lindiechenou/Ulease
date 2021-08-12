import React, {useEffect, useState} from 'react';

import {  ScrollView, Pressable, TouchableOpacity} from 'react-native';
import { Icon } from '@ui-kitten/components';
import {Alert, Modal, StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";
import {Button, Input, ButtonGroup, Text, StyleService, useStyleSheet, Radio, RadioGroup} from '@ui-kitten/components';
import { AddressInfo } from 'types';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import {Panel} from '../../../components/panel.component'
import {Header} from './header.component'
type Props = {
    cancel:Function;
    next:Function;
    back:Function;
    callbackModal:Function;
    price:number
    roomType:string
    housingType:string
    roommates:number
  };

export default function PriceModal(props:Props){
    const styles= useStyleSheet(themedStyles)
    const [price, setPrice] = useState<string>(props.price.toString())
    const [selectedIndex, setSelectedIndex] = React.useState<number>(props.roomType === 'Shared'? 0:1);
    const [selectedIndexHT, setHTSelectedIndex] = React.useState<number>(props.roomType === 'House'? 0:1);
    const cancel = ( () => {
        props.cancel()
    }
    )
    
    const [roommates, setRoommates] = useState<string>(props.roommates.toString())
    const [priceError, setPriceError] = useState<boolean>(false);
    const [roommatesError, setRoommatesError] = useState<boolean>(false);

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
    const onChangedRoomate = (text:string) =>{
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
      setRoommates(newText);
    }

    const submit = () => {
      let valid = true;
      let ht:string = '';
      let rt:string = '';
      console.log("submit")
      if(selectedIndex == 0){
          rt = 'Shared'
      }
      if(selectedIndex == 1){
         rt='Private'
      }
      if(selectedIndexHT == 0){
        ht='House'
      }
      if(selectedIndexHT == 1){
        ht='Apartment'
      }
      if(price.trim() == ''){
        valid = false;
        setPriceError(true)
        console.log("price error")
      }
      if(roommates.trim() == ''){
        valid = false;
        setRoommatesError(true);
      }
      if(valid){
        props.callbackModal(Number(price), Number(roommates), rt, ht )
        props.next()
      }

  }



    return(
        <React.Fragment>
            <Header 
                    
                    title={'Next, fill out some leasing details'} 
                    cancel={props.cancel} back={props.back} 
                    
                    />
              <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.container}
                  >
                <View style={styles.centeredView}>
                 
                    <Input style={priceError ? styles.errorView : styles.inputView}
                         label={evaProps => <Text {...evaProps}>Enter Price Per Month</Text>}
                        keyboardType={'number-pad'}
                        value={price}
                        maxLength={4} 
                        onChangeText={nextValue => {
                          setPriceError(false)
                          onChanged(nextValue)}
                        }
                    />
                    <Input style={roommatesError ? styles.errorView : styles.inputView}
                         label={evaProps => <Text {...evaProps}>Enter Number of Roommates</Text>}
                        keyboardType={'number-pad'}
                        value={roommates}
                        maxLength={2} 
                        onChangeText={nextValue => { 
                          setRoommatesError(false)
                          onChangedRoomate(nextValue)}
    }
                    />
                    
                    <View style={styles.checkView}>
                    <Text category='s1' style={styles.label}>Choose Room Type </Text>
                    <View style={styles.checkBoxGroup}>
                    <RadioGroup
                        selectedIndex={selectedIndex}
                        onChange={index => setSelectedIndex(index)}>
                      <Radio style={styles.checkBox}>
                        {'Shared - the student will share a room with others'}
                      </Radio>

                      <Radio style={styles.checkBox}>
                        {'Private - the student will get their own room'}
                      </Radio>
                      </RadioGroup>
                      </View>
                      </View>
                    <View style={styles.checkView}>
                      <Text category='s1' style={styles.label}>Choose Housing Type </Text>
                      
                      <View style={styles.checkBoxGroup}>
                      <RadioGroup
                          selectedIndex={selectedIndexHT}
                          onChange={index => setHTSelectedIndex(index)}>
                        <Radio style={styles.checkBox}>
                          {'House'}
                        </Radio>

                        <Radio style={styles.checkBox}>
                          {'Apartment'}
                        </Radio>
                        </RadioGroup>
                        </View>
                    </View>
                    <View style={styles.buttonGroup}>
                    <Button style={styles.button}
                        size='medium'
                        onPress={() => {submit()}}
                        >
                      Next
                    </Button>
                    {( priceError || roommatesError) &&
         
                    (<Panel title={"These fields are required..."}>
                        {roommatesError && (
                          <Text style={styles.error}>Number of Roommates is required</Text>)
                        }
                        {priceError && (
                          <Text style={styles.error}>Cost per Month is required</Text>)
                        }
                        
                      
                    </Panel>
                    )}
                    </View>
                    
                </View>
                </KeyboardAvoidingView>
                </React.Fragment>
  )
}
const themedStyles = StyleService.create({
          error:{
            textAlign:'right',
          },
  label:{
    margin:10,
    marginHorizontal:15,
  },
  checkBoxGroup :{
    flexDirection:'column',
  },
  checkBox:{
    margin:10,
  },
  buttonGroup:{
    justifyContent:'flex-end',
    alignContent:'center',
    marginTop:15,
    margin:20,
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
      width:'80%',
    },
    container: {
      flex:1
    },
    inputView: {
      
      paddingVertical:5,
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
    errorView:{
      paddingVertical:5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.20,
      shadowRadius: 4,
      elevation: 3,
      paddingHorizontal:30,
      borderColor:'red'

    },
    centeredView: {
        justifyContent:'center',
        alignContent:'center',
        flex:1,
    },
    
    
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    checkView:{
       
      marginVertical:5,
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
      marginHorizontal:25,
      paddingHorizontal:10,
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
      MenuTitle:{
        flexDirection:'row',
        marginHorizontal:5,
        borderColor:'white',
        
    },

  });