import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";

import { FaBeer } from 'react-icons/fa';
import { IconContext } from "react-icons";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { MoreHorizOutlined, ShareOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Modal from "react-modal";
import db from "../firebase";
import { selectQuestionId, setQuestionInfo } from "../features/QuestionSlice";
import firebase from "firebase";

import '../css/Post.css'


function Post({ Id, question, imageUrl, timestamp, users}) {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
 
 
    const [IsmodalOpen, setIsModalOpen] = useState(false);
    const questionId = useSelector(selectQuestionId);
    const [answer, setAnswer] = useState("");
    const [getAnswers, setGetAnswers] = useState([]);
    var [liked,setLiked] = useState(false)
  
    useEffect(() => {
        if (questionId) {
          db.collection("questions")
            .doc(questionId)
            .collection("answer")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
              setGetAnswers(
                snapshot.docs.map((doc) => ({ id: doc.id, answers: doc.data() }))
              )
            );
        }
      }, [questionId]);
    
      const handleAnswer = (e) => {
        e.preventDefault();
    
        if (questionId) {
          db.collection("questions").doc(questionId).collection("answer").add({
            user: user,
            answer: answer,
            questionId: questionId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            likes:0,
          });
        }
        console.log(questionId);
        setAnswer("");
        setIsModalOpen(false);
      };
    

      
   
    return(
        <div
        className="post"
        onClick={() =>
          dispatch(
            setQuestionInfo({
              questionId: Id,
              questionName: question,
            })
          )
        }
      >
        <div className='post__info'>
            <Avatar 
             src={
                users.photo
             }
            />
            <h4>{users.displayName ? users.displayName : users.email}</h4>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </div>
        <div className='post__body'>
            <div className='post__question'>
            <p>{question}</p>
                <button className='post__btnAnswer'
                onClick={() => setIsModalOpen(true)}
                className="post__btnAnswer"
                id="answer_box_btn">Answer</button>
                <Modal
            isOpen={IsmodalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: 680,
                height: 550,
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: "1000",
                top: "50%",
                left: "50%",
                marginTop: "-250px",
                marginLeft: "-350px",
              },
            }}
          >
            <div className="modal__question">
              <h1>{question}</h1>
              <p>
                asked by{" "}
                <span className="name">
                  {users.displayName ? users.displayName : users.email}
                </span>{" "}
                {""}
                on{" "}
                <span className="name">
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
                id="answer_text"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" id="cancel_btn" onClick={() => setIsModalOpen(false)} id="cancel_btn">
                Cancel
              </button>
              <button type="sumbit" onClick={handleAnswer} className="add" id="add_answer">
                Add Answer
              </button>
            </div>
          </Modal>

            </div>
            <div className='post__answer'>
            {getAnswers.map(({ id, answers }) => (
            <p key={id} style={{ position: "relative", paddingBottom: "5px" }}>
              {Id === answers.questionId ? (
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      position: "absolute",
                      color: "gray",
                      fontSize: "small",
                      display: "flex",
                      right: "0px",
                    }}
                  >
                    <span style={{ color: "#b92b27" }}>
                      {answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.email}{" "}
                      on{" "}
                      {new Date(answers.timestamp?.toDate()).toLocaleString()}
                    </span>
                  </span>
                </span>
              ) : (
                ""
              )}
            </p>
          ))}
            </div>
            <img src={imageUrl}
            alt=''
            ></img>

        </div>
        <div className='post__footer'>
            <div className='post__footerAction'>
            {/*<button onClick={isListening=true}><ArrowUpwardOutlinedIcon /></button>
           
              <button onKeyPress={isListening=false}><ArrowDownwardOutlinedIcon /></button>*/}

  


              <button className="add" onClick={()=>{
                setLiked(!liked)
              }} id="like_btn">Like</button>
        {liked ? <span><FavoriteIcon color='secondary'/></span> : <span><FavoriteBorderIcon /></span>}
        

            </div>
            <RepeatOutlinedIcon />
        <ChatBubbleOutlineOutlinedIcon />
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
        </div>
            
        </div>
    )
}
export default Post;