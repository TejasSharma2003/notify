import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
    return (
        <Link href="/" className={cn(className)}>
            <h1 className="text-4xl font-bold text-gray-900 font-heading">notify<span className="text-primary">.</span></h1>
        </Link>
    )
}

export default Logo
