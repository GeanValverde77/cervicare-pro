import { useNavigate } from "react-router";
import { User, Stethoscope, ArrowLeft } from "lucide-react";

export default function UserTypeSelection() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <button onClick={() => navigate("/")} className="text-slate-600">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">¿Cómo deseas ingresar?</h2>
        <p className="text-slate-600 mb-12">Selecciona tu perfil</p>

        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => navigate("/login-paciente")}
            className="w-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur rounded-full p-5 mb-4">
                <User size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Paciente</h3>
              <p className="text-purple-100 text-sm">Consulta tu salud y recordatorios</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/login-doctor")}
            className="w-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur rounded-full p-5 mb-4">
                <Stethoscope size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Profesional de salud</h3>
              <p className="text-blue-100 text-sm">Gestiona pacientes y seguimiento</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
