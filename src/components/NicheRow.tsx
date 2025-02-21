import { useState } from 'react'
import { Switch } from '@/components/ui/Switch'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/Dialog'
import { TableRow, TableCell } from '@/components/ui/Table'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Niche {
  id: string
  name: string
  status: boolean
  activity: number[]
}

interface NicheRowProps {
  niche: Niche
  onUpdate: (id: string, updates: Partial<Niche>) => void
  onDelete: (id: string) => void
}

export function NicheRow({ niche, onUpdate, onDelete }: NicheRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(niche.name)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleSave = () => {
    if (!editedName.trim()) {
      setErrors(['Niche name cannot be empty'])
      return
    }
    onUpdate(niche.id, { name: editedName })
    setIsEditing(false)
    setErrors([])
  }

  const handleCancel = () => {
    setEditedName(niche.name)
    setIsEditing(false)
    setErrors([])
  }

  const handleDelete = () => {
    onDelete(niche.id)
    setShowDeleteDialog(false)
  }

  return (
    <>
      <TableRow>
        <TableCell>
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Enter niche name"
              />
              {errors.map((error) => (
                <p key={error} className="text-sm text-red-500">
                  {error}
                </p>
              ))}
            </div>
          ) : (
            <span className="font-medium">{niche.name}</span>
          )}
        </TableCell>
        <TableCell>
          <Switch
            checked={niche.status}
            onCheckedChange={(checked) => onUpdate(niche.id, { status: checked })}
          />
        </TableCell>
        <TableCell>
          <div className="h-4 flex items-center gap-0.5">
            {niche.activity.map((value, i) => (
              <div
                key={i}
                className="w-1 bg-blue-500"
                style={{ height: `${value}%`, opacity: 0.5 + value / 200 }}
              />
            ))}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </TableCell>
      </TableRow>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Niche</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the niche "{niche.name}"? This action
            cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 