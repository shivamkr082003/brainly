import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input.tsx";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Please fill in both username and password.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });

            alert("You have signed up!");
            navigate("/signin");
        } catch (error: any) {
            console.error("Signup failed", error);
            alert(error?.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input reference={usernameRef} placeholder="Username" aria-label="Username" />
                <Input reference={passwordRef} placeholder="Password" aria-label="Password" />
                <div className="flex justify-center pt-4">
                    <Button
                        onClick={signup}
                        loading={loading}
                        variant="primary"
                        text="Signup"
                        fullWidth={true}
                    />
                </div>
            </div>
        </div>
    );
}
