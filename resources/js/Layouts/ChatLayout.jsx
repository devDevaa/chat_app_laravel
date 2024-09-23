import { usePage } from "@inertiajs/react";
import Echo from "laravel-echo";
import { useEffect, useState } from "react";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversation = page.props.conversation;
    const selectedConversation = page.props.selectedConversation;

    const [localConversation, setLocalConversation] = useState([]);
    const [sortedConversation, setSortedConversation] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState({});

    const isUserOnline = (userId) => onlineUsers[userId];

    console.log("conversation:", conversation);
    console.log("selectedConversation", selectedConversation);

    useEffect(() => {
        setSortedConversation(
            localConversation.sort((a,b) => {
                if(a.blocked_at && b.blocked_at) {
                    return a.blocked_at < b.blocked_at ? 1 : -1;
                } else if (a.blocked_at) {
                    return 1;
                } else if (b.blocked_at) {
                    return -1;
                }

                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    );
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                } else {
                    return 0;
                }
            })
        );
    }, [localConversation]);

    useEffect(() => {
        setLocalConversation(conversation);
    }, [conversation]);

    // useEffect(() => {
    //     Echo.join("online")
    //         .here((users) => {
    //             const onlineUsersObj = Object.fromEntries(
    //                 users.map((user) =>  [user.id, user])
    //             );
    //             setOnlineUsers((preOnlineUsers) => {
    //                 return { ...preOnlineUsers, ...preOnlineUsers};
    //             });
    //         })
    //         .joining((user) => {
    //             setOnlineUsers((preOnlineUsers) => {
    //                 const updatedUsers = {...preOnlineUsers};
    //                 updatedUsers[user.id] = user;
    //                 return updatedUsers;
    //             })
    //         })
    //         .leaving((user) => {
    //             setOnlineUsers((preOnlineUsers) => {
    //                 const updatedUsers = {...preOnlineUsers};
    //                 delete updatedUsers[user.id];
    //                 return updatedUsers;
    //             })
    //         })
    //         .error((error) => {
    //             console.error("Echo error:", error);
    //         });

    //         return () => {
    //             Echo.leave("online");
    //         };
    // }, []);


    // useEffect(() => {
    //     Echo.channel("online")
    //         .listen("UserTyping", (event) => {
    //             const { user_id, conversation_id, typing } = event;
    //             const newMessage = {
    //                 user_id,
    //                 conversation_id,
    //                 content: typing,
    //                 created_at: new Date().toISOString(),
    //             };
    //             setLocalConversation((prevMessages) => [...prevMessages, newMessage]);
    //         })
    // }, []);

    return (
        <>
            <div className="flex-1 w-full flex overflow-hidden">
                <div className={`transition-all w-full sm:w-[220px] md:w-[300px] bg-slate-800 flex flex-col overflow-hidden ${selectedConversation ? "-ml-[100%] sm:ml-0" : ""}`}>
                    <div className="flex items-center justify-between py-2 px-3 text-xl font-medium">
                        my conversation
                        <div className="tooltip tooltip-left" data-tip="Create new Group">
                            <button className="text-gray-400 hover:text-gray-200">
                                <PencilSquareIcon className="w-4 h-4 inline-block ml-2" />
                            </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <TextInput onKeyUp={onSearch} placeholder="Filter users and groups" className="w-full" />
                    </div>
                    <div className="flex-1 overflow-auto">
                        {sortedConversation &&
                            sortedConversation.map((conversation) => (

                            ))
                        }
                    </div>
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>
            </div>
        </>
    );
};

export default ChatLayout;
