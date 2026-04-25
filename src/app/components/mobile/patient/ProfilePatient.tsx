import { useNavigate } from "react-router";
import { ArrowLeft, Calendar, Syringe, AlertTriangle, Edit } from "lucide-react";

export default function ProfilePatient() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/paciente/home")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Mi Perfil de Salud</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-4">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">María González</h2>
              <p className="text-slate-600">26 años</p>
            </div>
            <button className="bg-purple-100 text-purple-600 p-2 rounded-full">
              <Edit size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">Último PAP</p>
                <p className="font-bold text-slate-800">Marzo 2023</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="bg-red-100 p-3 rounded-full">
                <Syringe className="text-red-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">Vacuna HPV</p>
                <p className="font-bold text-slate-800">No vacunada</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertTriangle className="text-amber-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-amber-600">Nivel de riesgo</p>
                <p className="font-bold text-amber-800">Moderado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Información adicional</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Inicio vida sexual</span>
              <span className="font-semibold text-slate-800">18 años</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Número de parejas</span>
              <span className="font-semibold text-slate-800">4</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Fumadora</span>
              <span className="font-semibold text-slate-800">No</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Última actualización</span>
              <span className="font-semibold text-slate-800">21 Abr 2026</span>
            </div>
          </div>
        </div>

        <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg">
          Actualizar datos
        </button>
      </div>
    </div>
  );
}
