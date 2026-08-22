import { Navigate, Route, Routes } from 'react-router-dom';
import SphereLayer from './components/SphereLayer';
import Landing from './routes/Landing';
import Chat from './routes/Chat';

export default function App() {
  return (
    <>
      {/* Mounted once, outside the router — the sphere is the one thing that
          survives navigation, gliding between the hero and the console. */}
      <SphereLayer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
