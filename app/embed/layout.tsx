import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Chat Embed',
    description: 'Embedded chat widget',
}

export default function EmbedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-full">
            <body className="h-full m-0 p-0 overflow-hidden">
                {children}
            </body>
        </html>
    )
} 
