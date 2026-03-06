import { getEmployeesByBusinessId } from "@api/getEmployees";
import { AppHeader } from "@components/Header/AppHeader";
import { PersonalModal } from "@components/Modals/PersonalModal";
import { PersonalTable } from "@components/Tables/PersonalTable";
import { IEmployee, IEmployeeResponse } from "@interfaces/IEmployee";
import { Card, CardContent, CardHeader } from "@ui/card";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";
import { IService } from "@interfaces/IService";
import { getServiceByBusinessId } from "@api/getServices";
import { Button } from "@ui/button";
import { FooterSimple } from "@components/Footer/FooterSimple";
import { getMySubscription, ISubscription } from "@api/getSubscription";
import { EmployeeRol } from "@enum/EmployeeRol";
import { MOCK_EMPLOYEES, MOCK_SERVICES } from "../../mocks/mockData";
import AppSidebar from "@components/Sidebar/AppSidebar";

const TIER_LIMITS = {
  BASIC: 1,
  PROFESSIONAL: 5,
  ENTERPRISE: 9999,
};

export const Personal = () => {
  const [empleados, setEmpleados] = useState<IEmployeeResponse[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const [selectedPersonal, setSelectedPersonal] = useState<IEmployee | null>(
    null,
  );
  const { businessId, isAuthenticated } = useAuth();

  const loadEmployees = async () => {
    const bId = businessId || (import.meta.env.DEV ? "1" : null);
    if (!bId) return;
    setLoading(true);
    try {
      const data = await getEmployeesByBusinessId(Number(bId));
      // Check if data is a valid array and not an HTML string or null
      if (Array.isArray(data) && data.length > 0) {
        setEmpleados(data);
      } else if (import.meta.env.DEV) {
        setEmpleados(MOCK_EMPLOYEES);
      } else {
        setEmpleados([]);
      }
    } catch (error) {
      if (import.meta.env.DEV) setEmpleados(MOCK_EMPLOYEES);
      else setEmpleados([]);
    }
    setLoading(false);
  };

  const loadServices = async () => {
    const bId = businessId || (import.meta.env.DEV ? "1" : null);
    if (!bId) return;
    setLoading(true);
    try {
      const data = await getServiceByBusinessId(Number(bId));
      // Check if data is a valid array and not an HTML string or null
      if (Array.isArray(data) && data.length > 0) {
        setServices(data);
      } else if (import.meta.env.DEV) {
        setServices(MOCK_SERVICES);
      } else {
        setServices([]);
      }
    } catch (error) {
      if (import.meta.env.DEV) setServices(MOCK_SERVICES);
      else setServices([]);
    }
    setLoading(false);
  };

  const loadSubscription = async () => {
    try {
      const sub = await getMySubscription();
      // Verify sub is a valid object and has the tier property
      if (sub && typeof sub === "object" && "tier" in sub) {
        setSubscription(sub);
      } else if (import.meta.env.DEV) {
        setSubscription({
          tier: "PROFESSIONAL",
          id: 1, // Changed to number to match interface
          status: "ACTIVE", // Changed to uppercase to match interface
          startDate: new Date().toISOString(),
          endDate: null,
          userId: 1,
        });
      }
    } catch {
      if (import.meta.env.DEV) {
        setSubscription({
          tier: "PROFESSIONAL",
          id: 1,
          status: "ACTIVE",
          startDate: new Date().toISOString(),
          endDate: null,
          userId: 1,
        });
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated || import.meta.env.DEV) {
      loadEmployees();
      loadServices();
      loadSubscription();
    }
  }, [isAuthenticated]);

  const maxEmployees = subscription ? TIER_LIMITS[subscription.tier] : 0;
  const isLimitReached = empleados.length >= maxEmployees;

  return (
    <div className="flex min-h-screen w-full bg-[#FFFFFF]">
      <AppSidebar />
      <div className="flex flex-col flex-1 animate-in fade-in duration-500">
        <div className="flex-1 p-6 md:p-10 space-y-4 max-w-7xl mx-auto w-full">
          <AppHeader title="Personal" />
          <p className="text-slate-500 text-base">
            Gestiona tu equipo de trabajo.
          </p>
          <Card className="w-full border border-gray-100 shadow-sm mt-6 rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 pb-6 border-b border-gray-100 px-6 py-6">
              <span className="text-xl font-bold text-slate-800">
                Listado de Empleados
              </span>
              <div className="flex flex-col sm:items-end gap-2">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 shadow-md text-white cursor-pointer px-6 rounded-xl"
                  onClick={() => setOpenModal(true)}
                  disabled={isLimitReached}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Empleado
                </Button>
                {subscription && (
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Plan {subscription.tier}: {empleados.length} /{" "}
                    {maxEmployees}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <PersonalTable
                  employees={empleados}
                  loading={loading}
                  onEdit={(employee) => {
                    const mapped: IEmployee = {
                      id: Number(employee.id),
                      name: employee.name,
                      email: employee.email,
                      servicesIds: employee.services
                        ? employee.services.map((s) => Number(s.id))
                        : [],
                      businessId: employee.businessId,
                      role: employee.role,
                      employeeHours: employee.employeeHours || [],
                    };

                    setSelectedPersonal(mapped);
                    setOpenModal(true);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <FooterSimple />

        <PersonalModal
          services={services}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedPersonal(null);
          }}
          onPersonalCreated={loadEmployees}
          employee={selectedPersonal}
        />
      </div>
    </div>
  );
};
