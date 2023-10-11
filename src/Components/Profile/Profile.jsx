import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import avatarImg from "../../img/avatar.png";
import axios from "axios";
import { tokenContext } from "../../Context/tokenContext";
import jwtDecode from "jwt-decode";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CounterContext } from "../../Context/counter";

export default function Profile() {
  let { token } = useContext(tokenContext);
  const { updateCounter } = useContext(CounterContext);

  const [allAddedMsgs, setAllMessages] = useState([]);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const invitLink = `${window.location.origin}/message/${userId?.id}`;
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    axios
      .get("https://sara7aiti.onrender.com/api/v1/message", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((data) => {
        console.log(data.data);
        setAllMessages(data.data.allMessages);
        updateCounter(data.data.allMessages.length);
      })
  );
  function getUserId() {
    let decodedUserId = jwtDecode(localStorage.getItem("userToken"));
    console.log(decodedUserId);
    setUserName(decodedUserId.name);
    setUserId(decodedUserId);
  }

  // async function getMessages() {
  //   await axios
  //     .get("https://sara7aiti.onrender.com/api/v1/message", {
  //       headers: {
  //         token: localStorage.getItem("userToken"),
  //       },
  //     })
  //     .then((data) => {
  //       console.log(data.data.allMessages);
  //       setAllMessages(data.data.allMessages);
  //     });
  // }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCopy = () => navigator.clipboard.writeText(invitLink);

  useEffect(() => {
    // getMessages();
    getUserId();
  }, []);

  if (isLoading)
    return (
      <>
        <div className="me-auto d-flex justify-content-center"></div>
        <i className="fa fa-spin fa-spinner "></i>
      </>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div>
        <div className="container text-center py-5 my-5 text-center">
          <div className="card py-5 mb-5 d-flex justify-content-center align-items-center">
            <a data-toggle="modal" data-target="#profile">
              <img src={avatarImg} className="avatar " />
            </a>
            <h3 className="py-2">{userName}</h3>
            <Button
              className="w-25 text-center"
              variant="primary"
              onClick={handleShow}
            >
              <i className="fas fa-share-alt" /> Share Profile
            </Button>
          </div>
          {/* //modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              share this link with your friends:{invitLink}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="secondary" onClick={handleCopy}>
                Copy
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="row">
            {allAddedMsgs.length === 0 ? (
              <div className="col-md-12">
                <div className="card py-5">YOU DON'T HAVE MESSAGES...</div>
              </div>
            ) : (
              <>
                {allAddedMsgs.map((msg) => (
                  <div className="card py-5 mb-5 shadow" key={msg._id}>
                    {msg.messageContent}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
