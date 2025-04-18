  import React, { useEffect, useRef } from 'react'
  import { useChatStore } from '../store/useChatStore'
  import ChatHeader from './ChatHeader'
  import MessageInput from './MessageInput'
  import MessageSkeleton from './skeletons/MessageSkeleton'                                                   
  import { useAuthStore } from '../store/useAuthStore'
  import { formatTimeMessage } from '../lib/utils'

  const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore()

  const {authUser} = useAuthStore();
  const messageEndRaf = useRef(null);
    useEffect(() => {

      getMessages(selectedUser?._id)
      subscribeToMessages();
      return () => unsubscribeFromMessages(); 
    }, [selectedUser?._id, getMessages])
    useEffect (() => {
      if(messageEndRaf.current && messages)
    messageEndRaf.current.scrollIntoView({behavior: "smooth"});
    }, [messages])
    if (isMessagesLoading) {
      return <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    }
    return (
      <div className=' h-screen flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message._id}
            ref={messageEndRaf} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                  src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.jpg" : selectedUser.profilePic || "/avatar.jpg"}
                    alt="profile Pic" />
                </div>
              </div>
              <div className="chat-header mb-1">
              <time className='text-xs opacity-50 ml-1'>
                {formatTimeMessage(message.createdAt)}
              </time>
              </div>
              <div className='chat-bubble flex flex-col'>
                {message.image && (
                <img src={message.image} alt="Attachment"
                className='sm:max-w-[200px] rounded-md mb-2' />
                )}
                {
                  message.text && <p>{message.text}</p>
                }
              </div>
            </div>
          ))}
        </div>
        <MessageInput />
      </div>
    )
  }

  export default ChatContainer     
  
  
//   import React, { useEffect, useRef } from 'react'
// import { useChatStore } from '../store/useChatStore'
// import ChatHeader from './ChatHeader'
// import MessageInput from './MessageInput'
// import MessageSkeleton from './skeletons/MessageSkeleton'
// import { useAuthStore } from '../store/useAuthStore'
// import { formatTimeMessage } from '../lib/utils'

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages
//   } = useChatStore()

//   const { authUser } = useAuthStore()
//   const messageEndRef = useRef(null)

//   // Load messages when a user is selected
//   useEffect(() => {
//     if (selectedUser?._id) {
//       getMessages(selectedUser._id)
//       subscribeToMessages()
//     }

//     return () => {
//       unsubscribeFromMessages()
//     }
//   }, [selectedUser?._id])

//   // Auto scroll to bottom when messages change
//   useEffect(() => {
//     if (messageEndRef.current && messages.length > 0) {
//       messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
//     }
//   }, [messages])

//   if (isMessagesLoading) {
//     return (
//       <div className='flex-1 flex flex-col overflow-auto'>
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     )
//   }

//   return (
//     <div className=' h-screen flex-1 flex flex-col overflow-auto'>
//       <ChatHeader />
//       <div className=' flex-1 overflow-y-auto p-4 space-y-4'>
//         {messages.map((message, index) => {
//           const isLast = index === messages.length - 1
//           return (
//             <div
//               key={message._id}
//               ref={isLast ? messageEndRef : null}
//               className={`chat ${
//                 message.senderId === authUser._id ? 'chat-end' : 'chat-start'
//               }`}
//             >
//               <div className='chat-image avatar'>
//                 <div className='size-10 rounded-full border'>
//                   <img
//                     src={
//                       message.senderId === authUser._id
//                         ? authUser.profilePic || '/avatar.jpg'
//                         : selectedUser.profilePic || '/avatar.jpg'
//                     }
//                     alt='profile Pic'
//                   />
//                 </div>
//               </div>
//               <div className='chat-header mb-1'>
//                 <time className='text-xs opacity-50 ml-1'>
//                   {formatTimeMessage(message.createdAt)}
//                 </time>
//               </div>
//               <div className='chat-bubble flex flex-col'>
//                 {message.image && (
//                   <img
//                     src={message.image}
//                     alt='Attachment'
//                     className='sm:max-w-[200px] rounded-md mb-2'
//                   />
//                 )}
//                 {message.text && <p>{message.text}</p>}
//               </div>
//             </div>
//           )
//         })}
//       </div>
//       <MessageInput />
//     </div>
//   )
// }

// export default ChatContainer
