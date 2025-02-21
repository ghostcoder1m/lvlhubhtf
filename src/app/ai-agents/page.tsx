'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Switch } from '@/components/ui/Switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { 
  PlusIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  ChartBarIcon,
  CommandLineIcon,
  CpuChipIcon,
  CircleStackIcon,
  CloudIcon
} from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface AIAgent {
  id: string
  name: string
  type: 'content' | 'research' | 'advertising' | 'analytics'
  description: string
  status: 'active' | 'paused' | 'error'
  lastRun: string
  avatar: {
    icon: React.ComponentType<any>
    color: string
    bgColor: string
  }
  configuration: {
    model: string
    temperature: number
    maxTokens: number
    customInstructions: string
  }
}

const getAgentAvatar = (type: AIAgent['type']) => {
  switch (type) {
    case 'content':
      return {
        icon: SparklesIcon,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
      }
    case 'research':
      return {
        icon: MagnifyingGlassIcon,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
      }
    case 'advertising':
      return {
        icon: MegaphoneIcon,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
      }
    case 'analytics':
      return {
        icon: ChartBarIcon,
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
      }
  }
}

export default function AIAgentsPage() {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: '1',
      name: 'Content Generation AI',
      type: 'content',
      description: 'Generates high-quality content based on given topics and guidelines',
      status: 'active',
      lastRun: '2024-02-20T10:00:00Z',
      avatar: getAgentAvatar('content'),
      configuration: {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000,
        customInstructions: 'Generate engaging and informative content...',
      },
    },
    {
      id: '2',
      name: 'Lead Research AI',
      type: 'research',
      description: 'Researches and identifies potential leads from various sources',
      status: 'active',
      lastRun: '2024-02-19T15:00:00Z',
      avatar: getAgentAvatar('research'),
      configuration: {
        model: 'gpt-4',
        temperature: 0.5,
        maxTokens: 1000,
        customInstructions: 'Find and analyze potential leads...',
      },
    },
    {
      id: '3',
      name: 'Ad Campaign AI',
      type: 'advertising',
      description: 'Optimizes and manages advertising campaigns',
      status: 'paused',
      lastRun: '2024-02-18T12:00:00Z',
      avatar: getAgentAvatar('advertising'),
      configuration: {
        model: 'gpt-4',
        temperature: 0.6,
        maxTokens: 1500,
        customInstructions: 'Analyze and optimize ad campaigns...',
      },
    },
    {
      id: '4',
      name: 'Performance Analytics AI',
      type: 'analytics',
      description: 'Analyzes content and campaign performance metrics',
      status: 'active',
      lastRun: '2024-02-20T09:00:00Z',
      avatar: getAgentAvatar('analytics'),
      configuration: {
        model: 'gpt-4',
        temperature: 0.4,
        maxTokens: 1000,
        customInstructions: 'Analyze performance metrics and provide insights...',
      },
    },
  ])
  const [showConfigDialog, setShowConfigDialog] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null)
  const [editedConfig, setEditedConfig] = useState<AIAgent['configuration'] | null>(null)

  const handleStatusToggle = (id: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              status: agent.status === 'active' ? 'paused' : 'active',
            }
          : agent
      )
    )
    toast.success('Agent status updated')
  }

  const handleConfigSave = () => {
    if (!selectedAgent || !editedConfig) return

    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === selectedAgent.id
          ? { ...agent, configuration: editedConfig }
          : agent
      )
    )
    setShowConfigDialog(false)
    setSelectedAgent(null)
    setEditedConfig(null)
    toast.success('Configuration saved')
  }

  const openConfig = (agent: AIAgent) => {
    setSelectedAgent(agent)
    setEditedConfig({ ...agent.configuration })
    setShowConfigDialog(true)
  }

  const getStatusBadgeVariant = (status: AIAgent['status']) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'paused':
        return 'warning'
      case 'error':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  return (
    <div className="p-6">
      <PageHeader
        title="AI Agents"
        description="Manage and configure your AI agents"
      >
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
      </PageHeader>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${agent.avatar.bgColor}`}>
                    <agent.avatar.icon className={`w-6 h-6 ${agent.avatar.color}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{agent.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Switch
                  checked={agent.status === 'active'}
                  onCheckedChange={() => handleStatusToggle(agent.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">{agent.description}</p>
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <CommandLineIcon className="w-4 h-4" />
                    <span>Model: {agent.configuration.model}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <CpuChipIcon className="w-4 h-4" />
                    <span>Temperature: {agent.configuration.temperature}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <CircleStackIcon className="w-4 h-4" />
                    <span>Max Tokens: {agent.configuration.maxTokens}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <CloudIcon className="w-4 h-4" />
                    <span>Last Run: {formatDate(agent.lastRun)}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => openConfig(agent)}
                >
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Configure {selectedAgent?.name}
            </DialogTitle>
          </DialogHeader>
          {editedConfig && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={editedConfig.model}
                  onChange={(e) =>
                    setEditedConfig((prev) =>
                      prev ? { ...prev, model: e.target.value } : null
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">
                  Temperature ({editedConfig.temperature})
                </Label>
                <Input
                  id="temperature"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={editedConfig.temperature}
                  onChange={(e) =>
                    setEditedConfig((prev) =>
                      prev
                        ? { ...prev, temperature: parseFloat(e.target.value) }
                        : null
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxTokens">Max Tokens</Label>
                <Input
                  id="maxTokens"
                  type="number"
                  value={editedConfig.maxTokens}
                  onChange={(e) =>
                    setEditedConfig((prev) =>
                      prev
                        ? { ...prev, maxTokens: parseInt(e.target.value) }
                        : null
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customInstructions">Custom Instructions</Label>
                <Input
                  id="customInstructions"
                  value={editedConfig.customInstructions}
                  onChange={(e) =>
                    setEditedConfig((prev) =>
                      prev
                        ? { ...prev, customInstructions: e.target.value }
                        : null
                    )
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfigDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfigSave}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 