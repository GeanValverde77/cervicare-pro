import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import { signIn, signUp } from "../../store";
import { supabase } from "../../supabase";

export default function LoginPatient() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await signIn(email, password);
      const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", data.user.id).single();
      if (profile?.user_type !== "patient") {
        await supabase.auth.signOut();
        throw new Error("Esta cuenta no es de paciente.");
      }
      navigate("/paciente/home");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signUp(email, password, name, "patient");
      navigate("/paciente/home");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al crear cuenta.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!email) { setError("Ingresa tu correo primero."); return; }
    await supabase.auth.resetPasswordForEmail(email);
    setError("Se envió un correo de recuperación.");
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
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {mode === "login" ? "Bienvenida" : "Crear cuenta"}
          </h2>
          <p className="text-slate-600 mb-8">
            {mode === "login" ? "Ingresa a tu cuenta de paciente" : "Regístrate para ver tu información"}
          </p>

          <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nombre completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Tu nombre completo"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Correo electrónico</label>
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
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-60"
            >
              {loading ? "Procesando..." : mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </button>

            <button
              type="button"
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
              className="w-full border-2 border-purple-500 text-purple-600 font-bold py-4 rounded-xl hover:bg-purple-50 transition-all"
            >
              {mode === "login" ? "Crear cuenta nueva" : "Ya tengo cuenta"}
            </button>
          </form>

          {mode === "login" && (
            <p className="text-center text-sm text-slate-500 mt-6">
              ¿Olvidaste tu contraseña?{" "}
              <button onClick={handleReset} className="text-purple-600 font-semibold">Recuperar</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
