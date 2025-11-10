/**
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Suspense } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";


const BaseLayout = () => {

    return(
        <>
        <Suspense fallback={<div>Loading...</div>}>
            <ScrollRestoration />
            <div className="min-h-screen w-screen">
                <Header/>
                <Sidebar/>
                <main className="w-full">
                    <Outlet/>
                </main>
            </div>
        </Suspense>
        </>
    )
}

export default BaseLayout;
*/