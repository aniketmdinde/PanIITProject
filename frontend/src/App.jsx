import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { AgreementList } from './components/AgreementList';
import { AgreementDetail } from './components/AgreementDetail';
import { Chatbot } from './components/Chatbot';
import { Search } from 'lucide-react';

function App() {
  const handleFileUpload = async (files) => {
    // TODO: Implement file upload logic with backend integration
    console.log('Files to upload:', files);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Agreement Management System
              </h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search agreements..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                <Dashboard />
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Upload Agreement
                  </h2>
                  <FileUpload onUpload={handleFileUpload} />
                </div>
              </div>
            } />
            <Route path="/agreements/:type" element={<AgreementList />} />
            <Route path="/agreement/:id" element={<AgreementDetail />} />
          </Routes>
        </main>

        <Chatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;