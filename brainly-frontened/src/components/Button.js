"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = Button;
// Mapping button variants to their respective CSS classes
const variantClasses = {
    "primary": "bg-purple-600 text-white", // Styles for primary variant
    "secondary": "bg-purple-200 text-purple-600", // Styles for secondary variant
};
// Default CSS classes for all buttons
const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"; //items-center is for vertically allignment of the item to be center
// The Button functional component
function Button({ variant, text, startIcon, onClick, fullWidth, loading }) {
    return (
    // A button element with dynamic class names and properties
    <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""}`} disabled={loading}>
            {/* Container for optional start icon */}
            <div className="pr-2">
                {startIcon}
            </div>
            {/* Button text */}
            {text}
        </button>);
}
