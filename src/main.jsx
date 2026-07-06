import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css'
import VideoHeader from './components/video_header/video_header.jsx';

function App() {
  return (
    <div>

      <VideoHeader />

    </div>
  )
}

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>
)