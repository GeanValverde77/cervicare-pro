import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, FileText, ArrowRight } from "lucide-react";

export default function ClinicalInterpretation() {
  const navigate = useNavigate();
  const [testType, setTestType] = useState("");
  const [result, setResult] = useState("");
  const [interpretation, setInterpretation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (testType === "pap" && result === "ascus") {
      setInterpretation("ASCUS: Realizar test HPV. Si HPV positivo → colposcopía. Si negativo → repetir PAP en 1 año.");
    } else if (testType === "pap" && result === "liebg") {
      setInterpretation("LIEBG: Colposcopía recomendada. Biopsia si lesión visible. Seguimiento según resultado histológico.");
    } else if (testType === "pap" && result === "lieag") {
      setInterpretation("LIEAG: COLPOSCOPÍA URGENTE con biopsia. Probable tratamiento excisional (conización).");
    } else if (testType === "hpv" && result === "positive") {
      setInterpretation("HPV positivo: Realizar PAP si no se ha hecho. PAP anormal → colposcopía. PAP normal → repetir en 1 año.");
    } else if (testType === "hpv" && result === "hpv16-18") {
      setInterpretation("HPV 16/18: COLPOSCOPÍA INMEDIATA independiente del PAP. Alto riesgo de progresión.");
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate(-1)} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Interpretación Clínica</h1>
        <p className="text-teal-100 text-sm mt-1">Análisis y conducta sugerida</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Tipo de estudio</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Estudio realizado
                </label>
                <select
                  value={testType}
                  onChange={(e) => {
                    setTestType(e.target.value);
                    setResult("");
                    setInterpretation("");
                  }}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                >
                  <option value="">Seleccionar...</option>
                  <option value="pap">Papanicolaou (PAP)</option>
                  <option value="hpv">Test HPV</option>
                  <option value="colposcopy">Colposcopía</option>
                </select>
              </div>

              {testType === "pap" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Resultado PAP
                  </label>
                  <select
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="normal">Normal (NILM)</option>
                    <option value="ascus">ASCUS</option>
                    <option value="liebg">LIEBG</option>
                    <option value="lieag">LIEAG</option>
                  </select>
                </div>
              )}

              {testType === "hpv" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Resultado HPV
                  </label>
                  <select
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="negative">Negativo</option>
                    <option value="positive">Positivo (alto riesgo)</option>
                    <option value="hpv16-18">HPV 16/18 detectado</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
          >
            <FileText size={20} />
            Generar interpretación
          </button>
        </form>

        {/* Interpretation Result */}
        {interpretation && (
          <div className="mt-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight size={20} />
              <h3 className="font-bold text-lg">Conducta Sugerida</h3>
            </div>
            <p className="leading-relaxed">{interpretation}</p>
          </div>
        )}

        {/* Reference Guide */}
        <div className="mt-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-3 text-sm">Guía Rápida</h4>
          <div className="space-y-2 text-xs">
            <div className="pb-2 border-b border-slate-100">
              <p className="font-semibold text-slate-700">ASCUS → Test HPV</p>
            </div>
            <div className="pb-2 border-b border-slate-100">
              <p className="font-semibold text-slate-700">LIEBG → Colposcopía</p>
            </div>
            <div className="pb-2 border-b border-slate-100">
              <p className="font-semibold text-slate-700">LIEAG → Colposcopía urgente</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700">HPV 16/18 → Colposcopía inmediata</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
