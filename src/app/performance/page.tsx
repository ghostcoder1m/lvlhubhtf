'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'

interface Metric {
  id: string
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
  period: string
}

interface ContentMetric extends Metric {
  category: string
  engagement: number
}

interface LeadMetric extends Metric {
  source: string
  conversionRate: number
}

interface AdMetric extends Metric {
  platform: string
  roi: number
}

export default function PerformancePage() {
  const [metrics] = useState<{
    content: ContentMetric[]
    leads: LeadMetric[]
    advertising: AdMetric[]
  }>({
    content: [
      {
        id: '1',
        name: 'Total Views',
        value: 125000,
        change: 12.5,
        trend: 'up',
        period: 'Last 30 days',
        category: 'Technology',
        engagement: 68,
      },
      {
        id: '2',
        name: 'Average Time on Page',
        value: 245,
        change: -5.2,
        trend: 'down',
        period: 'Last 30 days',
        category: 'Health & Wellness',
        engagement: 72,
      },
    ],
    leads: [
      {
        id: '1',
        name: 'New Leads',
        value: 156,
        change: 23.4,
        trend: 'up',
        period: 'Last 30 days',
        source: 'LinkedIn',
        conversionRate: 3.2,
      },
      {
        id: '2',
        name: 'Qualified Leads',
        value: 48,
        change: 15.7,
        trend: 'up',
        period: 'Last 30 days',
        source: 'Website',
        conversionRate: 2.8,
      },
    ],
    advertising: [
      {
        id: '1',
        name: 'Ad Impressions',
        value: 250000,
        change: 18.9,
        trend: 'up',
        period: 'Last 30 days',
        platform: 'Google Ads',
        roi: 2.4,
      },
      {
        id: '2',
        name: 'Click-through Rate',
        value: 3.2,
        change: -1.5,
        trend: 'down',
        period: 'Last 30 days',
        platform: 'Facebook Ads',
        roi: 1.8,
      },
    ],
  })

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('en-US').format(number)
  }

  const formatChange = (change: number) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`
  }

  const getChangeBadgeVariant = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'success'
      case 'down':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Performance"
        description="Track and analyze your content engine performance"
      />

      <Tabs defaultValue="content" className="mt-6">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="advertising">Advertising</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {metrics.content.map((metric) => (
              <Card key={metric.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {metric.name}
                      </p>
                      <h3 className="text-2xl font-bold mt-2">
                        {formatNumber(metric.value)}
                      </h3>
                    </div>
                    <Badge variant={getChangeBadgeVariant(metric.trend)}>
                      {formatChange(metric.change)}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Category: {metric.category}</span>
                      <span>Engagement: {metric.engagement}%</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{metric.period}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leads" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {metrics.leads.map((metric) => (
              <Card key={metric.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {metric.name}
                      </p>
                      <h3 className="text-2xl font-bold mt-2">
                        {formatNumber(metric.value)}
                      </h3>
                    </div>
                    <Badge variant={getChangeBadgeVariant(metric.trend)}>
                      {formatChange(metric.change)}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Source: {metric.source}</span>
                      <span>Conversion: {metric.conversionRate}%</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{metric.period}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advertising" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {metrics.advertising.map((metric) => (
              <Card key={metric.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {metric.name}
                      </p>
                      <h3 className="text-2xl font-bold mt-2">
                        {formatNumber(metric.value)}
                      </h3>
                    </div>
                    <Badge variant={getChangeBadgeVariant(metric.trend)}>
                      {formatChange(metric.change)}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Platform: {metric.platform}</span>
                      <span>ROI: {metric.roi}x</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{metric.period}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 