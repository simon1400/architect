import { SETTING_DATA } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case SETTING_DATA:
      return action.payload;
    default:
      return state;
  }
}
