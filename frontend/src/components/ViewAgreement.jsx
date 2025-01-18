import { useParams } from 'react-router-dom';
import { useGetAgreementQuery, useUpdateAgreementMutation } from '../store/services/agreementApi';
import { useSelector } from 'react-redux';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function ViewAgreement() {
  const { id } = useParams();
  const { data: agreement, isLoading, error } = useGetAgreementQuery(id);
  const [updateAgreement] = useUpdateAgreementMutation();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('agreement', file);
        await updateAgreement({ id, formData }).unwrap();
        toast.success('Agreement updated successfully');
      } catch (error) {
        toast.error('Failed to update agreement');
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const agreementData = agreement?.data;

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-${darkMode ? 'gray-800' : 'white'} shadow rounded-lg p-6`}>
        <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {agreementData.agreement_company}
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Agreement Type
            </h2>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {agreementData.type}
            </p>
          </div>

          <div>
            <h2 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Company Emails
            </h2>
            <div className="mt-1 space-y-1">
              {agreementData.company_mails.map((email, index) => (
                <p key={index} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {email}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Organization Emails
            </h2>
            <div className="mt-1 space-y-1">
              {agreementData.organisation_mails.map((email, index) => (
                <p key={index} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {email}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Latest Agreement
            </h2>
            <div className="mt-2 flex items-center space-x-4">
              <a
                href={agreementData.latest_agreement}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
                View Latest Version
              </a>
            </div>
          </div>

          <div>
            <h2 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Update Agreement
            </h2>
            <div className="mt-2">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className={`block w-full text-sm ${
                  darkMode ? 'text-gray-300 file:text-white' : 'text-gray-700 file:text-gray-700'
                } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                  darkMode
                    ? 'file:bg-gray-700 file:hover:bg-gray-600'
                    : 'file:bg-gray-100 file:hover:bg-gray-200'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}