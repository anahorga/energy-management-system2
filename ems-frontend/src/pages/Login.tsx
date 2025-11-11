import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
    const { login } = useAuth();
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null); setLoading(true);
        try {
            await login(form.username, form.password);
            window.location.href = "/"; // App decide unde te duce în funcție de rol
        } catch (e: any) {
            setErr(e?.response?.data?.error || e?.message || "Login failed");
        } finally { setLoading(false); }
    };

    return (
        <div style={{ maxWidth: 360, margin: "80px auto", fontFamily: "sans-serif" }}>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <label>Username
                    <input value={form.username} onChange={e=>setForm(s=>({...s,username:e.target.value}))}/>
                </label>
                <label>Password
                    <input type="password" value={form.password} onChange={e=>setForm(s=>({...s,password:e.target.value}))}/>
                </label>
                <button disabled={loading}>{loading?"Signing in...":"Sign in"}</button>
                {err && <p style={{color:"crimson"}}>{err}</p>}
            </form>
        </div>
    );
};
export default Login;
