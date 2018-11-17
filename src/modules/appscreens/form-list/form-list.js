import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap } from '~/helpers/app-icons';

class FormList extends React.Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    app: "Forms"
  }

  navigationButtonPressed = ({ buttonId }) => {
    buttonId === 'AddForm' ? console.log('button clicked') : null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Build {this.state.app}</Text>
        <Button
          onPress={() => Navigation.pop(this.props.componentId)}
          title="Go Back"
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FormList;
