import { useNavigate } from "react-router";
import { ArrowLeft, Bell, Calendar, AlertCircle } from "lucide-react";

export default function RemindersPatient() {
  const navigate = useNavigate();

  const reminders = [
    { type: "urgent", icon: AlertCircle, title: "PAP pendiente", date: "Marzo 2026", color: "red" },
    { type: "warning", icon: Calendar, title: "Control anual", date: "Próximo mes", color: "amber" },
    { type: "info", icon: Bell, title: "Vacuna HPV recomendada", date: "Consultar con médico", color: "blue" },
  ];

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/paciente/home")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Recordatorios</h1>
        <p className="text-amber-100 text-sm mt-1">Tus controles y alertas</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        <div className="space-y-4">
          {reminders.map((reminder, index) => (
            <div
              key={index}
              className={`rounded-2xl p-5 shadow-sm border-2 ${
                reminder.color === "red"
                  ? "bg-red-50 border-red-200"
                  : reminder.color === "amber"
                  ? "bg-amber-50 border-amber-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-full ${
                    reminder.color === "red"
                      ? "bg-red-100"
                      : reminder.color === "amber"
                      ? "bg-amber-100"
                      : "bg-blue-100"
                  }`}
                >
                  <reminder.icon
                    className={
                      reminder.color === "red"
                        ? "text-red-600"
                        : reminder.color === "amber"
                        ? "text-amber-600"
                        : "text-blue-600"
                    }
                    size={24}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-bold mb-1 ${
                      reminder.color === "red"
                        ? "text-red-900"
                        : reminder.color === "amber"
                        ? "text-amber-900"
                        : "text-blue-900"
                    }`}
                  >
                    {reminder.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      reminder.color === "red"
                        ? "text-red-700"
                        : reminder.color === "amber"
                        ? "text-amber-700"
                        : "text-blue-700"
                    }`}
                  >
                    {reminder.date}
                  </p>
                </div>
                <button
                  className={`text-sm font-semibold px-4 py-2 rounded-lg ${
                    reminder.color === "red"
                      ? "bg-red-600 text-white"
                      : reminder.color === "amber"
                      ? "bg-amber-600 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Resumen</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">1</div>
              <p className="text-xs text-slate-600 mt-1">Urgentes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">1</div>
              <p className="text-xs text-slate-600 mt-1">Próximos</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1</div>
              <p className="text-xs text-slate-600 mt-1">Informativos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
