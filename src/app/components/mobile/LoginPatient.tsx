import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export default function LoginPatient() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/paciente/home");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-500 to-purple-600 flex flex-col">
      <div className="px-6 py-4">
        <button onClick={() => navigate("/tipo-usuario")} className="text-white">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Bienvenida</h2>
          <p className="text-slate-600 mb-8">Ingresa a tu cuenta de paciente</p>

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
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="tu@email.com"
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
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Iniciar sesión
            </button>

            <button
              type="button"
              className="w-full border-2 border-purple-500 text-purple-600 font-bold py-4 rounded-xl hover:bg-purple-50 transition-all"
            >
              Crear cuenta
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            ¿Olvidaste tu contraseña?{" "}
            <button className="text-purple-600 font-semibold">Recuperar</button>
          </p>
        </div>
      </div>
    </div>
  );
}
