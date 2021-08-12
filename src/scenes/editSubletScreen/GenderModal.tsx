import React, {useEffect, useState} from 'react';

import {Alert, Modal, StyleSheet, Pressable, View, TouchableOpacity } from "react-native";
import {Button, CheckBox, ButtonGroup, Text, Tooltip, Icon, StyleService, useStyleSheet} from '@ui-kitten/components';
import { AddressInfo } from 'types';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';

type Props = {
    men:boolean,
    women:boolean,
    nb:boolean,
    genderModal:boolean
    callbackModal:Function
    callbackCancelModal:Function
  };

export default function GenderModal(props:Props){

    const styles= useStyleSheet(themedStyles);
    const [men, setMen] = React.useState(props.men);
    const [women, setWomen] = React.useState(props.women);
    const [nb, setNB] = React.useState(props.nb);
    const [infoVisible, setInfoVisible] = React.useState<boolean>(false)
   
    useEffect(() => {
      setMen(props.men)
      setWomen(props.women)
      setNB(props.nb)
    }, [props])

    const cancel = ( () => {
        setMen(props.men)
        setWomen(props.women)
        setNB(props.nb)
        props.callbackCancelModal(GenderModal)
    }
    )

    const submit = ( () => {
      props.callbackModal(men, women, nb)
    })

    return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.genderModal}
                onRequestClose={() => {
                  cancel()
                }}
            >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.backgroundHeader}>
                      <Text category='s1' style={styles.headerText}>Edit Gender Preferences </Text>
                    </View>
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