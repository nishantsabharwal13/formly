import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
FlatList,
Alert
} from 'react-native';
 
import {Navigation} from 'react-native-navigation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchInput from '~/modules/components/search-input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createRecord, deleteRecord } from '~/actions/records';

import { goCreateFormPage, goCreateRecordPage, goOpenRecord } from '~/helpers/navigation';
import Dialog from "react-native-dialog";
import Colors from '../../../constants/colors';

import Card from '~/modules/global/card';
import SubText from '~/modules/global/sub-text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popup: {
    backgroundColor: 'blue',
    opacity: 1,
    zIndex: 2,
  },
  fallbackText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

class RecordList extends React.Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  componentDidAppear() {
    this.state.edit && this.setState({edit: false});
  }

  state = {
    app: "Records",
    isDialogVisible: false,
    recordName: "",
    searchForm: "",
    counter: 1,
    edit:false,
  }

  get model() {
    return this.props.records && this.props.records.records.filter(item => this.props.currentForm ? item.formId === this.props.currentForm.id : item) 
  }   

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'AddRecord' && this.setState({ isDialogVisible: true });

    buttonId === 'EditForm' && goCreateFormPage(this.props.componentId, this.props.currentForm);
  }

  createRecord = () => {
    const { recordName, counter } = this.state;
    const { records } = this.props.records;
    const nameValidation = records.length && records.some(item => item.recordName === recordName);

    this.setState({ isDialogVisible: false }, () => {
      // if (!nameValidation && recordName) {
      let newRecord = {
        recordName,
        recordObject: {},
        formId: this.props.currentForm ? this.props.currentForm.id : '',
        id: Math.round(new Date().getTime() * Math.random()),
        createdAt: Date.now()
      };
      this.props.createRecord(newRecord); // push a new form object
      goCreateRecordPage(this.props.componentId, this.props.currentForm, newRecord)
      // }
    });
  }

  openRecord = item => {
    const updatedForm = this.props.forms.forms.find(item => item.id === this.props.currentForm.id);
    goOpenRecord(this.props.componentId, updatedForm, item);
  }

  editEntry = currentRecord => {
    goCreateRecordPage(this.props.componentId, this.props.currentForm, currentRecord)
  }

  deleteEntry = record => {
    Alert.alert(
      'Are you sure to delete this Record?',
      record.recordName,
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        { text: 'OK', onPress: () => this.props.deleteRecord(record.id) },
      ],
      { cancelable: false }
    )
  }
  recordList = () => {
    const { searchForm } = this.state;
    let {model} = this;

    if (searchForm != '') {
      model = model.filter(item => item.recordName.toLowerCase().includes(searchForm.toLowerCase()));
    }

    let _renderItem = ({ item }) => (
      <Card
        onPress={() => this.openRecord(item)}
        name={item.recordName}
        description={`Created on: ${formatDate(new Date(item.createdAt))}`}
        leftEle={(<Ionicons name="ios-list" size={30} />)}
        edit={this.state.edit}
        editEntry={() => this.editEntry(item)}
        deleteEntry={() => this.deleteEntry(item)}
      />
    );

    let _keyExtractor = (item, key) => `${key}`;

    return model.length ? (
      <FlatList
        data={model}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
    ) : (
        <View style={styles.fallbackText}>
          <Text>No Records Found</Text>
        </View>
      )
  }

  render() {
    const { searchForm } = this.state;

    return (
      <View style={styles.container}>
      
        <SearchInput
          leftEle={(<Ionicons color='grey' name="ios-search" size={20} />)}
          placeholder='Search record by name'
          value={searchForm}
          onChange={searchForm => this.setState({ searchForm })}
        />
        <SubText 
          text="Records"
          filterText={this.state.edit ? 'Unedit' : 'Edit'}
          onPress={() => this.setState({ edit: !this.state.edit })}  
        />
        {this.recordList()}

        <Dialog.Container visible={this.state.isDialogVisible}>
          <Dialog.Title>New Record Name</Dialog.Title>
          <Dialog.Description>
            Enter name of the record to be created
          </Dialog.Description>
          <Dialog.Input onChangeText={(recordName) => this.setState({ recordName })} />
          <Dialog.Button label="Cancel" onPress={() => this.setState({ isDialogVisible: false })} />
          <Dialog.Button label="Create" onPress={this.createRecord} />
        </Dialog.Container>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    records: state.records,
    forms: state.forms,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createRecord,
    deleteRecord
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
