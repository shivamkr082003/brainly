"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = Input;
// Input component definition
function Input({ placeholder, reference }) {
    return (<div>
            {/* Input field with the provided placeholder and reference */}
            <input ref={reference} // Attaching the reference to the input field
     placeholder={placeholder} // Setting the placeholder text for the input field
     type={"text"} // Defining the input type as text
     className="px-4 py-2 border rounded m-2" // Tailwind CSS classes for styling the input field
    />
        </div>);
}
