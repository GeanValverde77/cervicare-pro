import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { getRiskFactors, calcRiskFromFactors, saveRiskAssessment } from "../../../store";
import { useAuth } from "../../../AuthContext";

const recommendationsByLevel: Record<string, string[]> = {
  Bajo: [
    "Continúa con tus controles ginecológicos anuales",
    "Mantén tu vacunación al día",
    "Lleva una alimentación saludable",
    "Sigue las guías de tamizaje para tu edad",
  ],
  Moderado: [
    "Programar tamizaje PAP según tu edad",
    "Considerar vacunación contra HPV si no estás vacunada",
    "Seguimiento anual con tu médico",
    "Reforzar medidas preventivas",
  ],
  Alto: [
    "Consultar con tu médico lo antes posible",
    "Realizar tamizaje PAP urgente",
    "Vacunación contra HPV si aplica",
    "No posponer la evaluación clínica",
  ],
};

const cardColors: Record<string, string> = {
  green: "from-green-400 to-green-500",
  amber: "from-amber-400 to-amber-500",
  red: "from-red-400 to-red-500",
};

export default function RiskResult() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const factors = getRiskFactors();
  const result = calcRiskFromFactors(factors ?? { sexuallyActive: false, multiplePartners: false, smoker: false, notVaccinated: false });

  useEffect(() => {
    if (user?.email && factors) {
      saveRiskAssessment(user.email, factors, result.level, result.color);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const recommendations = recommendationsByLevel[result.level] ?? recommendationsByLevel.Moderado;

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
          <div className={`bg-gradient-to-br ${cardColors[result.color]} rounded-3xl p-8 shadow-2xl mb-6 text-center`}>
            <div className="bg-white/20 backdrop-blur rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              {result.color === "green" ? (
                <CheckCircle className="text-white" size={40} />
              ) : (
                <AlertTriangle className="text-white" size={40} />
              )}
            </div>
            <h2 className="text-white text-3xl font-bold mb-2">Riesgo {result.level}</h2>
            <p className="text-white/80">{result.description}</p>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
            <h3 className="font-bold text-slate-800 mb-4">Recomendaciones</h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
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
