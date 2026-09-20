import './index.css'
import HeroSection from './components/HeroSection'
import InfoSection from './components/InfoSection'
import FormSection from './components/FormSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <HeroSection />
      <InfoSection />
      <FormSection />
      <Footer />
    </div>
  )
}

export default App
