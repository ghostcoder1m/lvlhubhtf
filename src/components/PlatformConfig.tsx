import { useState } from 'react'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'

interface Platform {
  id: string
  name: string
  enabled: boolean
  settings: Record<string, string>
}

interface PlatformConfigProps {
  platform: Platform
  onSave: (platform: Platform) => void
  onCancel: () => void
}

export function PlatformConfig({ platform, onSave, onCancel }: PlatformConfigProps) {
  const [config, setConfig] = useState<Platform>(platform)

  const handleSettingChange = (key: string, value: string) => {
    setConfig((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(config)
  }

  const renderFields = () => {
    switch (platform.id) {
      case 'linkedin':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                value={config.settings.apiKey || ''}
                onChange={(e) => handleSettingChange('apiKey', e.target.value)}
                placeholder="Enter your LinkedIn API Key"
              />
            </div>
          </>
        )
      case 'google-maps':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                value={config.settings.apiKey || ''}
                onChange={(e) => handleSettingChange('apiKey', e.target.value)}
                placeholder="Enter your Google Maps API Key"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={config.settings.location || ''}
                onChange={(e) => handleSettingChange('location', e.target.value)}
                placeholder="Enter location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="radius">Radius (km)</Label>
              <Input
                id="radius"
                type="number"
                value={config.settings.radius || ''}
                onChange={(e) => handleSettingChange('radius', e.target.value)}
                placeholder="Enter search radius"
              />
            </div>
          </>
        )
      case 'website':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                value={config.settings.url || ''}
                onChange={(e) => handleSettingChange('url', e.target.value)}
                placeholder="Enter website URL"
              />
            </div>
          </>
        )
      case 'google-ads':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                value={config.settings.apiKey || ''}
                onChange={(e) => handleSettingChange('apiKey', e.target.value)}
                placeholder="Enter your Google Ads API Key"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer ID</Label>
              <Input
                id="customerId"
                value={config.settings.customerId || ''}
                onChange={(e) => handleSettingChange('customerId', e.target.value)}
                placeholder="Enter your Customer ID"
              />
            </div>
          </>
        )
      case 'facebook-ads':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="accessToken">Access Token</Label>
              <Input
                id="accessToken"
                value={config.settings.accessToken || ''}
                onChange={(e) => handleSettingChange('accessToken', e.target.value)}
                placeholder="Enter your Facebook Access Token"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountId">Account ID</Label>
              <Input
                id="accountId"
                value={config.settings.accountId || ''}
                onChange={(e) => handleSettingChange('accountId', e.target.value)}
                placeholder="Enter your Account ID"
              />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{platform.name} Configuration</h3>
            <Switch
              checked={config.enabled}
              onCheckedChange={(checked) =>
                setConfig((prev) => ({ ...prev, enabled: checked }))
              }
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderFields()}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  )
} 