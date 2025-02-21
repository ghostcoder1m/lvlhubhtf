'use client'

import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { PageHeader } from '@/components/ui/PageHeader'
import { PipelineVisualizer } from '@/components/PipelineVisualizer'
import { Button } from '@/components/ui/Button'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline'
import { PipelineStage } from '@/types'

const initialStages: PipelineStage[] = [
  {
    id: 'topic-generation',
    name: 'Topic Generation',
    status: 'idle',
    progress: 0,
  },
  {
    id: 'article-creation',
    name: 'Article Creation',
    status: 'idle',
    progress: 0,
  },
  {
    id: 'content-transformation',
    name: 'Content Transformation',
    status: 'idle',
    progress: 0,
  },
  {
    id: 'translation',
    name: 'Translation',
    status: 'idle',
    progress: 0,
  },
  {
    id: 'distribution',
    name: 'Distribution',
    status: 'idle',
    progress: 0,
  },
]

export default function PipelineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userRole } = useApp()
  const [stages, setStages] = useState<PipelineStage[]>(initialStages)
  const [isRunning, setIsRunning] = useState(false)

  const togglePipeline = () => {
    setIsRunning(!isRunning)
    setStages((prev) =>
      prev.map((stage) => ({
        ...stage,
        status: !isRunning ? 'running' : 'paused',
      }))
    )
  }

  if (!['admin', 'editor'].includes(userRole)) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">
          You don't have permission to access this page.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Pipeline"
        description="Manage your content generation pipeline"
      >
        <Button onClick={togglePipeline}>
          {isRunning ? (
            <>
              <PauseIcon className="h-4 w-4 mr-2" />
              Pause Pipeline
            </>
          ) : (
            <>
              <PlayIcon className="h-4 w-4 mr-2" />
              Start Pipeline
            </>
          )}
        </Button>
      </PageHeader>

      <div className="bg-white p-6 rounded-lg shadow">
        <PipelineVisualizer stages={stages} />
      </div>

      <div className="bg-white rounded-lg shadow">{children}</div>
    </div>
  )
} 