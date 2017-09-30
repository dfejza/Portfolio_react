import jsonFile from './../../assets/data/data.json';
import localFile from './../../assets/data/local.json';


const defaultState = { data: jsonFile, local: localFile, lang: 0 }
//todo separate these stores, no need to recopy all of data when a language changes
const data = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_LANG':
            return { data: jsonFile, local: localFile, lang: action.payload }
        default:
            return state;
    }
}

export default data