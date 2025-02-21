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
  DialogFooter,
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface Lead {
  id: string
  name: string
  company: string
  position: string
  email: string
  phone: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  lastContact: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'John Smith',
      company: 'Tech Corp',
      position: 'CTO',
      email: 'john@techcorp.com',
      phone: '+1 234 567 8900',
      source: 'LinkedIn',
      status: 'new',
      lastContact: '2024-02-20T10:00:00Z',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'Digital Solutions',
      position: 'Marketing Director',
      email: 'sarah@digitalsolutions.com',
      phone: '+1 234 567 8901',
      source: 'Website',
      status: 'contacted',
      lastContact: '2024-02-19T15:00:00Z',
    },
  ])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [newLead, setNewLead] = useState<Partial<Lead>>({
    status: 'new',
  })

  const handleStatusChange = (id: string, status: Lead['status']) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, status } : lead
      )
    )
    toast.success(`Lead status updated to ${status}`)
  }

  const handleAddLead = () => {
    if (!newLead.name || !newLead.email || !newLead.company) {
      toast.error('Please fill in all required fields')
      return
    }

    const lead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      name: newLead.name || '',
      company: newLead.company || '',
      position: newLead.position || '',
      email: newLead.email || '',
      phone: newLead.phone || '',
      source: newLead.source || 'Manual',
      status: 'new',
      lastContact: new Date().toISOString(),
    }

    setLeads((prev) => [...prev, lead])
    setNewLead({
      status: 'new',
    })
    setShowAddDialog(false)
    toast.success('Lead added successfully')
  }

  const getStatusBadgeVariant = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return 'secondary'
      case 'contacted':
        return 'info'
      case 'qualified':
        return 'warning'
      case 'converted':
        return 'success'
      case 'lost':
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
        title="Lead Generation"
        description="Manage and track potential leads"
      >
        <Button onClick={() => setShowAddDialog(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </PageHeader>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>{lead.position}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{lead.source}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(lead.status)}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(lead.lastContact)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <EllipsisHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setSelectedLead(lead)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(lead.id, 'contacted')}
                      >
                        Mark as Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(lead.id, 'qualified')}
                      >
                        Mark as Qualified
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(lead.id, 'converted')}
                      >
                        Mark as Converted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(lead.id, 'lost')}
                      >
                        Mark as Lost
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={newLead.name || ''}
                onChange={(e) =>
                  setNewLead((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter lead name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={newLead.company || ''}
                onChange={(e) =>
                  setNewLead((prev) => ({ ...prev, company: e.target.value }))
                }
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={newLead.position || ''}
                onChange={(e) =>
                  setNewLead((prev) => ({ ...prev, position: e.target.value }))
                }
                placeholder="Enter position"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newLead.email || ''}
                onChange={(e) =>
                  setNewLead((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={newLead.phone || ''}
                onChange={(e) =>
                  setNewLead((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={newLead.source || ''}
                onChange={(e) =>
                  setNewLead((prev) => ({ ...prev, source: e.target.value }))
                }
                placeholder="Enter lead source"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLead}>Add Lead</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={selectedLead !== null}
        onOpenChange={() => setSelectedLead(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <p className="mt-1">{selectedLead?.name}</p>
              </div>
              <div>
                <Label>Company</Label>
                <p className="mt-1">{selectedLead?.company}</p>
              </div>
              <div>
                <Label>Position</Label>
                <p className="mt-1">{selectedLead?.position}</p>
              </div>
              <div>
                <Label>Source</Label>
                <p className="mt-1">{selectedLead?.source}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="mt-1">{selectedLead?.email}</p>
              </div>
              <div>
                <Label>Phone</Label>
                <p className="mt-1">{selectedLead?.phone}</p>
              </div>
              <div>
                <Label>Status</Label>
                <div className="mt-1">
                  <Badge variant={getStatusBadgeVariant(selectedLead?.status || 'new')}>
                    {selectedLead?.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Last Contact</Label>
                <p className="mt-1">
                  {selectedLead?.lastContact &&
                    formatDate(selectedLead.lastContact)}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 