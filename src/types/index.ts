export type UserRole = 'admin' | 'editor' | 'viewer'

export interface User {
  email: string
  role: UserRole
  status: 'active' | 'pending' | 'disabled'
}

export interface PanelWidths {
  left: number
  right: number
}

export interface SystemStatus {
  status: 'running' | 'paused' | 'error'
  progress: number
}

export interface PipelineStage {
  id: string
  name: string
  status: 'idle' | 'running' | 'paused' | 'error' | 'completed'
  progress: number
} 