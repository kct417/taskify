import React from 'react';
import DefHome from "../components/Default"
import Sidebar from '../components/Sidebar';

const Home = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <DefHome />
        </div>
    )
}

export default Home