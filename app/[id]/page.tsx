'use client'
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Clock, Globe, ArrowLeft, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/format-date';
import { formatTime } from '@/utils/formatTime';
import Image from 'next/image';
import { toast } from 'sonner';
import { deleteEvent, getEventById } from '@/utils/api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EventResponse } from '@/types/Event.types';



export default function SingleEventPage() {
    const params = useParams();
    const { id: eventId } = params;
    const [event, setEvent] = useState<EventResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()


    useEffect(() => {
        if (!eventId) return;

        const fetchEvent = async () => {
            try {
                const res = await getEventById(Number(eventId));
                setEvent(res.event);
            } catch (error) {
                const message =
                    error instanceof Error ? error.message : "Event not found";

                toast.error(message);
                router.replace("/");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId, router]);



    const calculateDuration = () => {
        if (event) {
            const start = new Date(event.startDate);
            const end = new Date(event.endDate);
            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
            return days > 1 ? `${days} days` : 'Single day';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-zinc-500">Loading event...</p>
            </div>
        );
    }

    if (!event) {
        return null;
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-6"
                >
                    <Button
                        onClick={() => {
                            router.push(`/`)
                        }}
                        variant="ghost" className="gap-2 text-zinc-600 hover:text-lime-500 dark:text-zinc-400">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Events
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="overflow-hidden border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                        {event.imageUrl && <div className="relative h-64 sm:h-96 overflow-hidden">
                            <Image
                                src={event.imageUrl}
                                alt={event.title}
                                height={600}
                                width={600}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex items-center gap-2 mb-3">
                                    {event.isOnline ? (
                                        <Badge className="bg-lime-500 text-black hover:bg-lime-600">
                                            <Globe className="mr-1 h-3 w-3" />
                                            Online Event
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-white text-black hover:bg-zinc-100">
                                            In-Person
                                        </Badge>
                                    )}
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                    {event.title}
                                </h1>
                            </div>
                        </div>}

                        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-3">
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                                        About This Event
                                    </h2>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                                            Date & Time
                                        </h3>
                                        <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                            <Calendar className="h-5 w-5 text-lime-500 mt-0.5" />
                                            <div>
                                                <p className="font-medium">{formatDate(event.startDate)}</p>
                                                <p>{formatTime(event.startDate)} - {formatTime(event.endDate)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {event.location && (
                                        <div className="space-y-3">
                                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                                                Location
                                            </h3>
                                            <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                                <MapPin className="h-5 w-5 text-lime-500 mt-0.5" />
                                                <p>{event.location}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Card className="border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-zinc-600 dark:text-zinc-400">Price</span>
                                            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                                {event.price === 0 ? 'Free' : `$${event.price}`}
                                            </span>
                                        </div>

                                        {event.capacity && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-zinc-600 dark:text-zinc-400">Capacity</span>
                                                <div className="flex items-center gap-1 text-zinc-900 dark:text-zinc-50">
                                                    <Users className="h-4 w-4 text-lime-500" />
                                                    <span className="font-medium">{event.capacity} spots</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-zinc-600 dark:text-zinc-400">Duration</span>
                                            <div className="flex items-center gap-1 text-zinc-900 dark:text-zinc-50">
                                                <Clock className="h-4 w-4 text-lime-500" />
                                                <span className="font-medium">{calculateDuration()}</span>
                                            </div>
                                        </div>

                                        <Button onClick={() => {
                                            toast.success("You Are Registered")
                                        }} className="w-full bg-lime-500 text-black hover:bg-lime-600 font-semibold cursor-pointer! ">
                                            Register Now
                                        </Button>

                                        <Button onClick={() => {
                                            toast.success("Event Shared")

                                        }} variant="outline" className="w-full gap-2 border-zinc-300 dark:border-zinc-700 cursor-pointer!">
                                            <Share2 className="h-4 w-4" />
                                            Share Event
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            className="w-full gap-2 text-white cursor-pointer!"
                                            onClick={async () => {
                                                try {
                                                    await deleteEvent(event.id);

                                                    toast.success("Event deleted successfully");
                                                    router.push("/");
                                                } catch (error) {
                                                    toast.error(
                                                        error instanceof Error ? error.message : "Failed to delete event"
                                                    );
                                                }
                                            }}
                                        >
                                            Delete Event
                                        </Button>


                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}