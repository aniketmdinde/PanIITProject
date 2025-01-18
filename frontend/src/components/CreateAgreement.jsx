import { useState } from 'react';
import { useCreateAgreementMutation } from '../store/services/agreementApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function CreateAgreement() {
  const [formData, setFormData] = useState({
    type: '',
    agreement_company: '',
    company_mails: '',
    organisation_mails: '',
    agreement: null,
  });

  const darkMode = useSelector((state) => state.theme.darkMode);
  const [createAgreement] = useCreateAgreementMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('type', formData.type);
      form.append('agreement_company', formData.agreement_company);
      form.append('company_mails', JSON.stringify(formData.company_mails.split(',').map(email => email.trim())));
      form.append('organisation_mails', JSON.stringify(formData.organisation_mails.split(',').map(email => email.trim())));
      form.append('agreement', formData.agreement);

      await createAgreement(form).unwrap();
      toast.success('Agreement created successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create agreement');
    }
  };

  const inputClassName = `mt-1 block w-full rounded-md ${
    darkMode
      ? 'bg-gray-800 border-gray-700 text-white'
      : 'bg-white border-gray-300 text-gray-900'
  } shadow-sm focus:border-blue-500 focus:ring-blue-500`;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Create New Agreement
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Agreement Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className={inputClassName}
            required
          >
            <option value="">Select type</option>
            <option value="saas">SaaS</option>
            <option value="end_user_license">End User License</option>
            <option value="data_protection">Data Protection</option>
            <option value="cloud_service">Cloud Service</option>
            <option value="it_support">IT Support</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Company Name
          </label>
          <input
            type="text"
            value={formData.agreement_company}
            onChange={(e) => setFormData({ ...formData, agreement_company: e.target.value })}
            className={inputClassName}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Company Emails (comma-separated)
          </label>
          <input
            type="text"
            value={formData.company_mails}
            onChange={(e) => setFormData({ ...formData, company_mails: e.target.value })}
            className={inputClassName}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Organization Emails (comma-separated)
          </label>
          <input
            type="text"
            value={formData.organisation_mails}
            onChange={(e) => setFormData({ ...formData, organisation_mails: e.target.value })}
            className={inputClassName}
            required
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Agreement PDF
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFormData({ ...formData, agreement: e.target.files[0] })}
            className={inputClassName}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Create Agreement
        </button>
      </form>
    </div>
  );
}