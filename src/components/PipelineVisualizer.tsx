import { PipelineStage } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface PipelineVisualizerProps {
  stages: PipelineStage[]
  className?: string
}

export function PipelineVisualizer({ stages, className }: PipelineVisualizerProps) {
  const getStatusColor = (status: PipelineStage['status']) => {
    switch (status) {
      case 'idle':
        return 'bg-gray-200'
      case 'running':
        return 'bg-blue-500'
      case 'paused':
        return 'bg-yellow-500'
      case 'error':
        return 'bg-red-500'
      case 'completed':
        return 'bg-green-500'
      default:
        return 'bg-gray-200'
    }
  }

  const getStatusVariant = (status: PipelineStage['status']) => {
    switch (status) {
      case 'idle':
        return 'secondary'
      case 'running':
        return 'info'
      case 'paused':
        return 'warning'
      case 'error':
        return 'destructive'
      case 'completed':
        return 'success'
      default:
        return 'secondary'
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold',
                  getStatusColor(stage.status)
                )}
              >
                {index + 1}
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium">{stage.name}</p>
                <Badge variant={getStatusVariant(stage.status)} className="mt-1">
                  {stage.status}
                </Badge>
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div
                  className={cn('h-full', getStatusColor(stage.status))}
                  style={{ width: `${stage.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 