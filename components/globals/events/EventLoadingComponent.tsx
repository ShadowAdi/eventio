import React from 'react'
import { motion } from "framer-motion";
import { Loader2 } from 'lucide-react';

const EventLoadingComponent = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <Loader2 className="h-12 w-12 animate-spin text-lime-500" />
                <p className="text-lg text-zinc-600 dark:text-zinc-400">Loading events...</p>
            </motion.div>
        </div>
    )
}

export default EventLoadingComponent