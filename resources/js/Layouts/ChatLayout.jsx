import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from "@inertiajs/react";

const ChatLayout = ({children}) => {
    const page = usePage();
    const conversation = page.props.conversation;
    const selectedConversation = page.props.selectedConversation;
    return <AuthenticatedLayout>
        ChatLayout
        <div>{children}</div>
    </AuthenticatedLayout>
}

export default ChatLayout;
