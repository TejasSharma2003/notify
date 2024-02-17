import React from 'react'

type MainLayoutProps = {
    children: React.ReactNode
}

export default async function MainLayout({ children }: MainLayoutProps) {
    return (
        <main>
            {children}
        </main>
    );
}

