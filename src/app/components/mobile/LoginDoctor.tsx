import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export default function LoginDoctor() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/doctor/home");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex flex-col">
      <div className="px-6 py-4">
        <button onClick={() => navigate("/tipo-usuario")} className="text-white">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Acceso Profesional</h2>
          <p className="text-slate-600 mb-8">Ingresa a tu cuenta médica</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="doctor@hospital.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Iniciar sesión
            </button>

            <button
              type="button"
              className="w-full border-2 border-blue-500 text-blue-600 font-bold py-4 rounded-xl hover:bg-blue-50 transition-all"
            >
              Crear cuenta
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            ¿Olvidaste tu contraseña?{" "}
            <button className="text-blue-600 font-semibold">Recuperar</button>
          </p>
        </div>
      </div>
    </div>
  );
}
