import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search } from "lucide-react";
import { getPatients, type Patient } from "../../../store";

export default function PatientList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatients()
      .then(setAllPatients)
      .finally(() => setLoading(false));
  }, []);

  const patients = allPatients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/doctor/home")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Lista de Pacientes</h1>
        <p className="text-blue-100 text-sm mt-1">{allPatients.length} pacientes registradas</p>
      </div>

      {/* Search */}
      <div className="px-6 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Patient List */}
      <div className="flex-1 px-6 overflow-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-slate-500">Cargando pacientes...</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-slate-400">{search ? "Sin resultados" : "No hay pacientes registradas aún"}</p>
          </div>
        ) : (
          <div className="space-y-3 pb-6">
            {patients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => navigate(`/doctor/ficha/${patient.id}`)}
                className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-200 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 mb-1">{patient.name}</h3>
                    <p className="text-sm text-slate-600">{patient.age} años</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        patient.riskColor === "red"
                          ? "bg-red-100 text-red-700"
                          : patient.riskColor === "amber"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {patient.risk}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
