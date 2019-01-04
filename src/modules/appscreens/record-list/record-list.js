import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
FlatList,
Alert,
ActivityIndicator
} from 'react-native';
 
import {Navigation} from 'react-native-navigation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  loading: {
    backgroundColor: '#fff'
  }
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
    activityIndicator: false,
    errorMsg: 'Enter name of the record to be created'
  }

  get model() {
    return this.props.records && this.props.records.records.filter(item => this.props.currentForm ? item.formId === this.props.currentForm.id : item) 
  }   

  get updatedForm() {
    const { forms, currentForm } = this.props;
    return forms.forms.find(item => item.id === currentForm.id);
  }

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'EditForm' && goCreateFormPage(this.props.componentId, this.updatedForm);
    buttonId === 'AddRecord' && this.setState({ isDialogVisible: true });
  }

  createRecord = () => {
    const { recordName, counter } = this.state;
    const { records } = this.props.records;
    const nameValidation = records.length && records.some(item => item.recordName === recordName);

    if (!nameValidation && recordName) {
      this.setState({ isDialogVisible: false, activityIndicator: true }, () => {
        let newRecord = {
          recordName,
          recordObject: {},
          formId: this.props.currentForm ? this.props.currentForm.id : '',
          id: Math.round(new Date().getTime() * Math.random()),
          createdAt: Date.now()
        };
        this.props.createRecord(newRecord); 
        // push a new form object
        setTimeout(() => {
          this.setState({ activityIndicator: false})
          goCreateRecordPage(this.props.componentId, this.updatedForm, newRecord)
        }, 500);
      });
    } else {
      this.setState({ errorMsg: '*This record name already exists*' });
    }
  }

  openRecord = item => {
    goOpenRecord(this.props.componentId, this.updatedForm, item);
  }

  editEntry = currentRecord => {
    goCreateRecordPage(this.props.componentId, this.props.currentForm, currentRecord);
    this.state.edit && this.setState({ edit: false });

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
        leftEle={(<MaterialCommunityIcons name="playlist-edit" size={30} color={Colors.lightText}/>)}
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
          <Text style={{ color: Colors.lightText }}>No Records Found</Text>
          <Text style={{ color: Colors.lightText }}>Press + to create a new Record</Text>
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
        {
          this.state.activityIndicator ? (
              <ActivityIndicator style={styles.loading} size="small" />
          ): null
        }
        
        {this.recordList()}

        <Dialog.Container visible={this.state.isDialogVisible}>
          <Dialog.Title>New Record Name</Dialog.Title>
          <Dialog.Description>
            {this.state.errorMsg}
          </Dialog.Description>
          <Dialog.Input autoFocus={true} onChangeText={(recordName) => this.setState({ recordName })} />
          <Dialog.Button
            label="Cancel"
            style={{ color: Colors.topBar }}
            onPress={() => this.setState({ isDialogVisible: false, errorMsg: 'Enter name of the record to be created' })}
          />
          <Dialog.Button style={{ color: Colors.topBar }} label="Create" onPress={this.createRecord} />
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
