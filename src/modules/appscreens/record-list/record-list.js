import React from 'react';

import {
View,
Text,
Button,
StyleSheet,
TouchableOpacity,
FlatList,
} from 'react-native';
 
import {Navigation} from 'react-native-navigation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchInput from '~/modules/components/search-input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createRecord } from '~/actions/records';

import { goCreateFormPage, goCreateRecordPage, goOpenRecord } from '~/helpers/navigation';
import Dialog from "react-native-dialog";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  popup: {
    backgroundColor: 'blue',
    opacity: 1,
    zIndex: 2,
  },
  sections: {
    paddingTop: 15,
    flexDirection: 'row',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  recordName: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  recordDescription: {
    fontSize: 10,
    color: 'grey'
  },
  fallbackText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconLeft: {
    paddingHorizontal: 10,
  },
  iconRight: {
    paddingHorizontal: 10,
    marginLeft: 'auto',
  }
});

class RecordList extends React.Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    app: "Records",
    isDialogVisible: false,
    recordName: "",
    searchForm: "",
    counter: 1,
  }

  get model() {
    return this.props.records.records.filter(item => item.formId === this.props.currentForm.id) || this.props.records.records;
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
        formId: this.props.currentForm.id,
        id: Math.round(new Date().getTime() * Math.random()),
        createdAt: Date.now()
      };
      this.props.createRecord(newRecord); // push a new form object
      goCreateRecordPage(this.props.componentId, this.props.currentForm, newRecord)
      // }
    });
  }

  openRecord = item => {
    goOpenRecord(this.props.componentId, this.props.currentForm, item);
  }

  recordList = () => {
    const { searchForm } = this.state;
    let {model} = this;

    if (searchForm != '') {
      model = model.filter(item => item.recordName.toLowerCase().includes(searchForm.toLowerCase()));
    }

    let _renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => this.openRecord(item)} style={styles.sections}>
        <View style={styles.iconLeft}>
          <FontAwesome color='#333'
            name="wpforms"
            size={30}
          />
        </View>
        <View>
          <Text style={styles.recordName}>{item.recordName}</Text>
          <Text style={styles.recordDescription}>0 Records</Text>
        </View>
        <View style={styles.iconRight}>
          <FontAwesome color='grey'
            name="angle-right"
            size={30}
          />
        </View>
      </TouchableOpacity>
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
          placeholder='Search form by name'
          value={searchForm}
          onChange={searchForm => this.setState({ searchForm })}
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
    createRecord
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
