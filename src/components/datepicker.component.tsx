
import React from 'react';
import { RangeCalendar, CalendarRange, StyleService, Button} from '@ui-kitten/components';
import {Text, View,  Modal} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DoneAllIcon } from 'src/scenes/messaging/conversation-list/extra/icon';

type Props = {
  start:Date | undefined,
  end:Date | undefined,
  callbackModal:Function
}
export const DatePicker = ({start, end, callbackModal}:Props) => {
  
  const [range, setRange] = React.useState<CalendarRange<Date>>({startDate:start, endDate:end});

  const minDate = () => {
    const now = new Date();
    return new Date(now.getUTCFullYear()-4, now.getUTCMonth(), now.getUTCDate());

  }
  const done = (nextRange:CalendarRange<Date>) =>{

    callbackModal(nextRange.startDate, nextRange.endDate);
    setRange(nextRange)
  }

  const maxDate = () =>{
    const now = new Date();
    return new Date(now.getUTCFullYear()+4, now.getUTCMonth(), now.getUTCDate());
  }

  return (
    <View style={styles.container}>  
      
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <RangeCalendar
            range={range}
            onSelect={nextRange => done(nextRange)}
            boundingMonth={false}
            min={minDate()}
            max={maxDate()}
          />
          
        </View>
      </View>
    </View>
  );
};
const styles = StyleService.create({
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
  },
  buttonGroup:{
    justifyContent:'center',
    alignContent:'center',
    flexDirection:'row',
    marginBottom:10,
  },
  
  centeredView:{
      justifyContent: "center",
      alignItems: "center",
  },
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
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'column',
    margin:10,
  },
  button:{
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
   text:{
     fontSize:20,
     margin:20,
   }
});
/*import React from "react";
import { StyleSheet, View, Text} from "react-native";
import moment from "moment";
import {Button} from '@ui-kitten/components'
import {BackIcon, ForwardIcon2} from './icons'
import DateRangePicker from "react-native-daterange-picker";

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      displayedDate: moment(),
    };
  }

  setDates = (dates) => {
    this.setState({
      ...dates,
    });
  };


  render() {
    const { startDate, endDate, displayedDate } = this.state;
    return (
      <View style={styles.container}>
        <DateRangePicker
          onChange={this.setDates}
          endDate={endDate}
          startDate={startDate}
          displayedDate={displayedDate}
          monthPrevButton={BackIcon(styles.icon)}
          monthNextButton={ForwardIcon2(styles.icon)}
          presetButtons={true}
          buttonStyle={styles.button}
          backdropStyle={styles.background}
          selectedStyle={styles.button}
          range
        >
          <Text>{startDate}{endDate</Text>
        </DateRangePicker>
        <Button>Done</Button>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
   icon: {
        color:'#8F9BB3',
        width: 20,
        height: 20,
        marginRight:10
      },
      button: {
       backgroundColor:'#177796',
      },
      background:{
        
      }
      
});*/