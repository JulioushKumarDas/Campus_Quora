import React from 'react'
import '../css/SidebarOptions.css'
import { Add } from "@material-ui/icons";
function SidebarOptions(){
    return(
        <div className="sidebarOptions">
            <div className='sidebarOption'>
            <img 
            src='https://qphs.fs.quoracdn.net/main-thumb-t-930-100-cbbsbwijdhpyzlpipejvqpiijhhoaday.jpeg'
            alt=''
            />
            <p>
               <a href="https://rvce.edu.in//placement-statistics" id="plc_st"> Placement Statistics</a>
            </p>
        </div>
        <div className="sidebarOption">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-858-100-VnZbEVtOIGkEHXlnYId9slumV59IPgkA.jpeg"
          alt=""
        />

      <p><a href="https://rvce.edu.in/rvce-departments"> Department</a></p>
      </div>
      <div className="sidebarOption">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-1913-100-B8JrwaVauFzsaTSqXDqoWLCXzQb2mTE9.jpeg"
          alt=""
        />
        <p><a href="https://www.rvce.edu.in/admission"> Admission</a></p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-877-100-e7jKHEQr0HExAIA9rlsyHlV6HJyRruEo.jpeg"
          alt=""
        />
        <p><a href="https://rvce.edu.in/rvce-students-clubs-technical-innovative"> Students Clubs</a></p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-801-100-Sf8h894FXbQZQit0TeqDrrqS6xw6dwCQ.jpeg"
          alt=""
        />
        <p><a href="https://rvce.edu.in/sp-achievements"> Sport</a></p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-931-100-c8WCPwZ9qPsh5zLGQ5wHh1ddxtc9Cch7.jpeg"
          alt=""
        />
        <p><a href="https://rvce.edu.in/research-at-rvce"> Research</a></p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-1140-100-24q3tiv4WhPssc5TGwf0mvCM5aiqGVXW.jpeg"
          alt=""
        />
        <p><a href="https://rvce.edu.in/achievements"> ACHIEVEMENTS</a></p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-843-100-W7FzODceTO2aQmp8D7E4rKZ8YgSv21eR.jpeg"
          alt=""
        />
        <p><a href="https://rvce.edu.in/library"> Library</a></p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-2177-100-JiR07D1TQSfeQzRvWXomVaY4Poj2f8Yb.jpeg"
          alt=""
        />
        <p><a href="https://rvce.edu.in/extra-curricular"> Extra & Co Curricular</a></p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-996-100-bfZBQjeEenKKl8fcNY4tVv0FyArtB0Mb.jpeg"
          alt=""
        />
        <p><a href="https://rvce.edu.in/www.rvce.edu.in/career"> Career Opportunity</a></p>
      </div>

     {/* 
      <div className="sidebarOption">
        <Add />
        <p className="text">Discover Spaces</p>
      </div>

      */}
            </div>
       
    )
}
export default SidebarOptions;