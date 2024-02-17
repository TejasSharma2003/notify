import React from 'react'
import Navbar from '@/components/navbar'
import { isUserAuthenticated } from '@/lib/server/auth'
import LayoutWrapper from '@/components/layout-wrapper';
import { dashboardConfig } from '@/config/dashboard';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = isUserAuthenticated();

    return (
        <div>
            <Navbar isAuthenticated={isAuthenticated} />
            <LayoutWrapper className="px-14 grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav items={dashboardConfig.sidebarNav} />
                </aside>
                {children}
            </LayoutWrapper>
        </div>
    )
}

export default DashboardLayout; 
