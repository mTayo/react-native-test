import { APP_CONSTANTS } from "../../../constants";
import { phoneNumbers } from "../../../data";

const initialState = {
    defaultNumber: phoneNumbers.find((number, _i) => number.default === true ),
    allNumbersActivated: phoneNumbers.filter((number, _i) => number.activated === true ),
    allNumbersExpired: phoneNumbers.filter((number, _i) => number.activated === false ),
    allNumbers: [...phoneNumbers],
    currentTab: 0,
    selectedNumberData: null
};
  
  const numberArrayReducer = (state = initialState, action) => {
    switch (action.type) {
      case APP_CONSTANTS.DEFAULT_SELECTION:
        return {
          ...state,
          allNumbersActivated: action.payload
        };
      case APP_CONSTANTS.UPDATE_DEFAULT:
          return {
            ...state,
            defaultNumber: action.payload
          };
      case APP_CONSTANTS.CHANGE_NUMBER_MANAGEMENT_TAB:
        return {
          ...state,
          currentTab: action.payload
        };
      case APP_CONSTANTS.SELECT_NUMBER:
        return{
          ...state,
          selectedNumberData: action.payload
        }
        case APP_CONSTANTS.UPDATE_LIST_OF_ALL_NUMBERS:
          return{
            ...state,
            allNumbers: action.payload,
            allNumbersActivated: action.payload.filter((number, _i) => number.activated === true ),
            allNumbersExpired: action.payload.filter((number, _i) => number.activated === false ),
            defaultNumber: action.payload.find((number, _i) => number.default === true ),
          }
      default:
        return state;
    }
  };
  
  export default numberArrayReducer;
  