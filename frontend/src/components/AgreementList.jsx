import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Calendar, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

export function AgreementList() {
  const { type } = useParams();
  const navigate = useNavigate();

  // Sample data - replace with real data from backend
  const agreements = [
    {
      id: '1',
      title: 'Service Level Agreement - Cloud Services',
      status: 'active',
      riskLevel: 'low',
      lastModified: new Date(),
      expirationDate: new Date(2024, 11, 31),
      parties: ['Cloud Provider Inc.', 'Our Company'],
      type: 'Service Agreement'
    },
    {
      id: '2',
      title: 'Non-Disclosure Agreement - Project X',
      status: 'active',
      riskLevel: 'medium',
      lastModified: new Date(),
      expirationDate: new Date(2024, 6, 15),
      parties: ['Partner Company', 'Our Company'],
      type: 'NDA'
    }
  ];

  const filteredAgreements = agreements.filter(agreement => {
    switch(type) {
      case 'active':
        return agreement.status === 'active';
      case 'expiring':
        const daysUntilExpiration = Math.ceil(
          (new Date(agreement.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
      case 'high-risk':
        return agreement.riskLevel === 'high';
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {type?.charAt(0).toUpperCase() + type?.slice(1)} Agreements
      </h2>
      
      <div className="grid gap-6">
        {filteredAgreements.map((agreement) => (
          <div
            key={agreement.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/agreement/${agreement.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{agreement.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    {agreement.type}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Expires: {format(agreement.expirationDate, 'MMM d, yyyy')}
                  </span>
                  {agreement.riskLevel === 'high' && (
                    <span className="flex items-center text-red-500">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      High Risk
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  Parties: {agreement.parties.join(', ')}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                agreement.status === 'active' ? 'bg-green-100 text-green-800' :
                agreement.status === 'expired' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}