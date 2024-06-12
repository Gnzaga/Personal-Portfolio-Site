import React from 'react';
import Header from './components/Header';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';

function App() {
  return (
    <div className="container mx-auto p-4">
      <Header />
      <Education />
      <Experience />
      <Projects />
      <Skills />
    </div>
  );
}

export default App;
