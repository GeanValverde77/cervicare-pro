import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "../../AuthContext";

function Loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <p className="text-slate-500">Cargando...</p>
    </div>
  );
}

export function ProtectedDoctorRoute() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || profile?.user_type !== "doctor")) {
      navigate("/login-doctor", { replace: true });
    }
  }, [user, profile, loading, navigate]);

  if (loading) return <Loading />;
  if (!user || profile?.user_type !== "doctor") return null;
  return <Outlet />;
}

export function ProtectedPatientRoute() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || profile?.user_type !== "patient")) {
      navigate("/login-paciente", { replace: true });
    }
  }, [user, profile, loading, navigate]);

  if (loading) return <Loading />;
  if (!user || profile?.user_type !== "patient") return null;
  return <Outlet />;
}
