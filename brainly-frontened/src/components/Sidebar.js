"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = Sidebar;
const Logo_1 = require("../icons/Logo");
const TwitterIcon_1 = require("../icons/TwitterIcon");
const YoutubeIcon_1 = require("../icons/YoutubeIcon");
const SidebarItem_1 = require("./SidebarItem");
function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-600">
                <Logo_1.Logo />
            </div>
            Brainly
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem_1.SidebarItem text="Twitter" icon={<TwitterIcon_1.TwitterIcon />}/>
            <SidebarItem_1.SidebarItem text="Youtube" icon={<YoutubeIcon_1.YoutubeIcon />}/>
        </div>
    </div>;
}
