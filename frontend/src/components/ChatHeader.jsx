import React from 'react'
import { X } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore()
    const { onlineUsers } = useAuthStore()
   

    return (
        <div className='p-2.5 border-b border-base-content'>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser?.profilePic || "/avatar.jpg"}  alt={selectedUser?.fullName} />
                        </div>
                    </div>
                    {/* user info */}
                    <div>
                        <h3 className="font-medium">{selectedUser?.fullName}</h3>
                        <p className='text-sm text-base-content/70'>{onlineUsers.includes(selectedUser?._id) ? "online" : "offline"}</p>
                    </div>
                </div>
                <button onClick={() => setSelectedUser(null)}><X/></button>
            </div>
        </div>
    )
}

export default ChatHeader