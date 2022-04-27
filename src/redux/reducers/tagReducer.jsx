import { SET_TAG, CLEAR_TAG } from "../types/tagType"


const initialState = {
    initialTag: {
      title: "",
      imageUrl: "",
      contentText: "",
      date:"",
      id:"",
    },
}
const tagReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case SET_TAG:
    return { ...state, initialTag:payload }

    case CLEAR_TAG:
    return initialState.initialTag

  default:
    return state
  }
}

export default tagReducer