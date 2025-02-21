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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface Distribution {
  id: string
  title: string
  platforms: string[]
  scheduledFor: string
  status: 'scheduled' | 'publishing' | 'published' | 'failed'
  content: {
    text: string
    platforms: Record<string, {
      status: 'pending' | 'published' | 'failed'
      url?: string
    }>
  }
}

export default function DistributionPage() {
  const [distributions, setDistributions] = useState<Distribution[]>([
    {
      id: '1',
      title: 'The Future of AI in Content Creation',
      platforms: ['LinkedIn', 'Twitter', 'Medium'],
      scheduledFor: '2024-02-20T10:00:00Z',
      status: 'published',
      content: {
        text: 'Lorem ipsum dolor sit amet...',
        platforms: {
          LinkedIn: {
            status: 'published',
            url: 'https://linkedin.com/post/123',
          },
          Twitter: {
            status: 'published',
            url: 'https://twitter.com/post/456',
          },
          Medium: {
            status: 'published',
            url: 'https://medium.com/post/789',
          },
        },
      },
    },
    {
      id: '2',
      title: '10 Emerging Tech Trends in 2024',
      platforms: ['LinkedIn', 'Medium'],
      scheduledFor: '2024-02-21T15:00:00Z',
      status: 'scheduled',
      content: {
        text: 'Lorem ipsum dolor sit amet...',
        platforms: {
          LinkedIn: {
            status: 'pending',
          },
          Medium: {
            status: 'pending',
          },
        },
      },
    },
  ])
  const [selectedDistribution, setSelectedDistribution] = useState<Distribution | null>(null)

  const handleStatusChange = (id: string, status: Distribution['status']) => {
    setDistributions((prev) =>
      prev.map((distribution) =>
        distribution.id === id ? { ...distribution, status } : distribution
      )
    )
    toast.success(`Distribution ${status}`)
  }

  const getStatusBadgeVariant = (status: Distribution['status'] | string) => {
    switch (status) {
      case 'scheduled':
        return 'secondary'
      case 'publishing':
        return 'info'
      case 'published':
        return 'success'
      case 'failed':
        return 'destructive'
      case 'pending':
        return 'secondary'
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
        title="Distribution"
        description="Manage content distribution across platforms"
      />

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Platforms</TableHead>
              <TableHead>Scheduled For</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {distributions.map((distribution) => (
              <TableRow key={distribution.id}>
                <TableCell className="font-medium">{distribution.title}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {distribution.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{formatDate(distribution.scheduledFor)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(distribution.status)}>
                    {distribution.status}
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
                        onClick={() => setSelectedDistribution(distribution)}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(distribution.id, 'publishing')}
                      >
                        Start Publishing
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(distribution.id, 'published')}
                      >
                        Mark as Published
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(distribution.id, 'failed')}
                      >
                        Mark as Failed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={selectedDistribution !== null}
        onOpenChange={() => setSelectedDistribution(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedDistribution?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium mb-2">Content</h3>
              <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                <p>{selectedDistribution?.content.text}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Platform Status</h3>
              <div className="space-y-2">
                {selectedDistribution?.platforms.map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span>{platform}</span>
                      <Badge
                        variant={getStatusBadgeVariant(
                          selectedDistribution.content.platforms[platform].status
                        )}
                      >
                        {selectedDistribution.content.platforms[platform].status}
                      </Badge>
                    </div>
                    {selectedDistribution.content.platforms[platform].url && (
                      <a
                        href={selectedDistribution.content.platforms[platform].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Post
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 