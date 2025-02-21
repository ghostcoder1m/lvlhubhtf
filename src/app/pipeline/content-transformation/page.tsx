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

interface ContentTransformation {
  id: string
  title: string
  originalFormat: string
  targetFormat: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  content: {
    original: string
    transformed: string | null
  }
}

export default function ContentTransformationPage() {
  const [transformations, setTransformations] = useState<ContentTransformation[]>([
    {
      id: '1',
      title: 'The Future of AI in Content Creation',
      originalFormat: 'Article',
      targetFormat: 'Social Media Post',
      status: 'completed',
      content: {
        original: 'Lorem ipsum dolor sit amet...',
        transformed: 'Exciting news! 🚀 AI is revolutionizing content creation...',
      },
    },
    {
      id: '2',
      title: '10 Emerging Tech Trends in 2024',
      originalFormat: 'Article',
      targetFormat: 'Video Script',
      status: 'processing',
      content: {
        original: 'Lorem ipsum dolor sit amet...',
        transformed: null,
      },
    },
  ])
  const [selectedTransformation, setSelectedTransformation] = useState<ContentTransformation | null>(null)

  const handleStatusChange = (id: string, status: ContentTransformation['status']) => {
    setTransformations((prev) =>
      prev.map((transformation) =>
        transformation.id === id ? { ...transformation, status } : transformation
      )
    )
    toast.success(`Transformation ${status}`)
  }

  const getStatusBadgeVariant = (status: ContentTransformation['status']) => {
    switch (status) {
      case 'pending':
        return 'secondary'
      case 'processing':
        return 'info'
      case 'completed':
        return 'success'
      case 'failed':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Content Transformation"
        description="Transform your content into different formats"
      />

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Original Format</TableHead>
              <TableHead>Target Format</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transformations.map((transformation) => (
              <TableRow key={transformation.id}>
                <TableCell className="font-medium">{transformation.title}</TableCell>
                <TableCell>{transformation.originalFormat}</TableCell>
                <TableCell>{transformation.targetFormat}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(transformation.status)}>
                    {transformation.status}
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
                        onClick={() => setSelectedTransformation(transformation)}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(transformation.id, 'processing')}
                      >
                        Start Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(transformation.id, 'completed')}
                      >
                        Mark as Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(transformation.id, 'failed')}
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
        open={selectedTransformation !== null}
        onOpenChange={() => setSelectedTransformation(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedTransformation?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium mb-2">Original Content</h3>
              <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                <p>{selectedTransformation?.content.original}</p>
              </div>
            </div>
            {selectedTransformation?.content.transformed && (
              <div>
                <h3 className="font-medium mb-2">Transformed Content</h3>
                <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                  <p>{selectedTransformation.content.transformed}</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 