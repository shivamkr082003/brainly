"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = Dashboard;
const react_1 = require("react"); // Importing React hooks to manage state and side effects
const Button_1 = require("../components/Button"); // Importing the Button component
const Card_tsx_1 = require("../components/Card.tsx"); // Importing the Card component
const CreateContentModal_tsx_1 = require("../components/CreateContentModal.tsx"); // Importing the modal to create content
const PlusIcon_1 = require("../icons/PlusIcon"); // Importing Plus icon for the 'Add content' button
const ShareIcon_1 = require("../icons/ShareIcon"); // Importing Share icon for the 'Share brain' button
const Sidebar_tsx_1 = require("../components/Sidebar.tsx"); // Importing Sidebar component for navigation
const useContent_tsx_1 = require("../hooks/useContent.tsx"); // Custom hook to fetch content
const config_1 = require("../config"); // Backend URL for API requests
const axios_1 = __importDefault(require("axios")); // Importing axios for making HTTP requests
// Dashboard component that renders the main page
function Dashboard() {
    // State to manage the modal visibility
    const [modalOpen, setModalOpen] = (0, react_1.useState)(false);
    // Custom hook to fetch content and refresh the content list
    const { contents, refresh } = (0, useContent_tsx_1.useContent)();
    // useEffect hook to refresh the content whenever the modalOpen state changes
    (0, react_1.useEffect)(() => {
        refresh();
    }, [modalOpen]);
    return (<div>
      <Sidebar_tsx_1.Sidebar /> {/* Sidebar component for navigation */}
      
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        {/* CreateContentModal component for adding new content, controlled by modalOpen state */}
        <CreateContentModal_tsx_1.CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)}/>
        
        <div className="flex justify-end gap-4">
          {/* Button to open the 'Create Content' modal */}
          <Button_1.Button onClick={() => setModalOpen(true)} variant="primary" text="Add content" startIcon={<PlusIcon_1.PlusIcon />}/>
          
          {/* Button to share the brain content */}
          <Button_1.Button onClick={() => __awaiter(this, void 0, void 0, function* () {
            // Making a POST request to share the brain content
            const response = yield axios_1.default.post(`${config_1.BACKEND_URL}/api/v1/brain/share`, {
                share: true
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token") // Passing the authorization token in the request header
                }
            });
            // Constructing the share URL and alerting the user with the link
            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
            alert(shareUrl);
        })} variant="secondary" text="Share brain" startIcon={<ShareIcon_1.ShareIcon />}/>
        </div>

        <div className="flex gap-4 flex-wrap">
          {/* Rendering the content cards dynamically from the 'contents' array */}
          {contents.map(({ type, link, title }) => (<Card_tsx_1.Card type={type} link={link} title={title}/>))}
        </div>
      </div>
    </div>);
}
