
import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home"
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined'
import SearchIcon from '@material-ui/icons/Search'
import LanguageIcon from '@material-ui/icons/Language'
import { Avatar, Button, Input } from "@material-ui/core";
import '../css/Navbar.css';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import Modal from 'react-modal'
import { ExpandMore, Link } from "@material-ui/icons";
import firebase from "firebase";

function Navbar(){

    const user = useSelector(selectUser);
    const [IsmodalOpen, setIsModalOpen] = useState(false);
    const [input, setInput] = useState("");
    const [inputUrl, setInputUrl] = useState("");
    const questionName = input;
    const [searchTerm,setSearchTerm]=useState("");
    

    const handleQuestion = (e) => {
        e.preventDefault();
        setIsModalOpen(false);
    
       
          db.collection("questions").add({
            user: user,
            question: input,
            imageUrl: inputUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        
    
        setInput("");
        setInputUrl("");
      };

    return(
        <div className='qHeader'>
          <div className='qHeader__logo'>
             <h1>Campus Quora</h1>

          </div>
        <div className='qHeader__icons'>
        <div className='qHeader__icon'>
        <HomeIcon />

        </div>
        <div className='qHeader__icon'>
        <FeaturedPlayListOutlinedIcon />
            
        </div>
        <div className='qHeader__icon'>
        <AssignmentTurnedInOutlinedIcon />
            
        </div>
        <div className='qHeader__icon'>

            <PeopleAltOutlinedIcon />
        </div>
        <div className='qHeader__icon'>

            <NotificationsOutlinedIcon />
        </div>



        </div>
        <div className='qHeader__input'>
        <SearchIcon />
        <input type='text' placeholder='Search Campus' id="searchItem"></input>
        </div>
        <div className='qHeader__Rem'>
            <div className='qHeader__avatar'>
             <Avatar  onClick={() => auth.signOut()}
            className="Avatar"
            src={
              user.photo} />

            </div>
            <LanguageIcon />
            <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
            <Modal
          isOpen={IsmodalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 700,
              height: 600,
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-300px",
              marginLeft: "-350px",
            },
          }}
        >
             <div className="modal__title">
            <h5>Add Question</h5>
            <h5>Share Link</h5>
          </div>
          <div className="modal__info">
          <Avatar
              className="avatar"
              src={
                user.photo
              }
              />
               <p>{user.disPlayName ? user.disPlayName : user.email} asked</p>
               <div className="modal__scope">
              <PeopleAltOutlinedIcon />
              <p>Public</p>
              <ExpandMore />
            </div>
          </div>
          <div className="modal__Field">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Start your question with 'What', 'How', 'Why', etc. "
            />
          <div className="modal__fieldLink">
              <Link />
              <input
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Optional: include a link that gives context"
              ></input>
            </div>
            </div>
            <div className="modal__buttons">
          <button className='cancel' onClick={()=>setIsModalOpen(false)}>Close</button>
          <button type="sumbit"  onClick={handleQuestion} className="add">
              Add Question
            </button>
            </div>
        </Modal>
        </div>
            </div>
            

    )
}
export default Navbar;