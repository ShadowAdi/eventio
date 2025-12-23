'use client'
import { SetStateAction, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users, DollarSign, Loader2, AlertCircle, Globe } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
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
    );
  }

  if (error) {
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
              Failed to load events. Please try again later.
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>
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
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-zinc-200 bg-white transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                    <CardHeader>
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <CardTitle className="text-xl text-zinc-900 dark:text-zinc-50">
                          {event.title}
                        </CardTitle>
                        {event.isOnline ? (
                          <Badge className="bg-lime-500 text-black hover:bg-lime-600">
                            <Globe className="mr-1 h-3 w-3" />
                            Online
                          </Badge>
                        ) : (
                          <Badge variant="secondary">In-Person</Badge>
                        )}
                      </div>
                      <CardDescription className="text-zinc-600 dark:text-zinc-400">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <Calendar className="h-4 w-4 text-lime-500" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>

                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <MapPin className="h-4 w-4 text-lime-500" />
                          <span>{event.location}</span>
                        </div>
                      )}

                      {event.capacity && (
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <Users className="h-4 w-4 text-lime-500" />
                          <span>{event.capacity} spots</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2">
                        <DollarSign className="h-4 w-4 text-lime-500" />
                        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                          {parseFloat(event.price) === 0 ? 'Free' : `$${event.price}`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}