import React from 'react';
import { StyleSheet, View, Platform, Keyboard, KeyboardAvoidingView, Alert, TouchableWithoutFeedback, Modal } from 'react-native';
import { Button, Input, Text, useStyleSheet, StyleService, IconProps, Icon } from '@ui-kitten/components';
import { ImageOverlay } from '../../components/image-overlay.component';
import { EmailIcon } from '../../components/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthNavigationParamList } from 'types';
import { resetPasswordChange } from '../../services/subleaseList';
import { RouteProp } from '@react-navigation/native';
import {Panel} from '../../components/panel.component'
type ForgotPasswordNavigationProp = StackNavigationProp<
 AuthNavigationParamList, 'Reset'
>;

type ResetScreenRouteProp = RouteProp<AuthNavigationParamList, 'Reset'>;

type Props = {
  navigation: ForgotPasswordNavigationProp;
  route: ResetScreenRouteProp
}


export const ResetScreen = ({ route, navigation }:Props): React.ReactElement =>{

    const [password1, setPassword1] = React.useState<string>('')
    const [password2, setPassword2] = React.useState<string>('')
    const [passwordMatchError, setPasswordMatchError] = React.useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(true);
    const [passwordVisible2, setPasswordVisible2] = React.useState<boolean>(true);
    const {key} = route.params;
    const styles= useStyleSheet(themedStyles)
    const [showVerification, setShowVerification] = React.useState<boolean>(false);

    const renderIcon = (style:IconProps) => (
        <TouchableWithoutFeedback onPress={onPasswordIconPress}>
            <Icon {...style} name={passwordVisible ? 'eye-off' : 'eye'}></Icon>
          </TouchableWithoutFeedback>  )
   
   const renderIcon2 = (style:IconProps) => (
        <TouchableWithoutFeedback onPress={onPasswordIconPress2}>
            <Icon {...style} name={passwordVisible2 ? 'eye-off' : 'eye'}></Icon>
          </TouchableWithoutFeedback>  )

    const onPasswordIconPress2 = (): void => {
        setPasswordVisible2(!passwordVisible2);
      };
      
    const onPasswordIconPress = (): void => {
        setPasswordVisible(!passwordVisible);
    };

  const onResetPasswordButtonPress = (): void => {
    if (password1.trim() === "" || password2.trim() === "") {
        setPasswordMatchError(true)
        return
      } 
    if (password1.trim() != password2.trim()) {
        setPasswordMatchError(true)
        return
    } 
    resetPasswordChange(password1, key).then(response => {
      if(response == true){
        
        setShowVerification(true)
      }
    })
    
    
  };
  const navigateMap = () => {
      navigation.navigate('Login');
    };

  return (
    <KeyboardAvoidingView style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
     <ImageOverlay
        style={styles.container}
        source={require('../../components/ulease.png')}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerView}>

      <Text
          style={styles.forgotPasswordLabel}
          category='h4'
          status='control'>
            Reset Password
        </Text>
        <View style={styles.formContainer}>
       
              <Input
                  style={passwordMatchError ? styles.errorInput : styles.emailInput}
                  label="New Password"
                  autoCapitalize='none'
                  secureTextEntry={passwordVisible}
                  placeholder='Password'
                  status='control'
                  accessoryRight={renderIcon}
                  value={password1}
                  onChangeText={text => {
                    setPassword1(text);
                    setPasswordMatchError(false)
                  }}
              />
        
              <Input
                style={passwordMatchError ? styles.errorInput : styles.emailInput}
                autoCapitalize='none'
                secureTextEntry={passwordVisible2}
                placeholder='Retype Password'
                label="Retype Password"
                accessoryRight={renderIcon2}
                value={password2}
                status='control'
                onChangeText={text => {
                  setPassword2(text);
                  setPasswordMatchError(false)
                }}
              />
              <View style={styles.emailInput}>
          {(passwordMatchError) &&
         
         (<Panel title={"Error..."}>
             {passwordMatchError && (
               <Text style={styles.error}>Password fields must match</Text>
             
           )}
         </Panel>
         
         )}
         </View>
       </View>
       
       <View style={styles.formContainer}>
        <Button style={styles.resetPasswordButton}
          size='giant'
          onPress={onResetPasswordButtonPress
          }>
          Change Password
        </Button>
        <Button
            style={styles.signUpButton}
            appearance="ghost"
            status="control"
            onPress={() =>{
                navigation.navigate('Login')}}
      >
          Back to Login
      </Button>
      </View>
      <Modal
                animationType="slide"
                transparent={true}
                visible={showVerification}
                onRequestClose={() => {
                  setShowVerification(false)
                }}
            >
              
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.backgroundHeader}>
                    <Text category='s1' style={styles.headerText}>Password Reset Confirmed</Text>
                    </View>
                    <View style={styles.contentView}>
                    <Text>Your Password has been successfully reset.</Text>
                    <View style={styles.buttonGroup}>
                    <Button style={styles.button}
                        size='medium'
                        accessoryLeft={(style:IconProps) => <Icon {...style} name={'login'} pack='material'/>}
                        onPress={() => navigation.navigate('Login')}>
                        Back to Login
                    </Button>
                   
                    </View>
                    </View>
                </View>
                </View>
            </Modal>
            </View>
            </TouchableWithoutFeedback>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  error:{
    textAlign:'right',
  },
  innerView: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between"
  },
  errorInput: {
    marginTop: 16,
    borderRadius: 30,
    borderColor:'red'
  },
  container: {
    flex: 1,

  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  formContainer: {

    
  },
  forgotPasswordLabel: {
    zIndex: 1,
    marginTop: 100,
    fontSize: 40,
    color: 'white',
    fontFamily: 'Lobster-Regular', 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textShadowColor: '#177796',
    textAlign:'center',
  },
  enterEmailLabel: {
    zIndex: 1,
    textAlign: 'center',
    marginTop: 64,
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 25,
  },
  resetPasswordButton: {
    marginHorizontal: 14,
    marginVertical: 5,
    borderRadius: 30,
    borderColor:'white',

  },
  loginButton: {
   
      marginHorizontal: 14,
      marginVertical: 5,
      borderRadius: 30,
    
  
  },
  emailInput: {
    borderRadius: 30,
    marginTop:20,
    
  },
  //For the modal:
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
