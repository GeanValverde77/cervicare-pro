import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save, CheckCircle } from "lucide-react";

export default function RegisterPatient() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    lastPap: "",
    hpvVaccine: "",
    smoking: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      navigate("/doctor/home");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (saved) {
    return (
      <div className="h-screen bg-gradient-to-br from-green-500 to-green-600 flex flex-col items-center justify-center px-6">
        <div className="bg-white/20 backdrop-blur rounded-full p-8 mb-6">
          <CheckCircle className="text-white" size={80} />
        </div>
        <h2 className="text-white text-3xl font-bold mb-2">¡Paciente registrado!</h2>
        <p className="text-green-50">Redirigiendo...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/doctor/home")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Registrar Paciente</h1>
        <p className="text-blue-100 text-sm mt-1">Nueva ficha clínica</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Datos básicos</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Ej: María González"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Edad</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Ej: 28"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Antecedentes</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Último PAP
                </label>
                <select
                  name="lastPap"
                  value={formData.lastPap}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Seleccionar...</option>
                  <option value="reciente">Reciente (&lt; 1 año)</option>
                  <option value="1-3años">1-3 años</option>
                  <option value="mas3años">Más de 3 años</option>
                  <option value="nunca">Nunca</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Vacuna HPV
                </label>
                <select
                  name="hpvVaccine"
                  value={formData.hpvVaccine}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Seleccionar...</option>
                  <option value="si">Vacunada</option>
                  <option value="no">No vacunada</option>
                  <option value="parcial">Vacunación parcial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tabaquismo
                </label>
                <select
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Seleccionar...</option>
                  <option value="no">No</option>
                  <option value="si">Sí</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Guardar paciente
          </button>
        </form>
      </div>
    </div>
  );
}
