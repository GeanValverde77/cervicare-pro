import { supabase } from "./supabase";

export interface Patient {
  id: number;
  name: string;
  age: string;
  lastPap: string;
  hpvVaccine: string;
  smoking: string;
  risk: string;
  riskColor: string;
}

export interface RiskFactors {
  sexuallyActive: boolean;
  multiplePartners: boolean;
  smoker: boolean;
  notVaccinated: boolean;
}

export const lastPapLabel: Record<string, string> = {
  reciente: "Reciente (< 1 año)",
  "1-3años": "1-3 años",
  mas3años: "Más de 3 años",
  nunca: "Nunca",
};

export const hpvVaccineLabel: Record<string, string> = {
  si: "Vacunada",
  no: "No vacunada",
  parcial: "Vacunación parcial",
};

export const smokingLabel: Record<string, string> = {
  si: "Sí",
  no: "No",
};

function calcRisk(data: Pick<Patient, "lastPap" | "hpvVaccine" | "smoking">): Pick<Patient, "risk" | "riskColor"> {
  let score = 0;
  if (data.lastPap === "mas3años" || data.lastPap === "nunca") score++;
  if (data.hpvVaccine === "no") score++;
  if (data.smoking === "si") score++;
  if (score === 0) return { risk: "Bajo", riskColor: "green" };
  if (score === 1) return { risk: "Moderado", riskColor: "amber" };
  return { risk: "Alto", riskColor: "red" };
}

function rowToPatient(row: Record<string, unknown>): Patient {
  return {
    id: row.id as number,
    name: row.name as string,
    age: row.age as string,
    lastPap: row.last_pap as string,
    hpvVaccine: row.hpv_vaccine as string,
    smoking: row.smoking as string,
    risk: row.risk as string,
    riskColor: row.risk_color as string,
  };
}

export async function getPatients(): Promise<Patient[]> {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error(error); return []; }
  return (data ?? []).map(rowToPatient);
}

export async function savePatient(data: Omit<Patient, "id" | "risk" | "riskColor">): Promise<void> {
  const { risk, riskColor } = calcRisk(data);
  const { error } = await supabase.from("patients").insert({
    name: data.name,
    age: data.age,
    last_pap: data.lastPap,
    hpv_vaccine: data.hpvVaccine,
    smoking: data.smoking,
    risk,
    risk_color: riskColor,
  });
  if (error) throw error;
}

export async function getPatientById(id: number): Promise<Patient | null> {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();
  if (error) { console.error(error); return null; }
  return rowToPatient(data);
}

// Risk self-assessment stays in localStorage (es temporal, solo para navegar entre pantallas)
const RISK_KEY = "cervicare_risk_factors";

export function saveRiskFactors(factors: RiskFactors): void {
  localStorage.setItem(RISK_KEY, JSON.stringify(factors));
}

export function getRiskFactors(): RiskFactors | null {
  const stored = localStorage.getItem(RISK_KEY);
  return stored ? (JSON.parse(stored) as RiskFactors) : null;
}

export function calcRiskFromFactors(factors: RiskFactors): { level: string; color: "green" | "amber" | "red"; description: string } {
  const score = Object.values(factors).filter(Boolean).length;
  if (score === 0) return { level: "Bajo", color: "green", description: "Mantén tus hábitos saludables" };
  if (score <= 2) return { level: "Moderado", color: "amber", description: "Se recomienda seguimiento regular" };
  return { level: "Alto", color: "red", description: "Requiere atención médica prioritaria" };
}
