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
exports.CreateContentModal = CreateContentModal;
const react_1 = require("react"); // Importing React hooks for state management and refs
const CrossIcon_1 = require("../icons/CrossIcon"); // Importing the close icon
const Button_1 = require("./Button"); // Importing the Button component
const Input_1 = require("./Input"); // Importing the Input component for form inputs
const config_1 = require("../config"); // Importing the backend URL for API requests
const axios_1 = __importDefault(require("axios")); // Importing axios for HTTP requests
// Enum to represent different types of content
var ContentType;
(function (ContentType) {
    ContentType["Youtube"] = "youtube";
    ContentType["Twitter"] = "twitter";
})(ContentType || (ContentType = {}));
// CreateContentModal component definition
function CreateContentModal({ open, onClose }) {
    // References to the input fields for title and link
    const titleRef = (0, react_1.useRef)(null);
    const linkRef = (0, react_1.useRef)(null);
    // State to manage the selected content type
    const [type, setType] = (0, react_1.useState)(ContentType.Youtube);
    // Function to handle adding new content
    function addContent() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const title = (_a = titleRef.current) === null || _a === void 0 ? void 0 : _a.value; // Getting the title value from the input
            const link = (_b = linkRef.current) === null || _b === void 0 ? void 0 : _b.value; // Getting the link value from the input
            // Making a POST request to add new content
            yield axios_1.default.post(`${config_1.BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token") || "" // Including the authorization token
                }
            });
            // Closing the modal after adding content
            onClose();
        });
    }
    return (<div>
            {open && (
        // Modal background overlay
        <div>
                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
                    {/* Modal content container */}
                    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                        <div className="flex flex-col justify-center">
                            <span className="bg-white opacity-100 p-4 rounded fixed">
                                {/* Close button */}
                                <div className="flex justify-end">
                                    <div onClick={onClose} className="cursor-pointer">
                                        <CrossIcon_1.CrossIcon />
                                    </div>
                                </div>
                                {/* Input fields for title and link */}
                                <div>
                                    <Input_1.Input reference={titleRef} placeholder="Title"/>
                                    <Input_1.Input reference={linkRef} placeholder="Link"/>
                                </div>
                                {/* Content type selection */}
                                <div>
                                    <h1>Type</h1>
                                    <div className="flex gap-1 justify-center pb-2">
                                        {/* Button to select YouTube type */}
                                        <Button_1.Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => setType(ContentType.Youtube)}/>
                                        {/* Button to select Twitter type */}
                                        <Button_1.Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => setType(ContentType.Twitter)}/>
                                    </div>
                                </div>
                                {/* Submit button */}
                                <div className="flex justify-center">
                                    <Button_1.Button onClick={addContent} variant="primary" text="Submit"/>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>)}
        </div>);
}
