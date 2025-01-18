import { useGetAllAgreementsQuery } from '../store/services/agreementApi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DocumentIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function AgreementList() {
  const { data: agreements, isLoading, error } = useGetAllAgreementsQuery();
  const darkMode = useSelector((state) => state.theme.darkMode);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Agreements
        </h1>
        <Link
          to="/create"
          className={`inline-flex items-center px-4 py-2 rounded-md ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Agreement
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agreements?.data.map((agreement) => (
          <Link
            key={agreement._id}
            to={`/view/${agreement._id}`}
            className={`p-4 rounded-lg ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-white hover:bg-gray-50'
            } shadow transition-colors duration-200`}
          >
            <div className="flex items-start space-x-4">
              <DocumentIcon className="h-6 w-6 text-blue-500" />
              <div>
                <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {agreement.agreement_company}
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Type: {agreement.type}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Updated: {new Date(agreement.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}