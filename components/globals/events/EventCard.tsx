import { EventResponse } from '@/types/Event.types'
import React from 'react'
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Calendar, DollarSign, Globe, MapPin, Users } from 'lucide-react';
import { formatDate } from '@/utils/format-date';
import { useRouter } from 'next/navigation';

const EventCard = ({ event, index }: { event: EventResponse, index: number }) => {
  const router = useRouter()
  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={() => {
        router.push(`/${event.id}`)
      }}
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
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default EventCard