'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useApp } from '@/context/AppContext'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  CogIcon,
  RocketLaunchIcon,
  MegaphoneIcon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<any>
  children?: NavItem[]
  roles?: string[]
}

const navigation: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { 
    href: '/niches', 
    label: 'Niches', 
    icon: DocumentDuplicateIcon,
    roles: ['admin', 'editor']
  },
  { 
    href: '/pipeline',
    label: 'Content Pipeline',
    icon: DocumentTextIcon,
    roles: ['admin', 'editor'],
    children: [
      { href: '/pipeline/topic-generation', label: 'Topic Generation', icon: DocumentTextIcon },
      { href: '/pipeline/article-creation', label: 'Article Creation', icon: DocumentTextIcon },
      { href: '/pipeline/content-transformation', label: 'Content Transformation', icon: DocumentTextIcon },
      { href: '/pipeline/translation', label: 'Translation', icon: DocumentTextIcon },
      { href: '/pipeline/distribution', label: 'Distribution', icon: DocumentTextIcon },
    ]
  },
  { 
    href: '/leads', 
    label: 'Lead Generation', 
    icon: UserGroupIcon,
    roles: ['admin', 'editor']
  },
  { 
    href: '/advertising', 
    label: 'Advertising', 
    icon: MegaphoneIcon,
    roles: ['admin', 'editor']
  },
  { href: '/performance', label: 'Performance', icon: ChartBarIcon },
  { 
    href: '/ai-agents', 
    label: 'AI Agents', 
    icon: RocketLaunchIcon,
    roles: ['admin']
  },
  { href: '/chat', label: 'Chat', icon: ChatBubbleLeftRightIcon },
  { 
    href: '/settings', 
    label: 'Settings', 
    icon: CogIcon,
    roles: ['admin']
  },
]

export default function LeftSidebar() {
  const { userRole, panelWidths, setPanelWidths } = useApp()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    if (!isCollapsed) {
      setExpandedItem(null)
    }
  }

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const newWidth = e.clientX
      if (newWidth >= 64 && newWidth <= 384) {
        setPanelWidths({ ...panelWidths, left: newWidth })
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

  const filteredNavigation = navigation.filter(item => 
    !item.roles || item.roles.includes(userRole)
  )

  return (
    <>
      <div
        ref={sidebarRef}
        style={{ width: isCollapsed ? 64 : panelWidths.left }}
        className={cn(
          'flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300',
          isDragging && 'select-none'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && <span className="text-xl font-bold">LVLHUB</span>}
          <button
            onClick={toggleCollapse}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-1">
            {filteredNavigation.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={cn(
                        'flex items-center w-full p-2 rounded-lg transition-colors',
                        pathname.startsWith(item.href)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      {!isCollapsed && (
                        <>
                          <span>{item.label}</span>
                          <ChevronRightIcon
                            className={cn(
                              'w-4 h-4 ml-auto transition-transform',
                              expandedItem === item.label && 'rotate-90'
                            )}
                          />
                        </>
                      )}
                    </button>
                    {!isCollapsed && expandedItem === item.label && (
                      <ul className="pl-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className={cn(
                                'flex items-center p-2 rounded-lg transition-colors',
                                pathname === child.href
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              )}
                            >
                              <child.icon className="w-4 h-4 mr-2" />
                              <span>{child.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center p-2 rounded-lg transition-colors',
                      pathname === item.href
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {!isCollapsed && <span className="ml-2">{item.label}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {!isCollapsed && (
        <div
          className={cn(
            'w-1 h-screen cursor-col-resize',
            isDragging && 'fixed inset-0 z-50'
          )}
          onMouseDown={handleMouseDown}
        />
      )}
    </>
  )
} 