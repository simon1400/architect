import { SOCIAL_DATA } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case SOCIAL_DATA:
      return action.payload;
    default:
      return state;
  }
}
