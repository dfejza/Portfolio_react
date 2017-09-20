import jsonFile from './../../assets/data/data.json';


 const defaultState = { data: jsonFile, lang: 0}
//todo separate these stores, no need to recopy all of data when a language changes
 const data = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_LANG':
            return { data: jsonFile, lang: action.payload}
        default:
            return state;
    }
}

export default data