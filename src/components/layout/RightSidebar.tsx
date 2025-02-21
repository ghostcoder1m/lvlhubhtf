'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useApp } from '@/context/AppContext'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  SparklesIcon,
  BoltIcon,
  CommandLineIcon,
  CircleStackIcon,
  CpuChipIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'

interface AIAction {
  id: string
  title: string
  description: string
  status: 'available' | 'in_progress' | 'completed'
  type: 'suggestion' | 'alert' | 'insight'
  icon: React.ComponentType<any>
}

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

export default function RightSidebar() {
  const { panelWidths, setPanelWidths } = useApp()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      role: 'assistant',
      timestamp: new Date().toISOString()
    }
  ])
  const sidebarRef = useRef<HTMLDivElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const [aiActions] = useState<AIAction[]>([
    {
      id: '1',
      title: 'Optimize Content Strategy',
      description: 'Analysis suggests adjusting topic focus for better engagement',
      status: 'available',
      type: 'suggestion',
      icon: SparklesIcon
    },
    {
      id: '2',
      title: 'Pipeline Bottleneck',
      description: 'Content transformation stage showing delays',
      status: 'available',
      type: 'alert',
      icon: BoltIcon
    },
    {
      id: '3',
      title: 'Performance Insight',
      description: 'CTR increased by 15% after recent content adjustments',
      status: 'completed',
      type: 'insight',
      icon: ArrowTrendingUpIcon
    }
  ])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleActionClick = (action: AIAction) => {
    setIsAIThinking(true)
    // Simulate AI processing
    setTimeout(() => {
      setIsAIThinking(false)
    }, 2000)
  }

  const getActionColor = (type: AIAction['type']) => {
    switch (type) {
      case 'suggestion':
        return 'text-blue-500 bg-blue-50'
      case 'alert':
        return 'text-red-500 bg-red-50'
      case 'insight':
        return 'text-green-500 bg-green-50'
      default:
        return 'text-gray-500 bg-gray-50'
    }
  }

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content: chatInput.trim(),
      role: 'user',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setChatInput('')

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        content: 'I understand your question. Let me help you with that.',
        role: 'assistant',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newWidth = window.innerWidth - e.clientX
      if (newWidth >= 64 && newWidth <= 384) {
        setPanelWidths({ ...panelWidths, right: newWidth })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, panelWidths, setPanelWidths])

  return (
    <>
      {!isCollapsed && (
        <div
          className={cn(
            'w-1 h-screen cursor-col-resize',
            isDragging && 'fixed inset-0 z-50'
          )}
          onMouseDown={handleMouseDown}
        />
      )}
      <div
        ref={sidebarRef}
        style={{ width: isCollapsed ? 64 : panelWidths.right }}
        className={cn(
          'flex flex-col h-screen bg-white border-l border-gray-200 transition-all duration-300',
          isDragging && 'select-none'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronLeftIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </button>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <CpuChipIcon className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-semibold">AI General Manager</span>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-600">
                    <CommandLineIcon className="w-5 h-5" />
                    <h3 className="font-semibold">System Status</h3>
                  </div>
                  <Badge variant="success">Operational</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">CPU Usage</span>
                    <span className="font-medium">24%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full w-1/4 bg-blue-500 rounded-full" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Memory</span>
                    <span className="font-medium">1.2GB / 4GB</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-full w-1/3 bg-green-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-blue-600">
                      <CircleStackIcon className="w-5 h-5" />
                      <h3 className="font-semibold">AI Actions</h3>
                    </div>
                    {isAIThinking && <Badge>Processing...</Badge>}
                  </div>

                  <div className="space-y-3">
                    {aiActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleActionClick(action)}
                        className="w-full text-left"
                      >
                        <div className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${getActionColor(action.type)}`}>
                              <action.icon className="w-4 h-4" />
                            </div>
                            <span className="font-medium">{action.title}</span>
                          </div>
                          <p className="text-sm text-gray-600 pl-11">
                            {action.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-700">Active Processes</h4>
                  <ul className="space-y-2 text-sm text-blue-600">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Content Generation Pipeline
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Performance Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      Lead Research
                    </li>
                  </ul>
                </div>

                <div>
                  <Button className="w-full" size="lg">
                    <SparklesIcon className="w-4 h-4 mr-2" />
                    Run System Optimization
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <div className="flex flex-col h-80">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-2 text-gray-900">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">AI Assistant</span>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'mb-3 max-w-[80%] rounded-lg p-3',
                        message.role === 'user' 
                          ? 'ml-auto bg-blue-500 text-white' 
                          : 'bg-gray-100'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim()}
                      size="sm"
                      className="px-3"
                    >
                      <PaperAirplaneIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 