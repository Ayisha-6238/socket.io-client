import "./App.css";
import { useEffect, useState } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:3001")



function App() {

  const [input, setInput] = useState("")
  const [message, setMessage] = useState([])

  useEffect(() => {
    socket.on("recieve message", (msg) => {
      setMessage((preMessage) => [...preMessage, msg])
      console.log(msg);
    })
    return () => {
      socket.off("received message")
    }
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    setMessage((preMessage) => [...preMessage, input])
    socket.emit("send message", input)
    setInput("")
    
  }
  
  
  return (
    <div>
      <form action="" onSubmit={sendMessage}>
        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
        <button>send</button>
        <br />
        <input onChange={(e) => setInput(e.target.value)} type="text" />
        <button> Room</button>
      </form>
      {message.map((msg, index) => {
        return (
          <p  key={index}><span>{msg}</span> <br /></p>
        )
      })}
    </div>
  )
}

export default App
