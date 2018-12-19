
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '~/constants/colors';
// define your suffixes by yourself..
// here we use active, big, small, very-big..

const color = Colors.primary;

const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
    "ios-home": [30,color],
    "ios-home--big": [50,color],
    "user-plus": [30, color, Feather],
    "user-check":[30, color, Feather],
    "ios-add": [30, color],
    "ios-close": [30, color],
    "ios-menu": [30, color],
    "ios-share": [30, color],
    "edit-2": [20, color, Feather],

    "ios-person": [30, color],
    "ios-person--big": [50, color],

    "ios-person--active": [30, "#fff"],
    "ios-person--active--big": [50, "#fff"],
    "ios-person--active--very-big": [100, "#fff"],

    "ios-people": [30, color],
    "ios-people--active": [30, "#fff"],

    "ios-keypad": [30, color],
    "ios-keypad--active": [30, "#fff"],

    "ios-chatbubbles": [30, color],
    "ios-chatbubbles--active": [30, "#fff"],

    "facebook": [30, color, FontAwesome],
    "facebook--active": [30, "#fff", FontAwesome],
}

const defaultIconProvider = Ionicons;

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName => {
            const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
            return Provider.getImageSource(
                iconName.replace(replaceSuffixPattern, ''),
                icons[iconName][0],
                icons[iconName][1]
            )
        })
    ).then(sources => {
        Object.keys(icons)
            .forEach((iconName, idx) => iconsMap[iconName] = sources[idx])

        // Call resolve (and we are done)
        resolve(true);
    })
});

export {
    iconsMap,
    iconsLoaded
};