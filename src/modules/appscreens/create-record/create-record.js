import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet'

import { Navigation } from 'react-native-navigation';
import Colors from '~/constants/colors.js';
import { updateRecord } from '~/actions/records';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DynamicForm from '~/modules/components/dynamic-form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
class CreateRecord extends React.Component {
  constructor(props){
    super(props)
  }
  
  state = {
    recordObject: {}
  }

  updateRecord = (recordProperty) => {
    this.setState(prevState => ({
      recordObject: {
        ...prevState.recordObject,
        ...recordProperty
      }
    }),() => {
      console.log(this.state)
    });

  }

  handleSaveRecord = () => {
    const { id } = this.props.currentRecord;
    const { recordObject } = this.state;

    this.props.updateRecord({ recordObject, id });
    Navigation.pop(this.props.componentId);
  }


  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <DynamicForm
          title="Dynamic Form"
          model={this.props.currentForm.formArray}
          edit={true}
          updateRecord={this.updateRecord}
        />
        <TouchableOpacity style={styles.btn} onPress={this.handleSaveRecord}>
          <Text style={styles.btnText}>Save Record</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

CreateRecord.defaultProps = {
}

function mapStateToProps(state) {
  return {
    records: state.records,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateRecord
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecord);
