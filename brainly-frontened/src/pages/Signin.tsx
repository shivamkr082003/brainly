import { useRef, useState } from "react"; 
import { Button } from "../components/Button"; 
import { Input } from "../components/Input.tsx"; 
import { BACKEND_URL } from "../config"; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function signin() {
        setLoading(true);
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            });

            const jwt = response.data.token;
            localStorage.setItem("token", jwt);

            navigate("/dashboard");
        } catch (error) {
            console.error("Signin failed", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input 
                    reference={usernameRef} 
                    placeholder="Username" 
                    aria-label="Username" 
                />
                <Input 
                    reference={passwordRef} 
                    placeholder="Password" 
                    aria-label="Password" 
                   
                />
                <div className="flex justify-center pt-4">
                    <Button 
                        onClick={signin} 
                        loading={loading} 
                        variant="primary" 
                        text="Signin" 
                        fullWidth={true} 
                    />
                </div>
            </div>
        </div>
    );
}
