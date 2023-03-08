import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Row,
} from "reactstrap";


//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { getChats } from "../../store/chat/actions";

import {
  addMessage as onAddMessage,
  getContacts as onGetContacts,
  getGroups as onGetGroups,
  AddFeedback as onAddfeedback,
  getMessages as onGetMessages,
  getInteraction as ongetInteraction
} from "store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

const Chat = props => {



  const dispatch = useDispatch();

  const { chats, messages, response, userID } = useSelector(state => ({
    chats: state.chat.chats,
    messages: state.chat.messages,
    response: state.chat.response,
    userID: state.Login.userID
  }));
  const [messageBox, setMessageBox] = useState(null);
  // const Chat_Box_query2 = "Henry Wells"
  const [Currentresponse, setCurrentresponse] = useState(response);
  // eslint-disable-next-line no-unused-vars

  const [feedback_dislike, setfeedback_dislike] = useState(false);
  const [feedback_like, setfeedback_like] = useState(false);
  const [feedback, setfeedback] = useState("");;
  const [Chat_Box_query, setChat_Box_query] = useState("");
const[showresponse,setshowresponse]=useState(false)
  const [query, setquery] = useState("");
  const [query_response, setqueryresponse] = useState(false);
  const [query_ID, setqueryID] = useState("");

  useEffect(() => {

    if (!isEmpty(userID)) {
      const message = {

        userId: userID

      };
      dispatch(getChats(message))

    };
  }, [getChats])



  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [messages]);



  const toggle_like_feedback = () => {
    if (query_response) {
      setfeedback_like(!feedback_like);
    }
  };

  const toggle_dislike_feedback = () => {
    if (query_response) {
      setfeedback_dislike(!feedback_dislike);
    }
  };


  //Use For Chat Box
  const userChatOpen = (_id, query, response, roomId) => {
    setChat_Box_query(query);
    setCurrentresponse(response);
    setqueryresponse(true)
    setqueryID(_id)
    setshowresponse(false)


  };




  const addMessage = async () => {

    const message = {
      userId: userID, 
      query: query,

    };

    setChat_Box_query(query)
    setshowresponse(true)
    setquery("")
    dispatch(onAddMessage(message));
 
      




  };

  const addfeedback = async (value) => {
    const message = {
      userId: userID,
      value: value,
      text: feedback,
      I_id: query_ID
    };
    setfeedback_dislike(false)
    setfeedback_like(false)
    dispatch(onAddfeedback(message));

  };

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  };





  return (
    <React.Fragment>
      <div >
        <Container fluid>
          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="chat-leftsidebar me-lg-1">
                  <div>
                    <div className="chat-leftsidebar-nav">
                      <div>
                        <h5 className="font-size-14 mb-4">Recent</h5>
                        <ul className="list-unstyled chat-list" id="recent-list">
                          <PerfectScrollbar style={{ height: "410px" }}>

                            {map(chats, chat => (
                              <li
                                key={chat._id} >
                                <Link
                                  to="#"
                                  onClick={() => {
                                    userChatOpen(
                                      chat._id,
                                      chat.query,
                                      chat.response,

                                    );
                                  }}
                                >
                                  <div className="d-flex">


                                    <div className="align-self-center me-3">
                                      <i className="bx bx-chat font-size-20" />
                                    </div>


                                    <div className="flex-grow-1 overflow-hidden">
                                      <h5 className="text-truncate font-size-14 mb-1">
                                        {chat.query}
                                      </h5>
                                      <p className="text-truncate mb-0">
                                        {chat.response}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </PerfectScrollbar>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-100 user-chat">
                  <Card>
                    <div className="p-4 border-bottom ">
                      <Row>
                        <Col md="4" xs="9">
                          <h5 className="font-size-15 mb-1">
                            Get Your Business Noticed!
                          </h5>

                          <p className="text-muted mb-0">
                            with Our amazing marketing headlines generator model
                          </p>
                        </Col>
                        <Col md="8" xs="3">
                          <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item d-none d-sm-inline-block">
                              <Dropdown
                                className="me-1"
                                isOpen={feedback_like}
                                toggle={toggle_like_feedback}
                              >
                                <DropdownToggle className="btn nav-btn" tag="a">
                                  <i className="bx bx-like" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-md"
                                >
                                  <Form className="p-3" >
                                    <FormGroup className="m-0">
                                      <InputGroup>

                                        <Input
                                          type="textarea"
                                          className="form-control"
                                          maxLength="225"
                                          rows="3"
                                          value={feedback}
                                          onChange={e => setfeedback(e.target.value)}
                                          placeholder="Send your feedback"
                                        />
                                        {/* <InputGroupAddon addonType="append"> */}
                                        <Button color="primary" onClick={(e) => addfeedback("like")}>
                                          <i className="mdi mdi-send" />
                                        </Button>
                                        {/* </InputGroupAddon> */}
                                      </InputGroup>
                                    </FormGroup>
                                  </Form>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                            <li className="list-inline-item d-none d-sm-inline-block">
                              <Dropdown
                                className="me-1"
                                isOpen={feedback_dislike}
                                toggle={toggle_dislike_feedback}
                              >
                                <DropdownToggle className="btn nav-btn" tag="a">
                                  <i className="bx bx-dislike" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-md"
                                >
                                  <Form className="p-3" >
                                    <FormGroup className="m-0">
                                      <InputGroup>

                                        <Input
                                          type="textarea"
                                          className="form-control"
                                          maxLength="225"
                                          rows="3"
                                          value={feedback}
                                          onChange={e => setfeedback(e.target.value)}
                                          placeholder="Send your feedback"
                                        />
                                        {/* <InputGroupAddon addonType="append"> */}
                                        <Button color="primary" onClick={(e) => addfeedback("dislike")}>
                                          <i className="mdi mdi-send" />
                                        </Button>
                                        {/* </InputGroupAddon> */}
                                      </InputGroup>
                                    </FormGroup>
                                  </Form>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>

                    <div>
                      <div className="chat-conversation p-3">
                        <ul className="list-unstyled">
                          <li className="left">
                            <div className="conversation-list">
                              <div className="ctext-wrap">
                                <div className="conversation-name">
                                  Query
                                </div>
                                <p>{Chat_Box_query}</p>

                              </div>
                            </div>
                          </li>

                          <li className="left">
                            <div className="conversation-list">

                              <div className="ctext-wrap">
                                <div className="conversation-name">
                                  Response
                                </div>
                                {showresponse?( <p>{response}</p>):( <p>{Currentresponse}</p>)}
             

                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="p-3 chat-input-section">
                        <Row>
                          <Col>
                            <div className="position-relative">
                              <input
                                type="text"
                                value={query}
                                onChange={e => setquery(e.target.value)}
                                className="form-control chat-input"
                                placeholder="Enter Message..."
                              />

                            </div>
                          </Col>
                          <Col className="col-auto">
                            <Button
                              type="button"
                              color="primary"
                              onClick={() =>
                                addMessage(query)
                              }
                              className="btn btn-primary btn-rounded chat-send w-md "
                            >
                              <span className="d-none d-sm-inline-block me-2">
                                Send
                              </span>{" "}
                              <i className="mdi mdi-send" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Chat.propTypes = {
  chats: PropTypes.array,
  messages: PropTypes.array,
  Login: PropTypes.object,
  onGetChats: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func,
};

export default Chat;
