import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css'
import VideoHeader from './components/video_header/video_header.jsx';
import Date from './components/date/date.jsx';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <div>

      <VideoHeader />
      <Date />

    </div>
  )
}

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>
)