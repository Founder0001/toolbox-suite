import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import App from './App.tsx'

const Fallback = () => (
  <div className="flex items-center justify-center min-h-screen text-muted-foreground">
    Something went wrong. Please refresh the page.
  </div>
);

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
