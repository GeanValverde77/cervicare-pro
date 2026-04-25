import { createBrowserRouter } from "react-router";

// Common screens
import Splash from "./components/mobile/Splash";
import UserTypeSelection from "./components/mobile/UserTypeSelection";
import LoginPatient from "./components/mobile/LoginPatient";
import LoginDoctor from "./components/mobile/LoginDoctor";

// Patient flow
import HomePatient from "./components/mobile/patient/HomePatient";
import ProfilePatient from "./components/mobile/patient/ProfilePatient";
import RiskPatient from "./components/mobile/patient/RiskPatient";
import RiskResult from "./components/mobile/patient/RiskResult";
import RemindersPatient from "./components/mobile/patient/RemindersPatient";
import ResultsPatient from "./components/mobile/patient/ResultsPatient";
import EducationPatient from "./components/mobile/patient/EducationPatient";

// Doctor flow
import HomeDoctor from "./components/mobile/doctor/HomeDoctor";
import PatientList from "./components/mobile/doctor/PatientList";
import RegisterPatient from "./components/mobile/doctor/RegisterPatient";
import PatientFile from "./components/mobile/doctor/PatientFile";
import ClinicalInterpretation from "./components/mobile/doctor/ClinicalInterpretation";
import TreatmentGuide from "./components/mobile/doctor/TreatmentGuide";
import Statistics from "./components/mobile/doctor/Statistics";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/tipo-usuario",
    Component: UserTypeSelection,
  },
  {
    path: "/login-paciente",
    Component: LoginPatient,
  },
  {
    path: "/login-doctor",
    Component: LoginDoctor,
  },
  // Patient routes
  {
    path: "/paciente/home",
    Component: HomePatient,
  },
  {
    path: "/paciente/perfil",
    Component: ProfilePatient,
  },
  {
    path: "/paciente/riesgo",
    Component: RiskPatient,
  },
  {
    path: "/paciente/riesgo-resultado",
    Component: RiskResult,
  },
  {
    path: "/paciente/recordatorios",
    Component: RemindersPatient,
  },
  {
    path: "/paciente/resultados",
    Component: ResultsPatient,
  },
  {
    path: "/paciente/educacion",
    Component: EducationPatient,
  },
  // Doctor routes
  {
    path: "/doctor/home",
    Component: HomeDoctor,
  },
  {
    path: "/doctor/pacientes",
    Component: PatientList,
  },
  {
    path: "/doctor/registrar",
    Component: RegisterPatient,
  },
  {
    path: "/doctor/ficha/:id",
    Component: PatientFile,
  },
  {
    path: "/doctor/interpretacion",
    Component: ClinicalInterpretation,
  },
  {
    path: "/doctor/tratamiento",
    Component: TreatmentGuide,
  },
  {
    path: "/doctor/estadisticas",
    Component: Statistics,
  },
]);
