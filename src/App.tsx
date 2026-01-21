import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import StarryBackground from './components/StarryBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CoinDivination from './pages/CoinDivination';
import PlumBlossom from './pages/PlumBlossom';
import BaziAnalysis from './pages/BaziAnalysis';
import Guanyin from './pages/Guanyin';
import Tarot from './pages/Tarot';
import VedicAstrology from './pages/VedicAstrology';
import './index.css';

function App() {
  return (
    <Router>
      <div className="page-container min-h-screen flex flex-col">
        <StarryBackground />
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin" element={<CoinDivination />} />
            <Route path="/plum" element={<PlumBlossom />} />
            <Route path="/bazi" element={<BaziAnalysis />} />
            <Route path="/guanyin" element={<Guanyin />} />
            <Route path="/tarot" element={<Tarot />} />
            <Route path="/vedic" element={<VedicAstrology />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
