import {EVENT_CALL_DB, EVENT_DELETE_DB} from './ActionType';
export const CallEventData = () => {
  return {
    type: EVENT_CALL_DB,
  };
};
export const DeleteEventData = (sort) => {
  return {
    type: EVENT_DELETE_DB,
    sort,
  };
};
