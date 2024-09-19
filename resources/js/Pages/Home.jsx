import ChatLayout from '@/Layouts/ChatLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function Home() {
    return (
        <>message</>
    );
}

Home.layout = (page) => {
    return (
        <AuthenticatedLayout
            user={page.props.auth.user}>
                <ChatLayout children={page}></ChatLayout>
        </AuthenticatedLayout>
    );
}

export default Home;
