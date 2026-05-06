import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Calculator } from "lucide-react";
import { saveRiskFactors } from "../../../store";

export default function RiskPatient() {
  const navigate = useNavigate();
  const [factors, setFactors] = useState({
    sexuallyActive: false,
    multiplePartners: false,
    smoker: false,
    notVaccinated: false,
  });

  const handleToggle = (key: keyof typeof factors) => {
    setFactors({ ...factors, [key]: !factors[key] });
  };

  const handleCalculate = () => {
    saveRiskFactors(factors);
    navigate("/paciente/riesgo-resultado");
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/paciente/home")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Calculadora de Riesgo</h1>
        <p className="text-purple-100 text-sm mt-1">Evalúa tus factores de riesgo</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
          <h3 className="font-bold text-slate-800 mb-4">Selecciona los que apliquen:</h3>
          <div className="space-y-3">
            {[
              { key: "sexuallyActive", label: "Vida sexual activa" },
              { key: "multiplePartners", label: "Más de 3 parejas sexuales" },
              { key: "smoker", label: "Fumadora" },
              { key: "notVaccinated", label: "No vacunada contra HPV" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-purple-300 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={factors[item.key as keyof typeof factors]}
                  onChange={() => handleToggle(item.key as keyof typeof factors)}
                  className="w-6 h-6 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <span className="flex-1 font-medium text-slate-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Esta calculadora es una herramienta orientativa. Consulta con tu médico para una evaluación completa.
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-6 pb-6">
        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
        >
          <Calculator size={20} />
          Calcular riesgo
        </button>
      </div>
    </div>
  );
}
