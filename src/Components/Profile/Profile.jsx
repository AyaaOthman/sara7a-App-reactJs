import React, { useEffect, useState } from "react";
import avatarImg from "../../img/avatar.png";
import jwtDecode from "jwt-decode";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getAllMsgs } from "../../redux/msgsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const msgs = useSelector((state) => state.counter.msgs);
  console.log("msgs", msgs);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const invitLink = `${window.location.origin}/message/${userId?.id}`;

  function getUserId() {
    let decodedUserId = jwtDecode(localStorage.getItem("userToken"));
    console.log(decodedUserId);
    setUserName(decodedUserId.name);
    setUserId(decodedUserId);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCopy = () => navigator.clipboard.writeText(invitLink);

  useEffect(() => {
    getUserId();
  }, []);

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
            {msgs?.length === 0 ? (
              <div className="col-md-12">
                <div className="card py-5">YOU DON'T HAVE MESSAGES...</div>
              </div>
            ) : (
              <>
                {msgs?.map((msg) => (
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
