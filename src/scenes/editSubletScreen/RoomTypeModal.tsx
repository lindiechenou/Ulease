import React, {useEffect, useState} from 'react';

import { Modal,  View } from "react-native";
import {Button, Radio, RadioGroup, ButtonGroup, Text, StyleService, useStyleSheet} from '@ui-kitten/components';
type Props = {
    roomType:string
    roomTypeModal:boolean
    callbackModal:Function
    callbackCancelModal:Function
  };

export default function RoomTypeModal(props:Props){

    const styles= useStyleSheet(themedStyles);

    const [selectedIndex, setSelectedIndex] = React.useState<number>(props.roomType === 'Shared'? 0:1);

    useEffect(() => {
       setSelectedIndex(props.roomType === 'Shared'? 0:1);
    }, [props])

    const cancel = ( () => {
        setSelectedIndex(props.roomType === 'Shared'? 0:1);
        props.callbackCancelModal(RoomTypeModal)
    }
    )

    const submit = () => {
        console.log("select", selectedIndex)
        if(selectedIndex == 0){
            props.callbackModal('Shared')
        }
        if(selectedIndex == 1){
            props.callbackModal('Private')
        }
    }

    return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.roomTypeModal}
                onRequestClose={() => {
                  cancel()
                }}
            >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.backgroundHeader}>
                      <Text category='s1' style={styles.headerText}>Edit Room Type </Text>
                    </View>
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
    
                    <View style={styles.buttonGroup}>
                      <Button style={styles.button}
                          size='medium'
                          onPress={() => submit()}>
                          submit
                      </Button>
                      <Button
                        size='medium'
                        onPress={() => cancel()}
                        style={styles.button}>cancel
                      </Button>
                    </View>
                  </View>
                </View>  
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
      flexDirection:'row',
      justifyContent:'center'
  },
  headerText:{
    textAlign:'center',
    marginTop:15,
    color:'white',
  },

    checkBoxGroup :{
      margin:20,
      flexDirection:'column',
      justifyContent:'space-evenly'
    },
    checkBox:{
      margin:10,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    genderInfo:{
      marginTop:15,
      alignSelf:'center'
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
      width: 370,
    },
    icon: {
      width: 16,
      height:16,
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
      marginBottom: 15,
      textAlign: "center"
    },
    tooltip:{
      width:'10%',
      height:'10%',
      flexWrap:'wrap'
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
  });