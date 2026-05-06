import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Calendar, Syringe, AlertTriangle, CheckCircle } from "lucide-react";
import { getPatientByEmail, lastPapLabel, hpvVaccineLabel, smokingLabel, type Patient } from "../../../store";
import { useAuth } from "../../../AuthContext";

export default function ProfilePatient() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      getPatientByEmail(user.email)
        .then(setPatient)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  const riskIcon = patient?.riskColor === "red" || patient?.riskColor === "amber"
    ? <AlertTriangle className="text-amber-600" size={20} />
    : <CheckCircle className="text-green-600" size={20} />;

  const riskBg = patient?.riskColor === "red"
    ? "bg-red-50 border-red-200"
    : patient?.riskColor === "amber"
    ? "bg-amber-50 border-amber-200"
    : "bg-green-50 border-green-200";

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/paciente/home")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Mi Perfil de Salud</h1>
      </div>

      <div className="flex-1 px-6 py-6 overflow-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-slate-500">Cargando...</p>
          </div>
        ) : !patient ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
            <p className="text-amber-800 font-semibold mb-2">Ficha no encontrada</p>
            <p className="text-sm text-amber-700">
              Tu médico debe registrarte con el correo <strong>{user?.email}</strong> para que puedas ver tu información aquí.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-4">
              <h2 className="text-xl font-bold text-slate-800 mb-1">{profile?.name ?? patient.name}</h2>
              <p className="text-slate-600 mb-6">{patient.age} años</p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Último PAP</p>
                    <p className="font-bold text-slate-800">{lastPapLabel[patient.lastPap] ?? patient.lastPap}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Syringe className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Vacuna HPV</p>
                    <p className="font-bold text-slate-800">{hpvVaccineLabel[patient.hpvVaccine] ?? patient.hpvVaccine}</p>
                  </div>
                </div>

                <div className={`flex items-center gap-4 p-4 rounded-xl border ${riskBg}`}>
                  <div className="bg-white p-3 rounded-full">
                    {riskIcon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Nivel de riesgo</p>
                    <p className="font-bold text-slate-800">{patient.risk}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4">Información adicional</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Tabaquismo</span>
                  <span className="font-semibold text-slate-800">{smokingLabel[patient.smoking] ?? patient.smoking}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Correo registrado</span>
                  <span className="font-semibold text-slate-800">{user?.email}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
