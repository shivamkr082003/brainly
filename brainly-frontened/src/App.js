"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Signin_tsx_1 = require("./pages/Signin.tsx"); // Importing the Signin page component
const Signup_tsx_1 = require("./pages/Signup.tsx"); // Importing the Signup page component
const react_router_dom_1 = require("react-router-dom"); // Importing Router components from react-router-dom for routing
const dashboard_tsx_1 = require("./pages/dashboard.tsx"); // Importing the Dashboard page component
// App component to define the routing structure of the application
function App() {
    return (<react_router_dom_1.BrowserRouter>
      {/* BrowserRouter is the main wrapper for routing in React */}
      <react_router_dom_1.Routes>
        {/* Defining the routes for each page of the application */}
        <react_router_dom_1.Route path="/signup" element={<Signup_tsx_1.Signup />}/> {/* Route for signup page */}
        <react_router_dom_1.Route path="/signin" element={<Signin_tsx_1.Signin />}/> {/* Route for signin page */}
        <react_router_dom_1.Route path="/dashboard" element={<dashboard_tsx_1.Dashboard />}/> {/* Route for dashboard page */}
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App; // Exporting the App component as the default export
