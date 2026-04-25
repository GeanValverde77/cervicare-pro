import { useNavigate } from "react-router";
import { Heart, Calculator, Bell, FileText, GraduationCap, User } from "lucide-react";

export default function HomePatient() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Heart, label: "Mi salud", path: "/paciente/perfil", color: "from-pink-500 to-pink-600" },
    { icon: Calculator, label: "Calculadora de riesgo", path: "/paciente/riesgo", color: "from-purple-500 to-purple-600" },
    { icon: Bell, label: "Recordatorios", path: "/paciente/recordatorios", color: "from-amber-500 to-amber-600", badge: "3" },
    { icon: FileText, label: "Resultados", path: "/paciente/resultados", color: "from-blue-500 to-blue-600" },
    { icon: GraduationCap, label: "Educación", path: "/paciente/educacion", color: "from-teal-500 to-teal-600" },
  ];

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-purple-100 text-sm">Hola,</p>
            <h1 className="text-white text-2xl font-bold">María González</h1>
          </div>
          <button className="bg-white/20 backdrop-blur rounded-full p-3">
            <User className="text-white" size={24} />
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Próximo control</p>
              <p className="text-white font-bold text-lg">15 de Mayo, 2026</p>
            </div>
            <div className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold text-sm">
              30 días
            </div>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 px-6 py-8">
        <h2 className="text-slate-800 font-bold text-lg mb-4">Mis opciones</h2>
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all relative`}
            >
              {item.badge && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              <item.icon size={32} className="mb-3" />
              <p className="font-semibold text-sm">{item.label}</p>
            </button>
          ))}
        </div>

        {/* Quick Info */}
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Heart className="text-green-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-600">Estado de salud</p>
              <p className="font-bold text-slate-800">Riesgo Moderado</p>
            </div>
            <button className="text-purple-600 font-semibold text-sm">Ver detalles</button>
          </div>
        </div>
      </div>
    </div>
  );
}
