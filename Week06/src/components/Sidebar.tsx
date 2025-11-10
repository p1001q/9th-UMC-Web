/*
import { useContext, useEffect, useRef } from "react";
import { SidebarContext } from "../Hooks/SidebarProvider";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import{ PATH }from "../routes/path";

const Sidebar = () => {
    const sidebarContext = useContext(SidebarContext);
    const isSidebarOpen = sidebarContext?.isSidebarOpen;
    const toggleSidebar = sidebarContext?.toggleSidebar;
    const panelRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 외부 영역 클릭, 또는 ESC 키 입력 시 사이드바 닫기
        
    }, [isSidebarOpen, toggleSidebar]);

    const linkStyle = "flex items-center gap-2 px-3 py-2";
    const hoverStyle = "hover:text-pink-500 rounded-md transition-colors duration-200 ease-in-out";

    return (
        <>
        {/* overlay *}
        <div
            className={clsx(
                "fixed top-14 h-[calc(100dvh-3.5rem)] inset-0 z-40 bg-black/40",
                isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            onClick={toggleSidebar} 
            aria-hidden
        />

        {/* content *}
        <aside
            aria-hidden={!isSidebarOpen}
            className={clsx(
                // layout, background
                "fixed top-14 left-0 z-50 w-72 p-4 bg-zinc-800 shadow-lg",
                // height
                "h-[calc(100dvh-3.5rem)]",
                // motion
                "transform-gpu will-change-transform transition-transform duration-300 ease-out",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <div ref={panelRef} className="flex h-full flex-col">
                <nav>
                    <Link
                        to={PATH.music.list()}
                        className={clsx(linkStyle, hoverStyle)}
                        onClick={toggleSidebar}
                    >
                        찾기
                    </Link>

                    <Link
                        to={PATH.profile.view()}
                        className={clsx(linkStyle, hoverStyle)}
                        onClick={toggleSidebar}
                    >
                        마이페이지
                    </Link>
                </nav>

                <footer className="mt-auto px-2 py-3">
                    <button
                        className={clsx(
                            "w-full px-3 py-2 hover:cursor-pointer",
                            hoverStyle
                        )}
                        onClick={()=>{
                            // 탈퇴 로직 연결
                            navigate(PATH.profile.delete());
                            console.log('탈퇴하기');
                        }}
                    >
                        탈퇴하기
                    </button>
                </footer>
            </div>
        </aside>
        </>
    )
}

export default Sidebar;
*/