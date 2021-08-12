import React, {useEffect, useRef} from 'react';
import {StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native'; //Step 1
import {upIcon, downIcon} from './icons'
import {Icon } from '@ui-kitten/components'
type Props = {
    title:string,
    children?:React.ReactNode
}
export function  Panel(props:Props){
    const { children} = props;
    const [title, setTitle] = React.useState(props.title);
    const [expanded, setExpanded] = React.useState<boolean>(false)
    const [maxHeight, setMaxHeight] = React.useState(React.Children.toArray(children).filter((child) =>
                React.isValidElement(child),
            ).length  )
    const [minHeight, setMinHeight] = React.useState(30)
    const animation = useRef(new Animated.Value(minHeight)).current;

    useEffect(() => {
        setMaxHeight(React.Children.toArray(children).filter((child) =>
        React.isValidElement(child),
    ).length * 20 )
    })
    function toggle(){
        //Step 1
        let initialValue:number    = expanded? maxHeight + minHeight : minHeight,
            finalValue:number   = expanded? minHeight : maxHeight + minHeight;
    
       setExpanded(!expanded)
    
       animation.setValue(initialValue);  //Step 3
        Animated.spring(     //Step 4
            animation,
            {
                toValue: finalValue,
                useNativeDriver:false,
            }
        ).start();  //Step 5
    }
        //Step 5
        return ( 
            <Animated.View 
            style={[styles.container,{height: animation}]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableHighlight 
                        onPress={toggle}
                        style={styles.button} 
                        underlayColor="#f1f1f1">
                    
                    {expanded ?  <Icon style={styles.icon} name='arrow-circle-up-outline'/> : <Icon style={styles.icon} name='arrow-circle-down-outline'/>}
                    </TouchableHighlight>
                </View>
                
                <View style={styles.body}>
                    {children}
                </View>

            </Animated.View>
        );
    }
var styles = StyleSheet.create({
    icon: {
        width: 20,
        height:20, 
        marginHorizontal:10,
        marginTop:5,
      },
    container   : {
        backgroundColor: '#fff',
        padding:1,
        overflow:'hidden',
        borderRadius:30,
        alignContent:'center'
    },
    titleContainer : {
        flexDirection: 'row',
        alignContent:'center',
        justifyContent:'space-between'
    },
    title       : {
        color   :'#2a2f43',
        fontWeight:'bold',
        marginLeft:20,
        marginTop:5,
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0,
        
    }
});