"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
const ShareIcon_1 = require("../icons/ShareIcon");
// The Card component represents a styled card that can display either a YouTube video or a Twitter embed based on the type prop.
function Card({ title, link, type }) {
    return (<div>
            {/* Card Container */}
            <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
                {/* Header Section */}
                <div className="flex justify-between">
                    {/* Left Section: Title with Icon */}
                    <div className="flex items-center text-md">
                        <div className="text-gray-500 pr-2">
                            {/* Share Icon preceding the title */}
                            <ShareIcon_1.ShareIcon />
                        </div>
                        {title}
                    </div>
                    {/* Right Section: Links with Icons */}
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            {/* Clickable Share Icon that opens the link */}
                            <a href={link} target="_blank">
                                <ShareIcon_1.ShareIcon />
                            </a>
                        </div>
                        <div className="text-gray-500">
                            {/* Placeholder for another Share Icon */}
                            <ShareIcon_1.ShareIcon />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="pt-4">
                    {/* Render YouTube embed if type is "youtube" */}
                    {type === "youtube" && (<iframe className="w-full" src={link
                .replace("watch", "embed")
                .replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>)}

                    {/* Render Twitter embed if type is "twitter" */}
                    {type === "twitter" && (<blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>)}
                </div>
            </div>
        </div>);
}
