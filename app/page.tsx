'use client'
import { SetStateAction, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EventCard from '@/components/globals/events/EventCard';
import EventsErrorHandler from '@/components/globals/events/EventsErrorHandler';
import EventLoadingComponent from '@/components/globals/events/EventLoadingComponent';
import { useEvents } from '@/events/hooks';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


export default function Home() {
  const { data, isLoading, error } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter()

  const filteredEvents = data?.events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];


  if (isLoading) {
    return (
      <EventLoadingComponent />
    );
  }

  if (error) {
    return (
      <EventsErrorHandler error={error} />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            Upcoming Events
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Discover and join amazing events
          </p>
          <Button onClick={() => {
            router.push("/create")
          }} className='bg-lime-600 hover:bg-lime-700 mt-3 text-white cursor-pointer! px-5 py-4 rounded-md'>
            Create Event
          </Button>
        </motion.div>

        {filteredEvents.length !== 0 && <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search events by title, description, or location..."
              value={searchQuery}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-zinc-300 focus-visible:ring-lime-500 dark:border-zinc-700"
            />
          </div>
        </motion.div>}

        <AnimatePresence mode="wait">
          {filteredEvents.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                No events found matching your search.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredEvents.map((event, index) => (
                <EventCard event={event} index={index} key={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}