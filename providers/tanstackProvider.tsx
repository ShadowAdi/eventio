'use client'
import { createQueryClient } from '@/config/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode, useState } from 'react'

type TanstackProviderProps = {
    children: ReactNode
}

const TanstackProvider = ({ children }: TanstackProviderProps) => {
    const [queryClient] = useState(() => createQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default TanstackProvider