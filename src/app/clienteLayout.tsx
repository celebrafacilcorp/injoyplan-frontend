"use client";
import "./globals.css";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { useEffect, useState } from "react";

import Alert from "./components/Alert";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const checkModalClass = () => {
            const modalElements = document.getElementsByClassName("ReactModal__Body--open");
            setIsModalOpen(modalElements.length > 0);
        };

        checkModalClass();
        const observer = new MutationObserver(checkModalClass);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    return (
        <div className={isModalOpen ? "blur-background pointer-events-none" : "overflow-hidden"}>
            <Alert />
            <Header />
            {children}
            <Footer />
        </div>
    );
}