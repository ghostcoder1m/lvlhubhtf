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

interface Article {
  id: string
  title: string
  topic: string
  niche: string
  status: 'draft' | 'review' | 'approved' | 'rejected'
  content: string
}

export default function ArticleCreationPage() {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'The Future of AI in Content Creation',
      topic: 'The Future of AI in Content Creation',
      niche: 'Technology',
      status: 'draft',
      content: 'Lorem ipsum dolor sit amet...',
    },
    {
      id: '2',
      title: '10 Emerging Tech Trends in 2024',
      topic: '10 Emerging Tech Trends in 2024',
      niche: 'Technology',
      status: 'review',
      content: 'Lorem ipsum dolor sit amet...',
    },
  ])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const handleStatusChange = (id: string, status: Article['status']) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, status } : article
      )
    )
    toast.success(`Article ${status}`)
  }

  const getStatusBadgeVariant = (status: Article['status']) => {
    switch (status) {
      case 'draft':
        return 'secondary'
      case 'review':
        return 'info'
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
        title="Article Creation"
        description="Review and manage generated articles"
      />

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Niche</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.topic}</TableCell>
                <TableCell>{article.niche}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(article.status)}>
                    {article.status}
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
                        onClick={() => setSelectedArticle(article)}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(article.id, 'review')}
                      >
                        Send to Review
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(article.id, 'approved')}
                      >
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(article.id, 'rejected')}
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

      <Dialog
        open={selectedArticle !== null}
        onOpenChange={() => setSelectedArticle(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 prose max-w-none">
            <p>{selectedArticle?.content}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 