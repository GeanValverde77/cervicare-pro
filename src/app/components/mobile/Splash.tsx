import { useNavigate } from "react-router";
import { Heart } from "lucide-react";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center mb-12">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-6">
          <Heart className="text-white" size={80} strokeWidth={1.5} />
        </div>
        <h1 className="text-white text-4xl font-bold tracking-tight mb-3">CerviCare Pro</h1>
        <p className="text-teal-50 text-center text-lg max-w-xs">
          Prevención inteligente del cáncer cervicouterino
        </p>
      </div>

      <button
        onClick={() => navigate("/tipo-usuario")}
        className="bg-white text-teal-600 font-bold px-12 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform text-lg"
      >
        Comenzar
      </button>

      <p className="text-teal-100 text-sm mt-auto mb-8">v1.0.0 • Sistema de Apoyo Clínico</p>
    </div>
  );
}
