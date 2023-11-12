import React, { useEffect, useRef, useState } from 'react'
import Client from '../components/Client';
import Editor from '../components/editor';
import { initsocket } from '../socket';
import ACTIONS from '../Actions';
import { Navigate, useLocation,useNavigate,useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const EditorPage = () => {

     const socketRef=useRef(null);
     const location=useLocation();
     const {roomId}=useParams();
    
     const reactNavigator=useNavigate();
     const [clients,setClients]=useState([
      
    ]);
    
     useEffect(()=>{
      const init=async()=>{
       socketRef.current=await initsocket();
       socketRef.current.on('connect_erroe',(err)=>handleErrors(err));
       socketRef.current.on('connect_failed',(err)=>handleErrors(err));
       function handleErrors(e){
        console.log('soket error',e)
        toast.error('socket connection failed,try again later.');
        reactNavigator('/');
       }
           socketRef.current.emit(ACTIONS.JOIN,{
             roomId,
           username: location.state?.username,
           });
           // listning for joined event
             socketRef.current.on(
              ACTIONS.JOINED,
              ({
                clients,username,socketId})=>
                {
                  if(username !==location.state?.username){
                toast.success('${username} joined the room.');
                console.log('${username} joined');
              }
              setClients(clients);
            }
             );
         //listning for disconnected
         socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username})=>{
          toast.success('${username} left the room.');
             setClients((prev)=>{
              return prev.filter(
                (client)=>client.socketId!==socketId
              );
             });
         });
      };
      init();

      // return()=>{
      //   socketRef.current.disconnect();
      //   socketRef.current.off(ACTIONS.JOINED);
      //   socketRef.current.off(ACTIONS.DISCONNECTED);
     
      // };

     },
     []);
 

  if(!location.state){
    return <Navigate to="/"/>;
  }
  return (
    <div className='mainWrap'>
<div className='aside'>

<div className='asideInner'>


  <div className='logo'>

      <img className='logoImage'src='/code-sync.png'alt='logo'/>

  </div>
  <h31>Connected</h31>
  <div className='clientsList'>
    {
      clients.map((client)=>(
        <client key={client.socketId} username={client.username}/>
      ))
    }
  </div>
</div>
<button className='Btn copyBtn'>Copy ROOM ID</button>
<button className='Btn leaveBtn'>Leave</button>

</div>
    <div className='editorWrap'>
      <Editor></Editor>
      
       </div>

    </div>
  )
}

export default EditorPage