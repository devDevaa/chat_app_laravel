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

    // useEffect(() => {
    //     Echo.channel("online")
    //         .here((user) => {
    //             console.log("here", user);
    //         })
    //         .joining((user) => {
    //             console.log("joining", user);
    //         })
    //         .leaving((user) => {
    //             console.log("leaving", user);
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
            ChatLayout
            <div>{children}</div>
        </>
    );
};

export default ChatLayout;
