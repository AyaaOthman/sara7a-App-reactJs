import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import avatarImg from "../../img/avatar.png";
import axios from "axios";
import { tokenContext } from "../../Context/tokenContext";
import jwtDecode from "jwt-decode";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export default function Profile() {
  let { token } = useContext(tokenContext);
  const [allAddedMsgs, setAllMessages] = useState([]);
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
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
          <div className="card py-5 mb-5">
            <a href data-toggle="modal" data-target="#profile">
              <img src={avatarImg} className="avatar " alt />
            </a>
            <h3 className="py-2">{userName}</h3>

            <button
              data-toggle="modal"
              data-target="#share"
              className="btn btn-dark share "
            >
              <i className="fas fa-share-alt" /> Share Profile
            </button>
          </div>
          <div className="row">
            {allAddedMsgs.length === 0 ? (
              <div className="col-md-12">
                <div className="card py-5">YOU DON'T HAVE MESSAGES...</div>
              </div>
            ) : (
              <>
                {allAddedMsgs.map((msg) => {
                  return (
                    <div className="card py-5 mb-5 shadow">
                      {msg.messageContent}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
