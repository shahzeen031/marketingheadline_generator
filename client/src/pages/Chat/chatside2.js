import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";


//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";



import {
  addMessage as onAddMessage,
  getChats as onGetChats,
  getContacts as onGetContacts,
  getGroups as onGetGroups,
  getMessages as onGetMessages,
} from "store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

const Chat = props => {



  const dispatch = useDispatch();

  const { chats, groups, contacts, messages } = useSelector(state => ({
    chats: state.chat.chats,
    groups: state.chat.groups,
    contacts: state.chat.contacts,
    messages: state.chat.messages,
  }));

  const [messageBox, setMessageBox] = useState(null);
  // const Chat_Box_query2 = "Henry Wells"
  const [Currentresponse, setCurrentresponse] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    name: "Henry Wells",
    isActive: true,
  });
  const [menu1, setMenu1] = useState(false);
  const [search_Menu, setsearch_Menu] = useState(false);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [other_Menu, setother_Menu] = useState(false);
  const [activeTab, setactiveTab] = useState("1");
  const [Chat_Box_query, setChat_Box_query] = useState("Steven Franklin");
  // eslint-disable-next-line no-unused-vars
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("Active Now");
  const [curMessage, setcurMessage] = useState("");

  useEffect(() => {
    dispatch(onGetChats());
    dispatch(onGetGroups());
    dispatch(onGetContacts());
    dispatch(onGetMessages(Currentresponse));
  }, [onGetChats, onGetGroups, onGetContacts, onGetMessages, Currentresponse]);

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [messages]);

  // const toggleNotification = () => {
  //   setnotification_Menu(!notification_Menu)
  // }

 

  //Use For Chat Box
  const userChatOpen = (id, name, status, roomId) => {
    setChat_Box_query(name);
    setCurrentresponse(roomId);
    dispatch(onGetMessages(roomId));
  };



  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  };



  return (
    <React.Fragment>

                    <div className="chat-leftsidebar-nav">
                      
              
                          
                            <ul className="list-unstyled chat-list" id="recent-list">
                               
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {map(chats, chat => (
                                  <li
                                    key={chat.id + chat.status}
                                    className={
                                      Currentresponse === chat.roomId
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        userChatOpen(
                                          chat.id,
                                          chat.name,
                                          chat.status,
                                          chat.roomId
                                        );
                                      }}
                                    >
                                      <div className="d-flex">
                                      
                                        {chat.isImg ?
                                           <div className="align-self-center me-3">
                                           <i className="bx bx-chat font-size-20 " />
                                      </div>
                                          :
                                          <div className="align-self-center me-3">
                                               <i className="bx bx-chat font-size-20" />
                                          </div>
                                        }

                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-14 mb-1">
                                          {chat.description}
                                          </h5>
                                         
                                        </div>
                                       
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </PerfectScrollbar>
                            </ul>
                          </div>
                 
               
              
             
       
  
    </React.Fragment>
  );
};

Chat.propTypes = {
  chats: PropTypes.array,
  groups: PropTypes.array,
  contacts: PropTypes.array,
  messages: PropTypes.array,
  onGetChats: PropTypes.func,
  onGetGroups: PropTypes.func,
  onGetContacts: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func,
};

export default Chat;
