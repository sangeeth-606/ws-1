import { useEffect, useState } from 'react'


function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [message, setMessage] = useState<string>('')
  const [messageInput, setMessageInput] = useState<string>('')

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
      console.log('Connected')
      setSocket(socket)
    }
    socket.onmessage = (message) => {
      console.log('Received message:', message.data)
      setMessage(message.data as string)
    }


    // Clean up the socket connection on component unmount
    return () => {
      socket.close()
    }
  }, [])

  const sendMessage = () => {
    if (socket && messageInput) {
      socket.send(messageInput)
      setMessageInput('') // Clear the input field after sending
    }
  }

  if (!socket) {
    return <div>loading..</div>
  }

  return (
    <>
      <input onChange={(e) => setMessageInput(e.target.value)} type="text" value={messageInput} />
      <button onClick={sendMessage}>Send</button>
      {message && <div>Message from server: {message}</div>}
    </>
  )
}

export default App
