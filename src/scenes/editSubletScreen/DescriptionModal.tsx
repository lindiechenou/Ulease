import React, {useEffect, useState} from 'react';

import {Alert, Modal, StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";
import {Button, Input, ButtonGroup, Text, StyleService, useStyleSheet} from '@ui-kitten/components';
import { AddressInfo } from 'types';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';

type Props = {
    description:string
    descriptionModal:boolean
    callbackModal:Function
    callbackCancelModal:Function
  };

export default function DescriptionModal(props:Props){

    const [description, setDescription] = useState<string>(props.description)
    const styles = useStyleSheet(themedStyles);
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
      setDescription(props.description)
    }, [props])
    const cancel = ( () => {
        setDescription(props.description)
        props.callbackCancelModal(DescriptionModal)
    }
    )
    
    return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.descriptionModal}
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
                    <Text category='s1' style={styles.headerText}>Edit Description</Text>
                    </View>
                    <View style={styles.contentView}>
                    <Input style={styles.modalText}
                        label={evaProps => <Text {...evaProps}>Description</Text>}
                        multiline={true}
                        numberOfLines={16}
                        maxLength={500}
                        caption={evaProps => <Text {...evaProps}>Max 500 characters {description.length}/500</Text>}
                        value={description}
                        onChangeText={nextValue => {
                          setError(false)
                          setDescription(nextValue)}}

                    />
                {error &&
                <Text style={{color:'red'}}>Please provide a brief description of your listing</Text>}
                   
                    <View style={styles.buttonGroup}>
                    <Button style={styles.button}
                        size='medium'
                        onPress={() => 
                        
                        {
                          if(description.length == 0){
                            setError(true)
                            return
                          }props.callbackModal(description)}}>
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
      width: 370,
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
    }
  });