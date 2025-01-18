import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Users, AlertTriangle, FileText, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';

export function AgreementDetail() {
  const { id } = useParams();

  const agreement = {
    id,
    title: 'Service Level Agreement - Cloud Services',
    content: `This Service Level Agreement (SLA) is made between Cloud Provider Inc. ("Provider") and Our Company ("Client")...`,
    status: 'active',
    riskLevel: 'medium',
    lastModified: new Date(),
    expirationDate: new Date(2024, 11, 31),
    parties: ['Cloud Provider Inc.', 'Our Company'],
    type: 'Service Agreement',
    insights: [
      {
        type: 'risk',
        title: 'Liability Cap',
        description: 'The agreement includes a high liability cap that might pose financial risks.',
        severity: 'high'
      },
      {
        type: 'highlight',
        title: 'Service Availability',
        description: '99.9% uptime guaranteed with specific compensation terms for breaches.',
        severity: 'info'
      },
      {
        type: 'warning',
        title: 'Termination Clause',
        description: 'Complex termination requirements with 90-day notice period.',
        severity: 'medium'
      }
    ]
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{agreement.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              agreement.status === 'active' ? 'bg-green-100 text-green-800' :
              agreement.status === 'expired' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Expires: {format(agreement.expirationDate, 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              <span>Parties: {agreement.parties.join(', ')}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Tag className="w-5 h-5 mr-2" />
              <span>Type: {agreement.type}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>Last Modified: {format(agreement.lastModified, 'MMM d, yyyy')}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Agreement Content</h2>
            <p className="whitespace-pre-wrap text-gray-700">{agreement.content}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
          <div className="space-y-4">
            {agreement.insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  insight.severity === 'high' ? 'bg-red-50' :
                  insight.severity === 'medium' ? 'bg-yellow-50' :
                  'bg-blue-50'
                }`}
              >
                <h3 className="font-semibold flex items-center gap-2">
                  {insight.severity === 'high' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  {insight.title}
                </h3>
                <p className="text-sm mt-1">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Key Terms</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
              <span>Service Level: 99.9% uptime guaranteed</span>
            </li>
            <li className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
              <span>Notice Period: 90 days</span>
            </li>
            <li className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
              <span>Liability Cap: $1,000,000</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}