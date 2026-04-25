import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar, FileText, Plus, AlertTriangle } from "lucide-react";

export default function PatientFile() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/doctor/pacientes")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Ana Pérez</h1>
        <p className="text-blue-100 text-sm mt-1">34 años • ID: {id}</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        {/* Risk Alert */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={24} />
            <div className="flex-1">
              <p className="font-bold text-red-900">Riesgo Alto</p>
              <p className="text-sm text-red-700">Requiere atención prioritaria</p>
            </div>
          </div>
        </div>

        {/* Datos Generales */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-4">
          <h3 className="font-bold text-slate-800 mb-4">Datos generales</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Último PAP</span>
              <span className="font-semibold text-slate-800">Hace 4 años</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Vacuna HPV</span>
              <span className="font-semibold text-slate-800">No vacunada</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Tabaquismo</span>
              <span className="font-semibold text-slate-800">Sí</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Parejas sexuales</span>
              <span className="font-semibold text-slate-800">5</span>
            </div>
          </div>
        </div>

        {/* Resultados PAP */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Resultados PAP</h3>
            <button
              onClick={() => navigate("/doctor/interpretacion")}
              className="bg-blue-100 text-blue-600 p-2 rounded-full"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-800">ASCUS</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                  2022
                </span>
              </div>
              <p className="text-xs text-slate-600">Recomendado: Test HPV</p>
            </div>
          </div>
        </div>

        {/* Historial */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-4">
          <h3 className="font-bold text-slate-800 mb-4">Historial</h3>
          <div className="space-y-3">
            {[
              { date: "15 Mar 2026", event: "Consulta programada", icon: Calendar },
              { date: "10 Feb 2022", event: "PAP: ASCUS", icon: FileText },
              { date: "05 Ene 2018", event: "PAP: Normal", icon: FileText },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <item.icon className="text-blue-600" size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">{item.event}</p>
                  <p className="text-xs text-slate-600">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recordatorios */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="font-bold text-amber-900 mb-2">Recordatorio</h3>
          <p className="text-sm text-amber-800">
            PAP vencido hace 4 años. Programar tamizaje urgente.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/doctor/interpretacion")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-xl"
          >
            Agregar resultado
          </button>
          <button
            onClick={() => navigate("/doctor/tratamiento")}
            className="w-full border-2 border-blue-500 text-blue-600 font-bold py-3 rounded-xl"
          >
            Ver guía de tratamiento
          </button>
        </div>
      </div>
    </div>
  );
}
