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
exports.Signin = Signin;
const react_1 = require("react");
const Button_1 = require("../components/Button");
const Input_tsx_1 = require("../components/Input.tsx");
const config_1 = require("../config");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
function Signin() {
    const usernameRef = (0, react_1.useRef)(null);
    const passwordRef = (0, react_1.useRef)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    function signin() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            setLoading(true);
            try {
                const username = (_a = usernameRef.current) === null || _a === void 0 ? void 0 : _a.value;
                const password = (_b = passwordRef.current) === null || _b === void 0 ? void 0 : _b.value;
                const response = yield axios_1.default.post(config_1.BACKEND_URL + "/api/v1/signin", {
                    username,
                    password
                });
                const jwt = response.data.token;
                localStorage.setItem("token", jwt);
                navigate("/dashboard");
            }
            catch (error) {
                console.error("Signin failed", error);
            }
            finally {
                setLoading(false);
            }
        });
    }
    return (<div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input_tsx_1.Input reference={usernameRef} placeholder="Username" aria-label="Username"/>
                <Input_tsx_1.Input reference={passwordRef} placeholder="Password" aria-label="Password"/>
                <div className="flex justify-center pt-4">
                    <Button_1.Button onClick={signin} loading={loading} variant="primary" text="Signin" fullWidth={true}/>
                </div>
            </div>
        </div>);
}
