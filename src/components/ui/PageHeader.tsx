import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && (
            <p className="mt-2 text-gray-600">{description}</p>
          )}
        </div>
        {children && <div className="flex items-center gap-4">{children}</div>}
      </div>
    </div>
  )
} 