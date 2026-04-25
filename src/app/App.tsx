import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <div className="max-w-md mx-auto bg-white h-screen overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
}