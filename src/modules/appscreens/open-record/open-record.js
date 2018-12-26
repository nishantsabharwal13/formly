import React from 'react';

import {
View,
Text,
Platform,
StyleSheet,
TouchableOpacity,
} from 'react-native';
 
import {Navigation} from 'react-native-navigation';
import { goCreateRecordPage } from '~/helpers/navigation';
import DynamicForm from '~/modules/components/dynamic-form';
import Colors from '~/constants/colors.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRecord } from '~/actions/records';
import SaveButton from '~/modules/global/save-button';
import Share, { ShareSheet, Button } from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
}); 
class OpenRecord extends React.Component {
 
  constructor(props){
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = async ({ buttonId }) => {
    const {componentId, currentForm, currentRecord} = this.props;
    buttonId === 'EditRecord' && this.setState({ editRecord: !this.state.editRecord})
    if(buttonId === 'ShareRecord') {
      let opt = {
        html: `<div>Form Pro</div><div>${currentForm.formName}</div>`,
        fileName: 'test',
        directory: 'Documents',
        base64: Platform.OS === 'ios' ? false : true,
      };

      let file = await RNHTMLtoPDF.convert(opt);
      let options = {    
        title: 'Share Record as PDF via',
        message: 'some message',
        subject: '[IMPORTANT]: Form Pro ',
        url: Platform.OS === 'ios' ? file.filePath : `data:application/pdf;base64,${file.base64}`,
      }
      Share.open(options)
        .then((res) => { console.log(res) })
        .catch((err) => { err && console.log(err); });
      }
  }

  updateRecord = (recordProperty) => {
    this.setState(prevState => ({
      recordObject: {
        ...prevState.recordObject,
        ...recordProperty
      }
    }));
  }

  handleEditForm = () => {
    const { id } = this.props.currentRecord;
    const { recordObject } = this.state;
    
    this.props.updateRecord({ recordObject, id });
    this.setState({ editRecord: false });
  }

  state = {
    editRecord: false,
    recordObject: {}
  }

  render() {
    return (
      <View style={styles.container}>
        <DynamicForm
          title="Dynamic Form"
          data={this.props.currentRecord.recordObject || {}}
          model={this.props.currentForm.formArray}
          edit={this.state.editRecord}
          updateRecord={this.updateRecord}
        />
        {
          this.state.editRecord ? (
            <SaveButton onPress={this.handleEditForm}/>
          ) : null
        }
      </View>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(OpenRecord);
