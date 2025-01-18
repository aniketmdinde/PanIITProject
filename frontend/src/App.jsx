import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import AgreementList from './components/AgreementList';
import CreateAgreement from './components/CreateAgreement';
import ViewAgreement from './components/ViewAgreement';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<AgreementList />} />
            <Route path="/create" element={<CreateAgreement />} />
            <Route path="/view/:id" element={<ViewAgreement />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;