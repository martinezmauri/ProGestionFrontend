import React, { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";
import { AppHeader } from "@components/Header/AppHeader";
import { FooterSimple } from "@components/Footer/FooterSimple";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { UserCircle, Save, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { updateUser, UpdateUserPayload } from "@api/updateUser";
import api from "@api/axiosInstance";

export const UserSettings = () => {
    const { userInfo, userId } = useAuth();
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    // User profile state
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // Password state
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/user/me");
                if (res.data) {
                    setName(res.data.name || "");
                    setPhone(res.data.phoneNumber || "");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            } finally {
                setDataLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleSaveProfile = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const payload: UpdateUserPayload = {
                name,
                phoneNumber: phone
            };
            await updateUser(userId, payload);
            toast.success("Perfil actualizado correctamente");
        } catch (error) {
            toast.error("Error al actualizar el perfil");
        } finally {
            setLoading(false);
        }
    };

    const handleSavePassword = async () => {
        if (!userId) return;
        if (newPassword !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setLoading(true);
        try {
            const payload: UpdateUserPayload = {
                password: newPassword
            };
            await updateUser(userId, payload);
            toast.success("Contraseña actualizada correctamente");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error("Error al actualizar la contraseña");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 w-full animate-in fade-in duration-500">
            <div className="flex-1 p-6 md:p-10 space-y-6 max-w-4xl mx-auto w-full">
                <AppHeader title="Configuración de Cuenta" />
                <p className="text-slate-500 text-base mb-8">
                    Administra tus datos personales y credenciales de acceso.
                </p>

                <div className="space-y-6">
                    {/* Perfil Card */}
                    <Card className="border-0 shadow-sm overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-sky-500 to-sky-400 text-white px-6 py-4">
                            <CardTitle className="flex items-center text-lg font-semibold">
                                <UserCircle className="w-5 h-5 mr-2" />
                                Datos de Perfil
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ej: Juan Pérez"
                                        className="bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Número de Teléfono</Label>
                                    <Input
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Ej: +54 9 11 1234-5678"
                                        className="bg-white"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input
                                        id="email"
                                        value={userInfo?.email || ""}
                                        disabled
                                        className="bg-slate-50 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-slate-400">El correo electrónico no puede ser modificado.</p>
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={handleSaveProfile}
                                    disabled={loading || !name}
                                    className="bg-sky-600 hover:bg-sky-700 text-white"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Guardar Cambios
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Seguridad Card */}
                    <Card className="border-0 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-100 border-b px-6 py-4">
                            <CardTitle className="flex items-center text-lg font-semibold text-slate-800">
                                <KeyRound className="w-5 h-5 mr-2 text-slate-600" />
                                Seguridad
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">Nueva Contraseña</Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-white"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={handleSavePassword}
                                    disabled={loading || !newPassword || !confirmPassword}
                                    variant="outline"
                                    className="border-slate-300 text-slate-700 hover:bg-slate-50"
                                >
                                    <KeyRound className="w-4 h-4 mr-2" />
                                    Actualizar Contraseña
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <FooterSimple />
        </div>
    );
};
