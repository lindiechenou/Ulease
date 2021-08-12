import React, {useEffect, useState} from 'react';

import {Alert, Modal, StyleSheet, KeyboardAvoidingView, Platform, View, TouchableOpacity } from "react-native";
import {Button, Input, ButtonGroup, Text, StyleService, useStyleSheet} from '@ui-kitten/components';
import { AddressInfo } from 'types';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import { Layout, RangeDatepicker } from '@ui-kitten/components';
import {DatePicker} from '../../components/datepicker.component'
type Props = {
    start:Date
    end:Date
    availabilityModal:boolean
    callbackModal:Function
    callbackCancelModal:Function
  };

export default function AvailabilityModal(props:Props){
    
    const [start, setStart] = useState<Date>(props.start)
    const [end, setEnd] = useState<Date>(props.end)
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
   
    useEffect(() => {
      setStart(props.start);
      setEnd(props.end);
    }, [props])
    
    const cancel = ( () => {
        setStart(props.start);
        setEnd(props.end);
        setError(false);
        setVisible(false);
        props.callbackCancelModal(AvailabilityModal)
    }
    )
    const submit = () => {
      if(start == undefined || end == undefined){
        setError(true);
        return;
      }
      setVisible(false);
      props.callbackModal(start, end)
    }
    const CallbackDone = ( (start:Date, end:Date) => {
      setError(false)
      setStart(start);
      setEnd(end);
    })
    
    return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.availabilityModal}
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
                    <Text category='s1' style={styles.headerText}>Edit Availability</Text>
                    </View>
                    <View style={styles.contentView}>
                    <TouchableOpacity style={styles.date} onPress={()=> setVisible(!visible)}><Text>From {formatDate(start)} to {formatDate(end)}</Text></TouchableOpacity>
                    {error && (
                    <Text style={styles.error}>please choose a valid date range</Text>
                    )}
                    {visible && (
                      <DatePicker callbackModal={CallbackDone} start={start} end={end}></DatePicker>
                    )}
                    <View style={styles.buttonGroup}>
                    <Button style={styles.button}
                        size='medium'
                        onPress={() => submit()}>
                        submit
                    </Button>
                    <Button
                    size='medium'
                    onPress={() => cancel()}
                    style={styles.button}>cancel</Button>
                    </View>
                    </View>
                </View>
                </View>
                </KeyboardAvoidingView>
            </Modal>
  )
}
const themedStyles = StyleService.create({
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
    color: "red",
    textAlign:'right',
  },
  headerText:{
    textAlign:'center',
    marginTop:15,
    color:'white',
  },
    container:{
      flex:1
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
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
      width:360,
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
      alignContent:'center',
      justifyContent:'center',
      
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
    }
  });