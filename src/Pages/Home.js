import React, {useState} from 'react'
import{v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate=useNavigate();
const [roomId,setRoomId]=useState('');
const [username,setUsername]=useState('');
const createNewRoom=(e)=>{
    e.preventDefault();
    const id=uuidv4();
    setRoomId(id);
     toast.success('Created a new room');

   // console.log(id);
};
const joinRoom=()=>{
    if(!roomId|| !username){
        toast.error('ROOM ID &username is required');
        return;
    }
      //Redirect

      navigate('/editor/${roomId}',{
        state:{username,},
      });
};
const handelInputEnter=(e)=>{
   // console.log('event',e.code);
   if(e.code=='Enter'){
    joinRoom();
   }
}

  return (
    <div className='homePagewrapper'>
        <div className='formwrapper'>
          <img className='homePageLogo' src='/code-sync.png' alt='code-sync-logo'></img>
          <h4 className='mainLable'>Paste invitation ROOM ID</h4>
          <div className='inputGroup'>
            <input type='text'className='inputBox'placeholder='ROOM ID'
            onChange={(e)=>setRoomId(e.target.value)}
           value={roomId}
           onKeyUp={handelInputEnter}
           


            ></input>
            <input type='text'className='inputBox'placeholder='USERNAME'
             onChange={(e)=>setUsername(e.target.value)}
             value={username}
             onKeyUp={handelInputEnter}
            
            ></input>
            <button className='btn joinBtn'
            onClick={joinRoom}

            
            >Join</button>
            <span className='createInfo'>
                If you don't have an invite than create &nbsp;
                <a onClick={createNewRoom} href="" className='createNewBtn'>new room
                
                </a>


            </span> 
          </div>
        </div>
    <footer >
        <h4>
            Built with* &nbsp;by{' '}
            <a href='https://github.com/Lucky292908/basic-code-of-java/security'>Coder</a>
            </h4>
    </footer>
    </div>
  )
}

export default Home