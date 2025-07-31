"use client"
import { useState } from 'react'
import { PlusCircle, Upload, Award, BookOpen, Clock } from "lucide-react"

// Mock data for external training
const externalTrainings = [
  { id: 1, provider: 'Coursera', name: 'AI Product Management', date: 'Mar 20, 2023', status: 'Completed' },
  { id: 2, provider: 'LinkedIn', name: 'Objection Handling Mastery', date: 'Apr 15, 2023', status: 'Ongoing' },
  { id: 3, provider: 'Udemy', name: 'Public Speaking Essentials', date: 'Feb 05, 2023', status: 'Completed' },
  { id: 4, provider: 'edX', name: 'Data Science Fundamentals', date: 'Jan 10, 2023', status: 'Completed' },
  { id: 5, provider: 'Pluralsight', name: 'Advanced React Patterns', date: 'May 22, 2023', status: 'Ongoing' },
]

interface SummaryCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
}

const SummaryCard = ({ title, icon, value }: SummaryCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 flex justify-between items-center">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{value}</h3>
        </div>
        <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

const ExternalComponent = () => {
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  
  // Calculate summary metrics
  const completed = externalTrainings.filter(training => training.status === 'Completed').length
  const ongoing = externalTrainings.filter(training => training.status === 'Ongoing').length
  const totalCertifications = completed
  
  // Calculate percentage for chart
  const completedPercentage = Math.round((completed / externalTrainings.length) * 100)
  const ongoingPercentage = 100 - completedPercentage
  
  return (
    <div className="space-y-6">
      {/* Section 1: External Activities Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryCard 
          title="🎓 Courses Completed" 
          icon={<BookOpen className="h-5 w-5" />} 
          value={completed} 
        />
        
        <SummaryCard 
          title="🏆 Certifications Earned" 
          icon={<Award className="h-5 w-5" />} 
          value={totalCertifications} 
        />
        
        <SummaryCard 
          title="⏳ Ongoing External Learnings" 
          icon={<Clock className="h-5 w-5" />} 
          value={ongoing} 
        />
      </div>
      
      {/* Section 2: External Trainings List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">External Trainings</h2>
          <button
            onClick={() => setShowUploadDialog(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <Upload className="h-4 w-4" />
            Upload Certificate
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/30 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Provider</th>
                  <th className="px-4 py-3 text-left font-medium">Course/Training Name</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {externalTrainings.map((training) => (
                  <tr key={training.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{training.provider}</td>
                    <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{training.name}</td>
                    <td className="px-4 py-3 text-slate-900 dark:text-slate-200">{training.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        training.status === 'Completed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {training.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Section 4: External Progress Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">External Progress Chart</h2>
        </div>
        <div className="p-6 flex justify-center">
          <div className="relative h-48 w-48">
            {/* Simple donut chart implementation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke="#e2e8f0" 
                  strokeWidth="15" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke="#10B981" 
                  strokeWidth="15" 
                  strokeDasharray={`${completedPercentage * 2.51} ${100 * 2.51}`} 
                  strokeDashoffset="0" 
                  transform="rotate(-90 50 50)" 
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{completedPercentage}%</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Completed</div>
              </div>
            </div>
            <div className="absolute bottom-0 w-full flex justify-between text-sm">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-slate-700 dark:text-slate-300">Completed ({completed})</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                <span className="text-slate-700 dark:text-slate-300">Ongoing ({ongoing})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section 5: Request External Training Approval */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Request External Training Approval</h2>
        </div>
        <div className="p-6">
          <button
            onClick={() => setShowApprovalDialog(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <PlusCircle className="h-4 w-4" />
            Request Training Approval
          </button>
        </div>
      </div>

      {/* Upload Certificate Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Upload Certificate</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="course-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Course Name
                </label>
                <input
                  id="course-name"
                  type="text"
                  placeholder="Enter course name"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="provider" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Provider
                </label>
                <input
                  id="provider"
                  type="text"
                  placeholder="Enter provider name"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="completion-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Completion Date
                </label>
                <input
                  id="completion-date"
                  type="date"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="certificate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Certificate
                </label>
                <input
                  id="certificate"
                  type="file"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button
                onClick={() => setShowUploadDialog(false)}
                className="px-4 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadDialog(false)}
                className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Approval Dialog */}
      {showApprovalDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Request External Training</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="request-course" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Course Name
                </label>
                <input
                  id="request-course"
                  type="text"
                  placeholder="Enter course name"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="request-provider" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Provider
                </label>
                <input
                  id="request-provider"
                  type="text"
                  placeholder="Enter provider name"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="request-cost" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Cost
                </label>
                <input
                  id="request-cost"
                  type="number"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="request-reason" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Reason
                </label>
                <textarea
                  id="request-reason"
                  placeholder="Why do you want to take this course?"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                ></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button
                onClick={() => setShowApprovalDialog(false)}
                className="px-4 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowApprovalDialog(false)}
                className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExternalComponent
