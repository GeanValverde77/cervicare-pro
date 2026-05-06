import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Heart, Calculator, Bell, FileText, GraduationCap, LogOut } from "lucide-react";
import { getPatientByEmail, type Patient } from "../../../store";
import { useAuth } from "../../../AuthContext";

const menuItems = [
  { icon: Heart, label: "Mi salud", path: "/paciente/perfil", color: "from-pink-500 to-pink-600" },
  { icon: Calculator, label: "Calculadora de riesgo", path: "/paciente/riesgo", color: "from-purple-500 to-purple-600" },
  { icon: Bell, label: "Recordatorios", path: "/paciente/recordatorios", color: "from-amber-500 to-amber-600" },
  { icon: FileText, label: "Resultados", path: "/paciente/resultados", color: "from-blue-500 to-blue-600" },
  { icon: GraduationCap, label: "Educación", path: "/paciente/educacion", color: "from-teal-500 to-teal-600" },
];

const riskBadge: Record<string, string> = {
  Alto: "bg-red-100 text-red-700",
  Moderado: "bg-amber-100 text-amber-700",
  Bajo: "bg-green-100 text-green-700",
};

export default function HomePatient() {
  const navigate = useNavigate();
  const { profile, user, signOut } = useAuth();
  const [patientRecord, setPatientRecord] = useState<Patient | null>(null);

  useEffect(() => {
    if (user?.email) {
      getPatientByEmail(user.email).then(setPatientRecord);
    }
  }, [user?.email]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/tipo-usuario");
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-purple-100 text-sm">Hola,</p>
            <h1 className="text-white text-2xl font-bold">{profile?.name ?? "..."}</h1>
          </div>
          <button onClick={handleSignOut} className="bg-white/20 backdrop-blur rounded-full p-3" title="Cerrar sesión">
            <LogOut className="text-white" size={22} />
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-auto">
        <h2 className="text-slate-800 font-bold text-lg mb-4">Mis opciones</h2>
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all`}
            >
              <item.icon size={32} className="mb-3" />
              <p className="font-semibold text-sm">{item.label}</p>
            </button>
          ))}
        </div>

        {patientRecord ? (
          <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Heart className="text-purple-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">Estado de salud</p>
                <p className="font-bold text-slate-800">Riesgo {patientRecord.risk}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${riskBadge[patientRecord.risk] ?? "bg-slate-100 text-slate-700"}`}>
                {patientRecord.risk}
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-sm text-amber-800">
              Tu médico aún no ha registrado tu ficha. Cuando lo haga, podrás ver tu información aquí.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
