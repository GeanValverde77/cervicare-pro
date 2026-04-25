import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function EducationPatient() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    {
      icon: "🦠",
      title: "¿Qué es el HPV?",
      summary: "Virus del papiloma humano y su relación con el cáncer cervical",
      content:
        "El HPV es un virus muy común que se transmite por contacto sexual. Los tipos 16 y 18 causan aproximadamente el 70% de los casos de cáncer cervical. La mayoría de las infecciones desaparecen solas en 1-2 años.",
    },
    {
      icon: "🔬",
      title: "Importancia del PAP",
      summary: "Detección temprana que salva vidas",
      content:
        "El Papanicolaou detecta cambios anormales antes de que se conviertan en cáncer. Mujeres 21-29 años: PAP cada 3 años. Mujeres 30-65 años: PAP + test HPV cada 5 años.",
    },
    {
      icon: "💉",
      title: "Vacunación",
      summary: "Protección contra los tipos más peligrosos del HPV",
      content:
        "La vacuna HPV es muy segura y efectiva. Edad recomendada: 9-14 años (2 dosis). Protege contra HPV 16 y 18 que causan la mayoría de cánceres cervicales.",
    },
    {
      icon: "⚠️",
      title: "Signos de alarma",
      summary: "Cuándo consultar inmediatamente",
      content:
        "Consulta si presentas: sangrado vaginal anormal (entre períodos o después de relaciones), flujo con mal olor, dolor pélvico persistente, o dolor durante las relaciones sexuales.",
    },
  ];

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4 rounded-b-3xl shadow-lg">
        <button onClick={() => navigate("/paciente/home")} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Educación</h1>
        <p className="text-teal-100 text-sm mt-1">Información preventiva</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        {selectedTopic === null ? (
          <div className="space-y-3">
            {topics.map((topic, index) => (
              <button
                key={index}
                onClick={() => setSelectedTopic(index)}
                className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-200 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{topic.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 mb-1">{topic.title}</h3>
                    <p className="text-sm text-slate-600">{topic.summary}</p>
                  </div>
                  <ChevronRight className="text-slate-400" size={24} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedTopic(null)}
              className="flex items-center gap-2 text-teal-600 font-semibold mb-6"
            >
              <ArrowLeft size={20} />
              Volver a temas
            </button>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="text-5xl mb-4 text-center">{topics[selectedTopic].icon}</div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3 text-center">
                {topics[selectedTopic].title}
              </h2>
              <p className="text-slate-700 leading-relaxed">{topics[selectedTopic].content}</p>
            </div>

            <div className="mt-6 bg-teal-50 border border-teal-200 rounded-2xl p-4">
              <p className="text-sm text-teal-800">
                <strong>Recuerda:</strong> Esta información es educativa. Siempre consulta con tu médico
                para recomendaciones personalizadas.
              </p>
            </div>
          </div>
        )}

        {/* Key Messages */}
        {selectedTopic === null && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-4 text-white">
              <p className="text-xs text-pink-100 mb-1">Prevención</p>
              <p className="font-bold text-sm">La vacuna salva vidas</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
              <p className="text-xs text-purple-100 mb-1">Detección</p>
              <p className="font-bold text-sm">El PAP es clave</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
