import React, { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";
import { getBusinessById, PropsBusiness } from "@api/getBusiness";
import { updateBusiness, UpdateBusinessPayload } from "@api/updateBusiness";
import { AppHeader } from "@components/Header/AppHeader";
import { FooterSimple } from "@components/Footer/FooterSimple";
import { BusinessForm } from "@components/Forms/BusinessForm";
import { AddressForm } from "@components/Forms/AddressForm";
import { IBusiness } from "@interfaces/IBusiness";
import { IAddress } from "@interfaces/IAddress";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

export const BusinessSettings = () => {
    const { session, userProfile } = useAuth();
    const isAuthenticated = !!session;
    const businessId: string | null = userProfile?.businessId != null ? String(userProfile.businessId) : null;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [businessData, setBusinessData] = useState<IBusiness>({
        name: "",
        description: "",
        phoneNumber: "",
        logo: "",
        userId: "",
        categoryId: "",
    });

    const [addressData, setAddressData] = useState<IAddress>({
        street: "",
        streetNumber: "",
        city: "",
        province: "",
        country: "",
    });

    const [step, setStep] = useState(1);

    const loadData = async () => {
        if (!businessId) return;
        setLoading(true);
        try {
            const data = await getBusinessById(String(businessId));
            if (data) {
                setBusinessData({
                    name: data.name || "",
                    description: (data as any).description || "",
                    phoneNumber: data.phoneNumber || "",
                    logo: data.logo || "",
                    userId: "",
                    categoryId: data.category ? String(data.category.id) : "",
                });

                if (data.address) {
                    setAddressData({
                        street: data.address.street || "",
                        streetNumber: data.address.streetNumber || "",
                        city: data.address.city || "",
                        province: data.address.province || "",
                        country: data.address.country || "",
                    });
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Error cargando configuración del negocio.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && businessId) {
            loadData();
        }
    }, [isAuthenticated, businessId]);

    const handleSavePrimary = () => {
        setStep(2);
    };

    const handleSaveFinal = async () => {
        if (!businessId) return;

        try {
            setSaving(true);
            const payload: UpdateBusinessPayload = {
                name: businessData.name,
                description: businessData.description,
                phoneNumber: businessData.phoneNumber,
                logo: businessData.logo,
                categoryId: businessData.categoryId,
                address: addressData
            };

            await updateBusiness(businessId, payload);
            toast.success("Información del negocio actualizada correctamente");
            setStep(1);
        } catch (error) {
            toast.error("Error al actualizar la empresa");
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (!businessId) {
        return <div>Cargando datos del negocio...</div>;
    }

    if (loading) {
        return (
            <div className="flex flex-col flex-1 items-center justify-center min-h-[50vh]">
                <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mb-3" />
                <p className="text-slate-600 font-medium">Cargando datos de la empresa...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 w-full animate-in fade-in duration-500">
            <div className="flex-1 p-6 md:p-10 space-y-6 max-w-4xl mx-auto w-full">
                <AppHeader title="Configuración de la Empresa" />
                <p className="text-slate-500 text-base">
                    Mantén la información de tu negocio actualizada.
                </p>

                <div className="mt-8 space-y-8">
                    {step === 1 && (
                        <div className="animate-in slide-in-from-left-4 duration-300">
                            <BusinessForm
                                registerData={businessData as any}
                                setRegisterData={setBusinessData as any}
                                onContinue={handleSavePrimary}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <div className="flex items-center gap-2 mb-4 text-sky-600 cursor-pointer hover:underline" onClick={() => setStep(1)}>
                                <span>&larr; Volver a datos principales</span>
                            </div>
                            <AddressForm
                                addressData={addressData}
                                setAddressData={setAddressData}
                                onContinue={handleSaveFinal}
                            />
                        </div>
                    )}
                </div>
            </div>
            <FooterSimple />
        </div>
    );
};
