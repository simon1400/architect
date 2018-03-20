import { MENU_DATA } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case MENU_DATA:
      return action.payload;
    default:
      return state;
  }
}
