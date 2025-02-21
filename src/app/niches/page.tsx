'use client'

import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
} from '@/components/ui/Table'
import { NicheRow } from '@/components/NicheRow'
import { PlusIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface Niche {
  id: string
  name: string
  status: boolean
  activity: number[]
}

export default function NichesPage() {
  const { userRole } = useApp()
  const [niches, setNiches] = useState<Niche[]>([
    {
      id: '1',
      name: 'Technology',
      status: true,
      activity: [20, 40, 60, 80, 60, 40, 20],
    },
    {
      id: '2',
      name: 'Health & Wellness',
      status: true,
      activity: [30, 50, 70, 90, 70, 50, 30],
    },
  ])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newNicheName, setNewNicheName] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const handleAddNiche = () => {
    if (!newNicheName.trim()) {
      setErrors(['Niche name cannot be empty'])
      return
    }

    const newNiche: Niche = {
      id: Math.random().toString(36).substr(2, 9),
      name: newNicheName,
      status: true,
      activity: Array(7)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100)),
    }

    setNiches((prev) => [...prev, newNiche])
    setNewNicheName('')
    setShowAddDialog(false)
    setErrors([])
    toast.success('Niche added successfully')
  }

  const handleUpdateNiche = (id: string, updates: Partial<Niche>) => {
    setNiches((prev) =>
      prev.map((niche) =>
        niche.id === id ? { ...niche, ...updates } : niche
      )
    )
    toast.success('Niche updated successfully')
  }

  const handleDeleteNiche = (id: string) => {
    setNiches((prev) => prev.filter((niche) => niche.id !== id))
    toast.success('Niche deleted successfully')
  }

  if (!['admin', 'editor'].includes(userRole)) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">
          You don't have permission to access this page.
        </p>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Niches"
        description="Manage your content niches"
      >
        <Button onClick={() => setShowAddDialog(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Niche
        </Button>
      </PageHeader>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Niche</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {niches.map((niche) => (
              <NicheRow
                key={niche.id}
                niche={niche}
                onUpdate={handleUpdateNiche}
                onDelete={handleDeleteNiche}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Niche</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                value={newNicheName}
                onChange={(e) => setNewNicheName(e.target.value)}
                placeholder="Enter niche name"
              />
              {errors.map((error) => (
                <p key={error} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNiche}>Add Niche</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 