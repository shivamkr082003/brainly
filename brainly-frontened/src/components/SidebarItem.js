"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarItem = SidebarItem;
// SidebarItem component definition
function SidebarItem({ text, icon }) {
    return (<div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150">
            {/* Icon section */}
            <div className="pr-2">
                {icon} {/* Rendering the passed icon */}
            </div>
            {/* Text section */}
            <div>
                {text} {/* Rendering the passed text */}
            </div>
        </div>);
}
