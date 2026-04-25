import { useNavigate } from "react-router";
import { ArrowLeft, Stethoscope } from "lucide-react";

export default function TreatmentGuide() {
  const navigate = useNavigate();

  const treatments = [
    { diagnosis: "NIC I", management: "Seguimiento", color: "green", description: "Co-testing cada 6-12 meses" },
    { diagnosis: "NIC II", management: "Conización", color: "amber", description: "Tratamiento excisional (LEEP)" },
    { diagnosis: "NIC III", management: "Conización", color: "orange", description: "LEEP o cono frío" },
    { diagnosis: "Cáncer IA1", management: "Cirugía", color: "red", description: "Conización o histerectomía" },
    { diagnosis: "Cáncer IB-IV", management: "Radio + Quimio", color: "red", description: "Manejo oncológico" },
  ];

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate(-1)} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Manejo y Tratamiento</h1>
        <p className="text-purple-100 text-sm mt-1">Guía de conducta terapéutica</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        <div className="space-y-4">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${
                treatment.color === "green"
                  ? "border-green-500"
                  : treatment.color === "amber"
                  ? "border-amber-500"
                  : treatment.color === "orange"
                  ? "border-orange-500"
                  : "border-red-500"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800">{treatment.diagnosis}</h3>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        treatment.color === "green"
                          ? "bg-green-100 text-green-700"
                          : treatment.color === "amber"
                          ? "bg-amber-100 text-amber-700"
                          : treatment.color === "orange"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {treatment.management}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{treatment.description}</p>
                </div>
                <Stethoscope
                  className={
                    treatment.color === "green"
                      ? "text-green-600"
                      : treatment.color === "amber"
                      ? "text-amber-600"
                      : treatment.color === "orange"
                      ? "text-orange-600"
                      : "text-red-600"
                  }
                  size={20}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Decision Tree */}
        <div className="mt-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="font-bold text-lg mb-4">Árbol de Decisión</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <p className="font-semibold mb-1">Lesiones Bajo Grado</p>
              <p className="text-purple-100 text-xs">NIC I → Seguimiento conservador</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <p className="font-semibold mb-1">Lesiones Alto Grado</p>
              <p className="text-purple-100 text-xs">NIC II-III → Conización excisional</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <p className="font-semibold mb-1">Cáncer Invasor</p>
              <p className="text-purple-100 text-xs">Según estadio → Cirugía o Radio/Quimio</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <h4 className="font-bold text-amber-900 text-sm mb-2">Notas Importantes</h4>
          <ul className="text-xs text-amber-800 space-y-1">
            <li>• Siempre confirmar con biopsia antes de tratar</li>
            <li>• Discutir preservación de fertilidad cuando aplique</li>
            <li>• Coordinar con oncología en cáncer invasor</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
