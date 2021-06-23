
import React, { useState,useEffect } from "react";
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

//SpeechRecoginitionCode
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'



function Navbar(){

  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])


  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }
  const handleSaveNote = () => {
   
    setNote('')
  }
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
            question: input || note,
            imageUrl: inputUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            likes:0,
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
        {/*<div className='qHeader__input'>
        <SearchIcon />
        <input type='text' placeholder='Search Campus' id="searchItem"></input>
    </div>*/}
        <div className='qHeader__Rem'>
            <div className='qHeader__avatar'>
             <Avatar  id="log_out" onClick={() => auth.signOut()}
            className="Avatar"
            src={
              user.photo} />

            </div>
            <LanguageIcon />
            <Button onClick={() => setIsModalOpen(true)}id="Add_question">Add Question</Button>
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
              value={input || note}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Start your question with 'What', 'How', 'Why', etc. "
              id='msg'
              
            />
          

          <div className="modal__fieldLink">
              <Link />
              <input
                value={inputUrl} 
                onChange={(e) => setInputUrl(e.target.value)}
                type="text"
                placeholder="Optional: include a link that gives context"
                id="image_link"
              ></input>
            </div>
            </div>
            <div className="modal__buttons">


            {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
            <button onClick={() => setIsListening(prevState => !prevState)} className="add">
            Speak Question
          </button>
          <button className='add' onClick={handleSaveNote} >Clear</button>
          



          <button className='cancel' onClick={()=>setIsModalOpen(false)} id="close_btn">Close</button>
          <button type="sumbit"  onClick={handleQuestion} className="add" id="submit_btn">
              Add Question
            </button>
            </div>
        </Modal>
        </div>
            </div>
            

    )
}
export default Navbar;