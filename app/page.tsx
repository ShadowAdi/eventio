'use client'
import { SetStateAction, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EventCard from '@/components/globals/events/EventCard';
import EventsErrorHandler from '@/components/globals/events/EventsErrorHandler';
import EventLoadingComponent from '@/components/globals/events/EventLoadingComponent';

const useEvents = () => {
  const [isLoading] = useState(false);
  const [error] = useState(null);

  const data = {
    success: true,
    events: [
      {
        id: 1,
        title: "Tech Conference 2024",
        description: "Join us for the biggest tech conference of the year featuring keynotes from industry leaders.",
        location: "San Francisco, CA",
        isOnline: false,
        startDate: "2024-03-15T09:00:00Z",
        endDate: "2024-03-17T18:00:00Z",
        capacity: 500,
        price: "299.00",
        createdAt: "2024-01-10T10:00:00Z",
        updatedAt: "2024-01-15T14:30:00Z"
      },
      {
        id: 2,
        title: "Virtual Workshop: React Best Practices",
        description: "Learn advanced React patterns and best practices from experienced developers.",
        location: null,
        isOnline: true,
        startDate: "2024-03-20T14:00:00Z",
        endDate: "2024-03-20T17:00:00Z",
        capacity: 100,
        price: "49.00",
        createdAt: "2024-01-12T10:00:00Z",
        updatedAt: "2024-01-18T09:15:00Z"
      },
      {
        id: 3,
        title: "Community Meetup",
        description: "Connect with local developers and share experiences over coffee and snacks.",
        location: "New York, NY",
        isOnline: false,
        startDate: "2024-03-25T18:00:00Z",
        endDate: "2024-03-25T21:00:00Z",
        capacity: 50,
        price: "0.00",
        createdAt: "2024-01-14T11:00:00Z",
        updatedAt: "2024-01-20T16:45:00Z"
      }
    ]
  };

  return { data, isLoading, error };
};

export default function Home() {
  const { data, isLoading, error } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');

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
        </motion.div>

        <motion.div
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
        </motion.div>

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