'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface Topic {
  id: string
  title: string
  niche: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function TopicGenerationPage() {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: '1',
      title: 'The Future of AI in Content Creation',
      niche: 'Technology',
      status: 'pending',
    },
    {
      id: '2',
      title: '10 Emerging Tech Trends in 2024',
      niche: 'Technology',
      status: 'approved',
    },
    {
      id: '3',
      title: 'How to Build a Sustainable Wellness Routine',
      niche: 'Health & Wellness',
      status: 'pending',
    },
  ])

  const handleStatusChange = (id: string, status: Topic['status']) => {
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === id ? { ...topic, status } : topic
      )
    )
    toast.success(`Topic ${status}`)
  }

  const getStatusBadgeVariant = (status: Topic['status']) => {
    switch (status) {
      case 'pending':
        return 'secondary'
      case 'approved':
        return 'success'
      case 'rejected':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Topic Generation"
        description="Review and manage generated content topics"
      />

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Topic</TableHead>
              <TableHead>Niche</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics.map((topic) => (
              <TableRow key={topic.id}>
                <TableCell className="font-medium">{topic.title}</TableCell>
                <TableCell>{topic.niche}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(topic.status)}>
                    {topic.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <EllipsisHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(topic.id, 'approved')}
                      >
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(topic.id, 'rejected')}
                      >
                        Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 