import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <div className="max-w-md mx-auto bg-white h-screen overflow-hidden">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}
