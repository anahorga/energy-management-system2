import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import { getUserIdFromToken } from "../lib/jwt";
import type { DeviceDto } from "../types/device";

const MyDevices: React.FC = () => {
    const [devices, setDevices] = useState<DeviceDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        const userId = getUserIdFromToken();
        if (!userId) {
            setErr("Missing user id in token");
            setLoading(false);
            return;
        }
        (async () => {
            try {
                const { data } = await api.get<DeviceDto[]>(`/api/devices/${userId}`);
                setDevices(data);
            } catch (e: any) {
                setErr(e?.response?.data?.error || e?.message || "Failed to load devices");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <div style={{ padding: 24 }}>Loading devices…</div>;
    if (err) return <div style={{ padding: 24, color: "crimson" }}>{err}</div>;

    return (
        <div style={{ padding: 24, fontFamily: "sans-serif" }}>
            <h2>My devices</h2>
            {devices.length === 0 ? (
                <p>No devices assigned.</p>
            ) : (
                <ul style={{ marginTop: 12 }}>
                    {devices.map(d => (
                        <li key={d.id} style={{ marginBottom: 8 }}>
                            <strong>{d.name}</strong>
                            <div>Consumption: {d.consumption}</div>
                            <small>Device ID: {d.id}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyDevices;
