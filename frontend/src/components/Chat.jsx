import { useEffect, useRef, useState } from "react"
import axios from "axios"
import ScrollToBottom from "react-scroll-to-bottom"

import Button from "../components/Button"
import Message from "../components/Message"
import { IoSend } from "react-icons/io5"

function Chat({ socket, sender, selectedConversation, arrivalMessage }) {
  const [messages, setMessages] = useState([])
  const text = useRef()

  useEffect(() => {
    selectedConversation &&
      axios
        .get(`/api/messages/${selectedConversation._id}`)
        .then((response) => setMessages(response.data))
        .then((error) => console.log(error))
  }, [selectedConversation])

  const onSend = async () => {
    if (selectedConversation.hasOwnProperty("_id")) {
      const receiverId = selectedConversation.members.find(
        (userId) => userId !== sender._id
      )

      try {
        const response = await axios.post("/api/messages/send", {
          conversationId: selectedConversation._id,
          senderId: sender._id,
          text: text.current.value,
        })

        setMessages((prev) => [...prev, response.data])
      } catch (error) {
        console.log(error)
      }

      socket.emit("sendMessage", {
        senderId: sender._id,
        receiverId,
        text: text.current.value,
      })

      text.current.value = ""
    } else {
      console.log("tidak")
    }
  }

  const onEnter = (event) => {
    if (event.key === "Enter") {
      return onSend()
    }
  }

  useEffect(() => {
    arrivalMessage &&
      selectedConversation &&
      selectedConversation.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, selectedConversation])

  return (
    <div className="w-full">
      <div className="mx-auto h-screen bg-light p-5 flex flex-col gap-y-3 overflow-y-auto">
        <ScrollToBottom>
          <div id="chat" className="flex flex-col h-[73vh]">
            {selectedConversation &&
              messages &&
              messages.map((msg, i) => (
                <Message message={msg} sender={sender} />
              ))}
          </div>
        </ScrollToBottom>
        <div className="mb-auto"></div>
        <div className="sticky bottom-10">
          <div className="flex gap-x-3">
            <textarea
              ref={text}
              className="w-full rounded-md bg-gray-100 py-1.5 px-3 focus:outline-primary"
              placeholder="pesan..."
              onKeyDown={(e) => onEnter(e)}
            ></textarea>
            <div>
              <Button
                onClick={onSend}
                text={"Send"}
                backgroundColor={"#9E14E8"}
                hoverColor={"#9E14E8"}
                icon={<IoSend size={20} />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
