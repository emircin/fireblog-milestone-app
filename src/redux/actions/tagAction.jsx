import { SET_TAG, CLEAR_TAG } from "../types/tagType"

export const setTag = (initialTag) => ({
  type: SET_TAG,
  payload: initialTag
});

export const clearTag = () => ({
    type: CLEAR_TAG,
  })