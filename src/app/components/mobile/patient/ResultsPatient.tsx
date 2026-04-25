import { useNavigate } from "react-router";
import { ArrowLeft, FileText, ArrowRight } from "lucide-react";

export default function ResultsPatient() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/paciente/home")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Mis Resultados</h1>
        <p className="text-blue-100 text-sm mt-1">Historial de exámenes</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        {/* Latest Result */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Último resultado</h3>
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
              RECIENTE
            </span>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-200 p-2 rounded-full">
                <FileText className="text-amber-700" size={20} />
              </div>
              <div>
                <p className="font-bold text-amber-900 text-lg">PAP: ASCUS</p>
                <p className="text-sm text-amber-700">15 de Marzo, 2026</p>
              </div>
            </div>

            <div className="bg-white/60 rounded-lg p-4">
              <p className="text-sm text-slate-700 mb-3">
                <strong>Interpretación:</strong> Células escamosas atípicas de significado indeterminado
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <ArrowRight className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-blue-800">
                    <strong>Recomendación:</strong> Se recomienda repetir PAP en 1 año o realizar test HPV
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl">
            Descargar resultado completo
          </button>
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Historial</h3>
          <div className="space-y-3">
            {[
              { date: "15 Mar 2026", test: "PAP", result: "ASCUS", status: "amber" },
              { date: "10 Ene 2023", test: "PAP", result: "Normal", status: "green" },
              { date: "05 Feb 2020", test: "PAP", result: "Normal", status: "green" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-semibold text-slate-800">{item.test}</p>
                  <p className="text-xs text-slate-600">{item.date}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      item.status === "green"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
