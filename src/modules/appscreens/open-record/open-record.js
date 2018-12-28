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
import Template from '~/helpers/template';
import { iconsMap } from '~/helpers/app-icons';


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
    buttonId === 'CloseRecordModal' && Navigation.dismissModal(this.props.componentId)
    if(buttonId === 'EditRecord') {
      this.setState({ editRecord: !this.state.editRecord});
      
      if (this.state.editRecord) {
        Navigation.mergeOptions(this.props.componentId, {
          topBar: {
            rightButtons: [
              {
                id: 'EditRecord',
                icon: iconsMap['edit-2'],
                color: Colors.primary
              },
            ],
          }
        });
      } else {
        Navigation.mergeOptions(this.props.componentId, {
          topBar: {
            rightButtons: [
              {
                id: 'EditRecord',
                icon: iconsMap['edit-2'],
                color: Colors.primary
              },
              {
                id: 'ShareRecord',
                icon: Platform.OS === 'ios' ? iconsMap['ios-share'] : iconsMap['share-2'],
                color: Colors.primary
              },
            ],
          }
        });
      }
    }
    if(buttonId === 'ShareRecord') {
      console.log(Template(currentForm, currentRecord))
      let opt = {
        html: Template(currentForm, currentRecord),
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
    Object.keys(recordObject).length && this.props.updateRecord({ recordObject, id });
    this.setState({ editRecord: false }, () => {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          rightButtons: [
            {
              id: 'EditRecord',
              icon: iconsMap['edit-2'],
              color: Colors.primary
            },
            {
              id: 'ShareRecord',
              icon: Platform.OS === 'ios' ? iconsMap['ios-share'] : iconsMap['share-2'],
              color: Colors.primary
            },
          ],
        }
      });
    });
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
          data={this.props.currentRecord ? this.props.currentRecord.recordObject : {}}
          model={this.props.currentForm ? this.props.currentForm.formArray : []}
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
