import {
  GET_GROUPS_SUCCESS,
  GET_CHATS_SUCCESS,
  GET_GROUPS_FAIL,
  GET_CHATS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  POST_ADD_MESSAGE_SUCCESS,
  POST_ADD_MESSAGE_FAIL,
  POST_FEEDBACK,
  POST_FEEDBACK_FAIL,
  POST_FEEDBACK_SUCCESS,
  GET_INTERACTION,
  GET_INTERACTION_SUCCESS,
  GET_INTERACTION_FAIL
} from "./actionTypes"

const INIT_STATE = {
  chats: [],
  groups: [],
  response: [],
  contacts: [],
  messages: [],
  error: {},
}

const Calendar = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload,
      }

    case GET_CHATS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      }

    case GET_GROUPS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
      }

    case GET_CONTACTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      }

    case GET_MESSAGES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case POST_ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        chats: action.payload,
        response: action.payload[0].response,
      }

    case POST_ADD_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

      case POST_FEEDBACK:
        return {
          ...state,
          error: action.payload,
        }
  
      case POST_FEEDBACK_SUCCESS:
        return {
          ...state,
          messages: action.payload,
          
        }
  
      case POST_FEEDBACK_FAIL:
        return {
          ...state,
          error: action.payload,
        }
        case GET_INTERACTION_SUCCESS:
          return {
            ...state,
            chats: action.payload,
          }
    
        case GET_INTERACTION_FAIL:
          return {
            ...state,
            error: action.payload,
          }



    default:
      return state
  }
}

export default Calendar
