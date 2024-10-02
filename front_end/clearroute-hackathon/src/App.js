import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CognitiveEndurance from './components/CognitiveEndurance';
import SleepOptimization from './components/SleepOptimization';
import PredictiveMaintenance from './components/PredictiveMaintenance';
import TireWearPrediction from './components/TireWearPrediction';
import WorkloadOptimizer from './components/WorkloadOptimizer';
import AugmentedReality from './components/AugmentedReality';
import BlockchainSupplyChain from './components/BlockchainSupplyChain';
import RealTimeData from './components/RealTimeData';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';  // Import the CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-layout">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cognitive-endurance" element={<CognitiveEndurance />} />
              <Route path="/sleep-optimization" element={<SleepOptimization />} />
              <Route path="/predictive-maintenance" element={<PredictiveMaintenance />} />
              <Route path="/tire-wear-prediction" element={<TireWearPrediction />} />
              <Route path="/workload-optimizer" element={<WorkloadOptimizer />} />
              <Route path="/augmented-reality" element={<AugmentedReality />} />
              <Route path="/blockchain-supply-chain" element={<BlockchainSupplyChain />} />
              <Route path="/real-time-data" element={<RealTimeData />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
