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

interface Campaign {
  id: string
  name: string
  platform: 'Google Ads' | 'Facebook Ads' | 'LinkedIn Ads'
  budget: number
  spent: number
  status: 'draft' | 'active' | 'paused' | 'completed'
  startDate: string
  endDate: string
  performance: {
    impressions: number
    clicks: number
    conversions: number
  }
}

export default function AdvertisingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Sale 2024',
      platform: 'Google Ads',
      budget: 5000,
      spent: 2500,
      status: 'active',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      performance: {
        impressions: 50000,
        clicks: 2500,
        conversions: 100,
      },
    },
    {
      id: '2',
      name: 'Brand Awareness Q2',
      platform: 'Facebook Ads',
      budget: 3000,
      spent: 1200,
      status: 'active',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      performance: {
        impressions: 75000,
        clicks: 3000,
        conversions: 150,
      },
    },
  ])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    status: 'draft',
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
    },
  })

  const handleStatusChange = (id: string, status: Campaign['status']) => {
    setCampaigns((prev) =>
      prev.map((campaign) =>
        campaign.id === id ? { ...campaign, status } : campaign
      )
    )
    toast.success(`Campaign status updated to ${status}`)
  }

  const handleAddCampaign = () => {
    if (!newCampaign.name || !newCampaign.platform || !newCampaign.budget) {
      toast.error('Please fill in all required fields')
      return
    }

    const campaign: Campaign = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCampaign.name,
      platform: newCampaign.platform as Campaign['platform'],
      budget: newCampaign.budget,
      spent: 0,
      status: 'draft',
      startDate: newCampaign.startDate || '',
      endDate: newCampaign.endDate || '',
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
      },
    }

    setCampaigns((prev) => [...prev, campaign])
    setNewCampaign({
      status: 'draft',
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
      },
    })
    setShowAddDialog(false)
    toast.success('Campaign added successfully')
  }

  const getStatusBadgeVariant = (status: Campaign['status']) => {
    switch (status) {
      case 'draft':
        return 'secondary'
      case 'active':
        return 'success'
      case 'paused':
        return 'warning'
      case 'completed':
        return 'info'
      default:
        return 'secondary'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('en-US').format(number)
  }

  const calculateCTR = (clicks: number, impressions: number) => {
    return ((clicks / impressions) * 100).toFixed(2) + '%'
  }

  const calculateCPC = (spent: number, clicks: number) => {
    return formatCurrency(spent / clicks)
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Advertising"
        description="Manage your advertising campaigns"
      >
        <Button onClick={() => setShowAddDialog(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Campaign
        </Button>
      </PageHeader>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{campaign.platform}</Badge>
                </TableCell>
                <TableCell>{formatCurrency(campaign.budget)}</TableCell>
                <TableCell>{formatCurrency(campaign.spent)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <p>CTR: {calculateCTR(campaign.performance.clicks, campaign.performance.impressions)}</p>
                    <p>CPC: {calculateCPC(campaign.spent, campaign.performance.clicks)}</p>
                    <p>Conversions: {formatNumber(campaign.performance.conversions)}</p>
                  </div>
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
                        onClick={() => setSelectedCampaign(campaign)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(campaign.id, 'active')}
                      >
                        Activate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(campaign.id, 'paused')}
                      >
                        Pause
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(campaign.id, 'completed')}
                      >
                        Complete
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
            <DialogTitle>Add New Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                value={newCampaign.name || ''}
                onChange={(e) =>
                  setNewCampaign((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter campaign name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform">Platform *</Label>
              <Input
                id="platform"
                value={newCampaign.platform || ''}
                onChange={(e) =>
                  setNewCampaign((prev) => ({ ...prev, platform: e.target.value as Campaign['platform'] }))
                }
                placeholder="Enter platform"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget *</Label>
              <Input
                id="budget"
                type="number"
                value={newCampaign.budget || ''}
                onChange={(e) =>
                  setNewCampaign((prev) => ({ ...prev, budget: parseFloat(e.target.value) }))
                }
                placeholder="Enter budget"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={newCampaign.startDate || ''}
                onChange={(e) =>
                  setNewCampaign((prev) => ({ ...prev, startDate: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={newCampaign.endDate || ''}
                onChange={(e) =>
                  setNewCampaign((prev) => ({ ...prev, endDate: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCampaign}>Add Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={selectedCampaign !== null}
        onOpenChange={() => setSelectedCampaign(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Campaign Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <p className="mt-1">{selectedCampaign?.name}</p>
              </div>
              <div>
                <Label>Platform</Label>
                <p className="mt-1">{selectedCampaign?.platform}</p>
              </div>
              <div>
                <Label>Budget</Label>
                <p className="mt-1">
                  {selectedCampaign && formatCurrency(selectedCampaign.budget)}
                </p>
              </div>
              <div>
                <Label>Spent</Label>
                <p className="mt-1">
                  {selectedCampaign && formatCurrency(selectedCampaign.spent)}
                </p>
              </div>
              <div>
                <Label>Status</Label>
                <div className="mt-1">
                  <Badge
                    variant={getStatusBadgeVariant(
                      selectedCampaign?.status || 'draft'
                    )}
                  >
                    {selectedCampaign?.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Duration</Label>
                <p className="mt-1">
                  {selectedCampaign?.startDate} - {selectedCampaign?.endDate}
                </p>
              </div>
            </div>
            <div>
              <Label>Performance Metrics</Label>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Impressions</span>
                  <span>
                    {selectedCampaign &&
                      formatNumber(selectedCampaign.performance.impressions)}
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Clicks</span>
                  <span>
                    {selectedCampaign &&
                      formatNumber(selectedCampaign.performance.clicks)}
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>CTR</span>
                  <span>
                    {selectedCampaign &&
                      calculateCTR(
                        selectedCampaign.performance.clicks,
                        selectedCampaign.performance.impressions
                      )}
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>CPC</span>
                  <span>
                    {selectedCampaign &&
                      calculateCPC(
                        selectedCampaign.spent,
                        selectedCampaign.performance.clicks
                      )}
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Conversions</span>
                  <span>
                    {selectedCampaign &&
                      formatNumber(selectedCampaign.performance.conversions)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 