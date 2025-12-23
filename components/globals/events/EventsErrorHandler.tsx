import React from 'react'
import { motion } from "framer-motion";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const EventsErrorHandler = ({ error }: { error: unknown }) => {
    if (error) {
        console.log("Error In getting all events is ",error)
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Alert variant="destructive" className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
                    <AlertCircle className="h-5 w-5" />
                    <AlertDescription className="ml-2">
                        Failed to load events. Please try again later. {error instanceof Error ? error.message : 'An unknown error occurred'}
                    </AlertDescription>
                </Alert>
            </motion.div>
        </div>
    )
}

export default EventsErrorHandler