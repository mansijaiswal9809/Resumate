import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonial";
import Footer from "./components/Footer";
import PersonalInformation from "./components/PersonalInformation";
import ResumeActions from "./components/ResumeAction";

const App = () => {
  return (
    <>
      <Header />

      <main className="min-h-[80vh]">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <Testimonials />
              </>
            }
          />
          <Route path="/personal-info/:id" element={<PersonalInformation />} />
          <Route path="/resume" element={<ResumeActions />} />
          <Route
            path="*"
            element={
              <div className="text-center py-20 text-gray-600 text-lg">
                <h2 className="text-3xl font-bold mb-2">
                  404 – Page Not Found
                </h2>
                <p>Oops! The page you’re looking for doesn’t exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
