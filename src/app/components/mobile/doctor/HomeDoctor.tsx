import { useNavigate } from "react-router";
import { Users, AlertTriangle, Calendar, BarChart3, UserPlus, List, User } from "lucide-react";

export default function HomeDoctor() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm">Bienvenido/a,</p>
            <h1 className="text-white text-2xl font-bold">Dra. Ana Martínez</h1>
          </div>
          <button className="bg-white/20 backdrop-blur rounded-full p-3">
            <User className="text-white" size={24} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 py-6">
        <h2 className="text-slate-800 font-bold text-lg mb-4">Panel de control</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="text-blue-600" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">128</p>
            <p className="text-sm text-slate-600">Pacientes registradas</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-100 p-2 rounded-lg">
                <AlertTriangle className="text-red-600" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">32</p>
            <p className="text-sm text-slate-600">Pacientes alto riesgo</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Calendar className="text-amber-600" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">54</p>
            <p className="text-sm text-slate-600">Controles pendientes</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <BarChart3 className="text-green-600" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">76%</p>
            <p className="text-sm text-slate-600">Cobertura tamizaje</p>
          </div>
        </div>

        {/* Quick Actions */}
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

        {/* Recent Alerts */}
        <div className="mt-6">
          <h3 className="text-slate-800 font-bold mb-3">Alertas recientes</h3>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-600" size={20} />
              <div className="flex-1">
                <p className="font-semibold text-red-900 text-sm">María González</p>
                <p className="text-xs text-red-700">PAP vencido hace 4 años</p>
              </div>
              <button className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-semibold">
                Ver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
