import { useNavigate } from "react-router";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";

export default function RiskResult() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/paciente/riesgo")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Resultado</h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          {/* Result Card */}
          <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl p-8 shadow-2xl mb-6 text-center">
            <div className="bg-white/20 backdrop-blur rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-white" size={40} />
            </div>
            <h2 className="text-white text-3xl font-bold mb-2">Riesgo Moderado</h2>
            <p className="text-amber-50">Se recomienda seguimiento regular</p>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
            <h3 className="font-bold text-slate-800 mb-4">Recomendaciones</h3>
            <div className="space-y-3">
              {[
                "Programar tamizaje PAP según tu edad",
                "Considerar vacunación contra HPV",
                "Seguimiento anual con tu médico",
                "Reforzar medidas preventivas",
              ].map((rec, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-teal-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-slate-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/paciente/home")}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg"
            >
              Volver al inicio
            </button>
            <button
              onClick={() => navigate("/paciente/educacion")}
              className="w-full border-2 border-purple-500 text-purple-600 font-bold py-4 rounded-xl"
            >
              Aprender más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
