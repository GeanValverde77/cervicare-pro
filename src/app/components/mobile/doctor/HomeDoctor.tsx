import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Users, AlertTriangle, BarChart3, UserPlus, List, User, LogOut } from "lucide-react";
import { getPatients } from "../../../store";
import { useAuth } from "../../../AuthContext";

export default function HomeDoctor() {
  const navigate = useNavigate();
  const { profile, user, signOut } = useAuth();
  const [totalPatients, setTotalPatients] = useState(0);
  const [highRisk, setHighRisk] = useState(0);

  useEffect(() => {
    if (!user?.id) return;
    getPatients(user.id).then((patients) => {
      setTotalPatients(patients.length);
      setHighRisk(patients.filter((p) => p.risk === "Alto").length);
    });
  }, [user?.id]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/tipo-usuario");
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-auto">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm">Bienvenido/a,</p>
            <h1 className="text-white text-2xl font-bold">{profile?.name ?? "..."}</h1>
          </div>
          <button onClick={handleSignOut} className="bg-white/20 backdrop-blur rounded-full p-3" title="Cerrar sesión">
            <LogOut className="text-white" size={22} />
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        <h2 className="text-slate-800 font-bold text-lg mb-4">Panel de control</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="bg-blue-100 p-2 rounded-lg w-fit mb-2">
              <Users className="text-blue-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-800">{totalPatients}</p>
            <p className="text-sm text-slate-600">Pacientes registradas</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="bg-red-100 p-2 rounded-lg w-fit mb-2">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-800">{highRisk}</p>
            <p className="text-sm text-slate-600">Pacientes alto riesgo</p>
          </div>
        </div>

        <h3 className="text-slate-800 font-bold mb-4">Acciones rápidas</h3>
        <div className="space-y-3">
          <button
            onClick={() => navigate("/doctor/pacientes")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg flex items-center gap-3"
          >
            <List size={24} />
            <span className="font-bold">Ver pacientes</span>
          </button>
          <button
            onClick={() => navigate("/doctor/registrar")}
            className="w-full bg-white border-2 border-blue-500 text-blue-600 rounded-xl p-4 flex items-center gap-3"
          >
            <UserPlus size={24} />
            <span className="font-bold">Registrar paciente</span>
          </button>
          <button
            onClick={() => navigate("/doctor/estadisticas")}
            className="w-full bg-white border-2 border-slate-300 text-slate-700 rounded-xl p-4 flex items-center gap-3"
          >
            <BarChart3 size={24} />
            <span className="font-bold">Ver estadísticas</span>
          </button>
        </div>

        {highRisk > 0 && (
          <div className="mt-6">
            <h3 className="text-slate-800 font-bold mb-3">Alerta</h3>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-red-600" size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-red-900 text-sm">{highRisk} paciente{highRisk > 1 ? "s" : ""} con riesgo alto</p>
                  <p className="text-xs text-red-700">Requieren atención prioritaria</p>
                </div>
                <button onClick={() => navigate("/doctor/pacientes")} className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-semibold">
                  Ver
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
