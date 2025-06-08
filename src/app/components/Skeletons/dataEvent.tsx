import React from "react";
import './styles.css'
const DataEventSkeleton = () => {
    return (
        <div className="2xl:max-w-screen-2xl mt-10 xl:max-w-screen-xl lg:max-w-screen-lg mx-auto mb-10 xl:px-10 px-0">
            <div className="banner-skeleton grid gap-10">
                <div className="skeleton-image mt-5"></div>
                <div className="skeleton-details">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-date"></div>
                    <div className="skeleton-time"></div>
                    <div className="skeleton-location"></div>
                    <div className="skeleton-button"></div>
                    <div className="skeleton-title"></div>
                    <div className="skeleton-date"></div>
                    <div className="skeleton-time"></div>
                    <div className="skeleton-location"></div>
                    <div className="skeleton-button"></div>
                                        <div className="skeleton-title"></div>
                    <div className="skeleton-date"></div>
                    <div className="skeleton-time"></div>
                    <div className="skeleton-location"></div>
                    <div className="skeleton-button"></div>
                </div>
            </div>
        </div>
    );
};

export default DataEventSkeleton;