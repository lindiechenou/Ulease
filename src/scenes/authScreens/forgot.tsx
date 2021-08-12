import React from 'react';
import { StyleSheet, View, Alert, Modal } from 'react-native';
import { Button, Input, Text, useStyleSheet, StyleService,  IconProps, Icon} from '@ui-kitten/components';
import { ImageOverlay } from '../../components/image-overlay.component';
import { EmailIcon } from '../../components/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthNavigationParamList } from 'types';
import { resetPassword } from '../../services/subleaseList';
type ForgotPasswordNavigationProp = StackNavigationProp<
 AuthNavigationParamList
>;
type Props = {
  navigation: ForgotPasswordNavigationProp;
}

export const ForgotPasswordScreen = ({ navigation }:Props): React.ReactElement =>{

  const [email, setEmail] = React.useState<string>();
  const [showVerification, setShowVerification] = React.useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);
  const onResetPasswordButtonPress = (): void => {
    if(email == ''){
      Alert.alert("please enter a valid email address");
      return
    }
    resetPassword(email).then(response => {
      if(response == true){
        setShowVerification(true)
      }
    })
    
  };
  const navigateMap = () => {
      navigation.navigate('Login');
    };

  return (
    <KeyboardAvoidingView >
     <ImageOverlay style={styles.container}
        source={require('../../components/ulease.png')}>
      <Text
          style={styles.forgotPasswordLabel}
          category='h4'
          status='control'>
          Forgot Password
        </Text>
        <Text
          style={styles.enterEmailLabel}
          status='control'>
          Please enter your email address. We'll send you a link to get access into your account.
        </Text>
        <View style={styles.formContainer} >
          <Input
            status='control'
            placeholder='Email'
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            accessoryLeft={EmailIcon}
            value={email}
            
            onChangeText={setEmail}
            style={styles.emailInput}
          />
        </View>
        <Button style={styles.resetPasswordButton}
          size='giant'
          onPress={onResetPasswordButtonPress
          }>
          RESET PASSWORD
        </Button>
        <Button
        style={styles.loginButton}
          size='large'
          appearance="ghost"
          status="control"
          onPress={navigateMap
          }>
          LOGIN
      </Button>
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
                    <Text category='s1' style={styles.headerText}>Password Reset Email Sent</Text>
                    </View>
                    <View style={styles.contentView}>
                      <Text style={styles.inlineText}>
                        <Text>An email has been sent to </Text>
                        <Text style={styles.inlineTextBold}>{email}</Text>
                        <Text>. If you do not see an email from us, please check your spam folder.</Text>
                      </Text>
                  <View style={styles.buttonGroup}>
                    <Button style={styles.button}
                        size='medium'
                       
                        onPress={() => setShowVerification(false)}>
                        Done
                    </Button>
                   
                    </View>
                    </View>
                </View>
                </View>
            </Modal>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  inlineTextBold:{
    fontWeight:'bold',
  },
  inlineText:{
    flexDirection:'row',
    lineHeight:20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,

  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 25,
    borderRadius: 30,
    
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
      width: 300,
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
