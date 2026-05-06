import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar, FileText, Plus, AlertTriangle, CheckCircle } from "lucide-react";
import { getPatientById, lastPapLabel, hpvVaccineLabel, smokingLabel, type Patient } from "../../../store";

const riskStyles = {
  red:   { bg: "bg-red-50 border-red-200",   icon: "text-red-600",   text: "text-red-900",   sub: "text-red-700",   label: "Requiere atención prioritaria" },
  amber: { bg: "bg-amber-50 border-amber-200", icon: "text-amber-600", text: "text-amber-900", sub: "text-amber-700", label: "Se recomienda seguimiento regular" },
  green: { bg: "bg-green-50 border-green-200", icon: "text-green-600", text: "text-green-900", sub: "text-green-700", label: "Sin factores de riesgo relevantes" },
};

export default function PatientFile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatientById(Number(id))
      .then(setPatient)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">Cargando...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 px-6">
        <p className="text-slate-600 text-lg mb-4">Paciente no encontrada</p>
        <button onClick={() => navigate("/doctor/pacientes")} className="text-blue-600 font-semibold">
          Volver a la lista
        </button>
      </div>
    );
  }

  const rs = riskStyles[patient.riskColor as keyof typeof riskStyles] ?? riskStyles.green;

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/doctor/pacientes")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">{patient.name}</h1>
        <p className="text-blue-100 text-sm mt-1">{patient.age} años</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        {/* Risk Alert */}
        <div className={`border-2 rounded-2xl p-4 mb-4 ${rs.bg}`}>
          <div className="flex items-center gap-3">
            {patient.riskColor === "green" ? (
              <CheckCircle className={rs.icon} size={24} />
            ) : (
              <AlertTriangle className={rs.icon} size={24} />
            )}
            <div className="flex-1">
              <p className={`font-bold ${rs.text}`}>Riesgo {patient.risk}</p>
              <p className={`text-sm ${rs.sub}`}>{rs.label}</p>
            </div>
          </div>
        </div>

        {/* Datos Generales */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-4">
          <h3 className="font-bold text-slate-800 mb-4">Datos generales</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Último PAP</span>
              <span className="font-semibold text-slate-800">{lastPapLabel[patient.lastPap] ?? patient.lastPap}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Vacuna HPV</span>
              <span className="font-semibold text-slate-800">{hpvVaccineLabel[patient.hpvVaccine] ?? patient.hpvVaccine}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Tabaquismo</span>
              <span className="font-semibold text-slate-800">{smokingLabel[patient.smoking] ?? patient.smoking}</span>
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
          <p className="text-sm text-slate-400 text-center py-2">Sin resultados registrados aún</p>
        </div>

        {/* Historial */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-4">
          <h3 className="font-bold text-slate-800 mb-4">Historial</h3>
          <div className="space-y-3">
            {[
              { date: "Registro inicial", event: "Paciente registrada", icon: Calendar },
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

        {/* Action Buttons */}
        <div className="mt-2 space-y-3">
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
