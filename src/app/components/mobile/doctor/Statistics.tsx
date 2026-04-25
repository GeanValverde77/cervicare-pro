import { useNavigate } from "react-router";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function Statistics() {
  const navigate = useNavigate();

  const riskData = [
    { name: "Bajo", value: 62, color: "#10b981" },
    { name: "Moderado", value: 66, color: "#f59e0b" },
    { name: "Alto", value: 32, color: "#ef4444" },
  ];

  const monthlyData = [
    { month: "Ene", count: 18 },
    { month: "Feb", count: 22 },
    { month: "Mar", count: 19 },
    { month: "Abr", count: 15 },
  ];

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/doctor/home")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Estadísticas</h1>
        <p className="text-green-100 text-sm mt-1">Panel del centro de salud</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Pacientes</p>
            <p className="text-3xl font-bold text-slate-800">128</p>
            <p className="text-xs text-green-600 mt-1">↑ 12% vs mes anterior</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">PAP Pendientes</p>
            <p className="text-3xl font-bold text-slate-800">54</p>
            <p className="text-xs text-amber-600 mt-1">Atención requerida</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Alto Riesgo</p>
            <p className="text-3xl font-bold text-slate-800">32</p>
            <p className="text-xs text-red-600 mt-1">25% del total</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Cobertura</p>
            <p className="text-3xl font-bold text-slate-800">76%</p>
            <p className="text-xs text-green-600 mt-1">Meta: 80%</p>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-4">
          <h3 className="font-bold text-slate-800 mb-4">Distribución por Riesgo</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {riskData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.value} pacientes</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Screenings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-teal-600" size={20} />
            <h3 className="font-bold text-slate-800">Tamizajes Mensuales</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="count" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Goals */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white shadow-lg">
          <h3 className="font-bold text-lg mb-4">Objetivos del Mes</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cobertura de tamizaje</span>
                <span>76% / 80%</span>
              </div>
              <div className="bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2" style={{ width: "95%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Reducir PAP pendientes</span>
                <span>54 / 40</span>
              </div>
              <div className="bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2" style={{ width: "74%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
