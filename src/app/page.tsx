'use client'

import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  DocumentTextIcon,
  PencilIcon,
  ArrowPathIcon,
  LanguageIcon,
  ShareIcon,
  ChevronRightIcon,
  UserGroupIcon,
  MegaphoneIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

interface WorkflowStage {
  id: string
  title: string
  icon: React.ComponentType<any>
  status: 'pending' | 'in_progress' | 'completed'
  assignees: { name: string; avatar: string }[]
  tasks: string[]
}

export default function Dashboard() {
  const { userRole, setUserRole } = useApp()
  const [stages] = useState<WorkflowStage[]>([
    {
      id: 'topic-generation',
      title: 'Topic Generation',
      icon: DocumentTextIcon,
      status: 'in_progress',
      assignees: [
        { name: 'John Doe', avatar: '/avatars/1.png' },
        { name: 'Jane Smith', avatar: '/avatars/2.png' },
      ],
      tasks: [
        'Research trending topics',
        'Analyze keyword opportunities',
        'Draft topic proposals',
      ],
    },
    {
      id: 'content-creation',
      title: 'Content Creation',
      icon: PencilIcon,
      status: 'pending',
      assignees: [
        { name: 'Alice Johnson', avatar: '/avatars/3.png' },
        { name: 'Bob Wilson', avatar: '/avatars/4.png' },
      ],
      tasks: [
        'Write initial draft',
        'Review and edit',
        'Add media elements',
      ],
    },
    {
      id: 'transformation',
      title: 'Content Transformation',
      icon: ArrowPathIcon,
      status: 'pending',
      assignees: [
        { name: 'Emma Davis', avatar: '/avatars/5.png' },
      ],
      tasks: [
        'Convert to different formats',
        'Optimize for platforms',
        'Quality check',
      ],
    },
    {
      id: 'translation',
      title: 'Translation',
      icon: LanguageIcon,
      status: 'pending',
      assignees: [
        { name: 'Carlos Garcia', avatar: '/avatars/6.png' },
        { name: 'Marie Dubois', avatar: '/avatars/7.png' },
      ],
      tasks: [
        'Translate content',
        'Cultural adaptation',
        'Review translations',
      ],
    },
    {
      id: 'distribution',
      title: 'Distribution',
      icon: ShareIcon,
      status: 'pending',
      assignees: [
        { name: 'Sarah Lee', avatar: '/avatars/8.png' },
      ],
      tasks: [
        'Schedule publications',
        'Cross-platform posting',
        'Monitor initial engagement',
      ],
    },
  ])

  const getStatusColor = (status: WorkflowStage['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in_progress':
        return 'bg-blue-500'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome to the LVLHUB AI Content Engine Control Panel
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={userRole === 'viewer' ? 'default' : 'outline'} 
            onClick={() => setUserRole('viewer')}
          >
            Viewer
          </Button>
          <Button 
            variant={userRole === 'editor' ? 'default' : 'outline'} 
            onClick={() => setUserRole('editor')}
          >
            Editor
          </Button>
          <Button 
            variant={userRole === 'admin' ? 'default' : 'outline'} 
            onClick={() => setUserRole('admin')}
          >
            Admin
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <DocumentTextIcon className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Content Pipeline</h3>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-500">Active Articles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <UserGroupIcon className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Lead Generation</h3>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-500">New Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <MegaphoneIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="text-lg font-semibold">Advertising</h3>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-500">Active Campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <ChartBarIcon className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="text-lg font-semibold">Performance</h3>
                <p className="text-2xl font-bold">32%</p>
                <p className="text-sm text-gray-500">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Content Pipeline Workflow</h2>
            <Badge variant="secondary">Current Pipeline Status</Badge>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
            
            <div className="relative grid grid-cols-5 gap-4">
              {stages.map((stage, index) => (
                <div key={stage.id} className="relative">
                  <div className="flex items-center mb-4">
                    {index > 0 && (
                      <ChevronRightIcon className="w-5 h-5 text-gray-400 absolute -left-2" />
                    )}
                  </div>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${stage.status === 'in_progress' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                          <stage.icon className={`w-5 h-5 ${stage.status === 'in_progress' ? 'text-blue-500' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{stage.title}</h3>
                          <Badge 
                            variant={stage.status === 'in_progress' ? 'info' : 'secondary'}
                            className="mt-1"
                          >
                            {stage.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {stage.tasks.map((task, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(stage.status)}`} />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex -space-x-2 mt-4">
                        {stage.assignees.map((assignee, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium"
                            title={assignee.name}
                          >
                            {assignee.name.charAt(0)}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
