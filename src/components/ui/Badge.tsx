import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-gray-900 text-gray-50 hover:bg-gray-900/80',
        secondary:
          'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80',
        destructive:
          'border-transparent bg-red-500 text-gray-50 hover:bg-red-500/80',
        outline: 'text-gray-950',
        success:
          'border-transparent bg-green-500 text-gray-50 hover:bg-green-500/80',
        warning:
          'border-transparent bg-yellow-500 text-gray-50 hover:bg-yellow-500/80',
        info: 'border-transparent bg-blue-500 text-gray-50 hover:bg-blue-500/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants } 