import { FETCH_IMAGE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_IMAGE:
      return action.payload;
    default:
      return state;
  }
}
