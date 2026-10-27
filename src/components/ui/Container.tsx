import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps {
  as?: ElementType
  className?: string
  children: ReactNode
}

export const Container = ({ as: Tag = 'div', className, children }: ContainerProps) => (
  <Tag className={cn('container-page', className)}>{children}</Tag>
)
