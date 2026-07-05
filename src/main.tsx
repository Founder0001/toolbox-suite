import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import './index.css'
import App from './App.tsx'

if (typeof window !== 'undefined') {
  const title = 'Security Warning';
  const msg = "This browser feature is for developers only. If someone told you to copy-paste something here to enable a feature or hack someone's account, it is a scam and will give them access to your accounts.";
  console.warn(title);
  console.warn(msg);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
