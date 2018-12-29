import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import { Navigation } from 'react-native-navigation';
import ActionSheet from 'react-native-actionsheet';
import Colors from '~/constants/colors.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import formatDate from '~/helpers/date-format';
import SaveButton from '~/modules/global/save-button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sections: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  inputField: {
    height: 50,
    paddingBottom: 0,
  },
  picker: {
    height: 50,
    paddingTop: 16,
    paddingBottom: 16,
    color: 'grey',
    opacity: 0.7
  },
  datePickerBtn: {
    marginVertical: 20, padding: 20, alignItems: 'center',
    borderWidth:1,
    borderColor: 'grey',
    borderRadius: 8
  }
});

class DatePickerField extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  state = {
    id: Math.round(new Date().getTime() * Math.random()),
    field: "datepicker",
    label: "",
    type: "default",
    isDateTimePickerVisible: false,
    currentDate: ''
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log(date)
    this.setState({ currentDate: formatDate(date)});
    this._hideDateTimePicker();
  };

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={[{ flex: 1, justifyContent: 'space-between' }]} >
        <View style={styles.sections}>
          <Text>Label</Text>
          <TextInput
            placeholder="Enter Label of Date Picker"
            style={styles.inputField}
            value={this.state.label}
            onChangeText={(label) => this.setState({ label })}
          />
        </View>

        <View style={styles.sections}>
          <Text>Select Default Date</Text>
          <Text style={{ color: '#ccc' }}>By default it will be current date</Text>
          <TouchableOpacity style={styles.datePickerBtn} onPress={this._showDateTimePicker}>
            <Text style={{ color: 'grey' }}>
            {this.state.currentDate || `DatePicker`} </Text>
          </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
        </View>
        <SaveButton onPress={() => this.props.saveField(this.state)}/>
      </ScrollView>
    );
  }
}

DatePickerField.defaultProps = {
}

export default DatePickerField;
