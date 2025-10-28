import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SkincareArticle from './pages/SkincareArticle';
import NutritionArticle from './pages/NutritionArticle';
import MindfulnessArticle from './pages/MindfulnessArticle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skincare-article" element={<SkincareArticle />} />
        <Route path="/nutrition-article" element={<NutritionArticle />} />
        <Route path="/mindfulness-article" element={<MindfulnessArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
