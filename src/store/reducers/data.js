
import localFile from './../../assets/data/local.json';


const defaultState = { local: localFile, lang: 0 }
//todo separate these stores, no need to recopy all of data when a language changes
const data = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_LANG':
            return { local: localFile, lang: action.payload }
        default:
            return state;
    }
}

export default data