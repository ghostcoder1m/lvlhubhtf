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

interface Translation {
  id: string
  title: string
  sourceLanguage: string
  targetLanguages: string[]
  status: 'pending' | 'processing' | 'completed' | 'failed'
  content: {
    original: string
    translations: Record<string, string | null>
  }
}

export default function TranslationPage() {
  const [translations, setTranslations] = useState<Translation[]>([
    {
      id: '1',
      title: 'The Future of AI in Content Creation',
      sourceLanguage: 'English',
      targetLanguages: ['Spanish', 'French', 'German'],
      status: 'completed',
      content: {
        original: 'Lorem ipsum dolor sit amet...',
        translations: {
          Spanish: 'El futuro de la IA en la creación de contenido...',
          French: "L'avenir de l'IA dans la création de contenu...",
          German: 'Die Zukunft der KI in der Content-Erstellung...',
        },
      },
    },
    {
      id: '2',
      title: '10 Emerging Tech Trends in 2024',
      sourceLanguage: 'English',
      targetLanguages: ['Spanish', 'French'],
      status: 'processing',
      content: {
        original: 'Lorem ipsum dolor sit amet...',
        translations: {
          Spanish: null,
          French: null,
        },
      },
    },
  ])
  const [selectedTranslation, setSelectedTranslation] = useState<Translation | null>(null)

  const handleStatusChange = (id: string, status: Translation['status']) => {
    setTranslations((prev) =>
      prev.map((translation) =>
        translation.id === id ? { ...translation, status } : translation
      )
    )
    toast.success(`Translation ${status}`)
  }

  const getStatusBadgeVariant = (status: Translation['status']) => {
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
        title="Translation"
        description="Manage content translations across multiple languages"
      />

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Source Language</TableHead>
              <TableHead>Target Languages</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {translations.map((translation) => (
              <TableRow key={translation.id}>
                <TableCell className="font-medium">{translation.title}</TableCell>
                <TableCell>{translation.sourceLanguage}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {translation.targetLanguages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(translation.status)}>
                    {translation.status}
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
                        onClick={() => setSelectedTranslation(translation)}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(translation.id, 'processing')}
                      >
                        Start Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(translation.id, 'completed')}
                      >
                        Mark as Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(translation.id, 'failed')}
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
        open={selectedTranslation !== null}
        onOpenChange={() => setSelectedTranslation(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedTranslation?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium mb-2">Original Content ({selectedTranslation?.sourceLanguage})</h3>
              <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                <p>{selectedTranslation?.content.original}</p>
              </div>
            </div>
            {selectedTranslation?.targetLanguages.map((lang) => (
              <div key={lang}>
                <h3 className="font-medium mb-2">
                  {lang} Translation{' '}
                  {selectedTranslation.content.translations[lang] ? (
                    <Badge variant="success" className="ml-2">
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="ml-2">
                      Pending
                    </Badge>
                  )}
                </h3>
                <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                  <p>
                    {selectedTranslation.content.translations[lang] ||
                      'Translation in progress...'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 