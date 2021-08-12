import React, {useEffect, useState} from 'react';

import {Alert, Modal, StyleSheet, Pressable, View, TouchableOpacity } from "react-native";
import {Button, CheckBox, ButtonGroup, Text, useStyleSheet, StyleService} from '@ui-kitten/components';
import { AddressInfo } from 'types';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';

type Props = {
  furnished:boolean
  fitness:boolean
  parking:boolean
  pool:boolean
  laundry:boolean
  pets:boolean
  lgbtq:boolean
  amenitiesModal:boolean
  callbackModal:Function
  callbackCancelModal:Function
  };

export default function AmenitiesModal(props:Props){
    
    const styles = useStyleSheet(themedStyles);
    
    const [fitness, setFitness] = React.useState(props.fitness);
    const [furnished, setFurnished] = React.useState(props.furnished);
    const [laundry, setLaundry] = React.useState(props.laundry);
    const [lgbtq, setLGBTQ] = React.useState(props.lgbtq);
    const [parking, setParking] = React.useState(props.parking);
    const [pets, setPets] = React.useState(props.pets);
    const [pool, setPool] = React.useState(props.pool);
   
    useEffect(() => {
      setFitness(props.fitness);
      setFurnished(props.furnished);
      setLaundry(props.laundry);
      setLGBTQ(props.lgbtq);
      setParking(props.parking);
      setPets(props.pets);
      setPool(props.pool);
    }, [props])

    const cancel = ( () => {
      setFitness(props.fitness);
      setFurnished(props.furnished);
      setLaundry(props.laundry);
      setLGBTQ(props.lgbtq);
      setParking(props.parking);
      setPets(props.pets);
      setPool(props.pool);
      props.callbackCancelModal(AmenitiesModal)
    }
    )

    const submit = ( () => {

      props.callbackModal(furnished,
        fitness,
        parking,
        pool,
        laundry,
        pets,
        lgbtq
      )
    })


    return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.amenitiesModal}
                onRequestClose={() => {
                  cancel()
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.backgroundHeader}>
                    <Text category='s1' style={styles.headerText}>Edit Amenities</Text>
                    </View>
                    
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
    header:{
      flexDirection:'row'
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    genderInfo:{
      marginTop:2
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
    buttonGroup:{
      justifyContent:'center',
      alignContent:'center',
      flexDirection:'row',
      marginBottom:10,
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
  });