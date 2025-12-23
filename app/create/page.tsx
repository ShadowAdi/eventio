'use client'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Globe, DollarSign, Users, ImageIcon, Loader2, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';
import { eventSchema } from '@/validators/event-form.validator';
import { createEvent } from '@/utils/api';
import { eventToFormValues } from '@/helper/helper';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';




export default function EventFormPage() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [imagePreviewLoaded, setImagePreviewLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: '',
            description: '',
            location: '',
            isOnline: false,
            startDate: '',
            endDate: '',
            imageUrl: '',
            capacity: '',
            price: ''
        }
    });

    const watchImageUrl = form.watch('imageUrl');
    const watchIsOnline = form.watch('isOnline');


    useEffect(() => {
        setImagePreviewLoaded(false);
        setImageError(false);
    }, [watchImageUrl]);

    const onSubmit = async (data: z.infer<typeof eventSchema>) => {
        setIsSubmitting(true);

        const payload = {
            ...data,
            capacity: data.capacity === '' ? 0 : Number(data.capacity),
            price: Number(data.price),
        };

        try {
            console.log("Payload sent to API:", payload);
            await createEvent(payload);
            toast.success(
                "Event Created"
            );
            router.push("/")
            setSubmitSuccess(true);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Something went wrong";

            toast.error(
                "Failed to create event"
            );

            console.error("Message event failed ", message)
            console.error("Create event failed:", error);
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitSuccess(false), 3000);
        }
    };


    const handleImageLoad = () => {
        setImagePreviewLoaded(true);
        setImageError(false);
    };

    const handleImageError = () => {
        setImagePreviewLoaded(false);
        setImageError(true);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-6"
                >
                    <Button onClick={()=>{
                        router.push("/")
                    }} variant="ghost" className="gap-2 text-zinc-600 hover:text-lime-500 dark:text-zinc-400 cursor-pointer! ">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Events
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                        {'Create New Event'}
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {'Fill in the details to create a new event'}
                    </p>
                </motion.div>

                {submitSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <Alert className="border-lime-500 bg-lime-50 dark:bg-lime-950/20">
                            <Check className="h-5 w-5 text-lime-600" />
                            <AlertDescription className="ml-2 text-lime-800 dark:text-lime-400">
                                Event {'created'} successfully!
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                            <CardDescription>
                                Enter the information about your event
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Event Title *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g., Tech Conference 2024"
                                                        className="focus-visible:ring-lime-500"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description *</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe your event..."
                                                        rows={4}
                                                        className="resize-none focus-visible:ring-lime-500"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="isOnline"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Event Type</FormLabel>
                                                <div className="flex gap-3">
                                                    <Button
                                                        type="button"
                                                        variant={!field.value ? "default" : "outline"}
                                                        onClick={() => {
                                                            field.onChange(false);
                                                        }}
                                                        className={`flex-1 ${!field.value ? 'bg-lime-500 text-black hover:bg-lime-600' : ''}`}
                                                    >
                                                        <MapPin className="mr-2 h-4 w-4" />
                                                        In-Person
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant={field.value ? "default" : "outline"}
                                                        onClick={() => {
                                                            field.onChange(true);
                                                            form.setValue('location', '');
                                                        }}
                                                        className={`flex-1 ${field.value ? 'bg-lime-500 text-black hover:bg-lime-600' : ''}`}
                                                    >
                                                        <Globe className="mr-2 h-4 w-4" />
                                                        Online
                                                    </Button>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {!watchIsOnline && (
                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Location *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="e.g., San Francisco Convention Center, CA"
                                                            className="focus-visible:ring-lime-500"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="startDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Start Date & Time *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="datetime-local"
                                                            className="focus-visible:ring-lime-500"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="endDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>End Date & Time *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="datetime-local"
                                                            className="focus-visible:ring-lime-500"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Event Image URL</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://example.com/image.jpg"
                                                        className="focus-visible:ring-lime-500"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />

                                                {watchImageUrl && !form.formState.errors.imageUrl && (
                                                    <div className="mt-4">
                                                        <Label className="text-zinc-900 dark:text-zinc-50 mb-2 block">
                                                            Image Preview
                                                        </Label>
                                                        <div className="relative h-96 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                                                            {!imagePreviewLoaded && !imageError && (
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <Loader2 className="h-8 w-8 animate-spin text-lime-500" />
                                                                </div>
                                                            )}
                                                            {imageError && (
                                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                                                                    <ImageIcon className="h-12 w-12 mb-2" />
                                                                    <p className="text-sm">Failed to load image</p>
                                                                </div>
                                                            )}
                                                            <Image
                                                                src={watchImageUrl}
                                                                alt="Event preview"
                                                                onLoad={handleImageLoad}
                                                                onError={handleImageError}
                                                                height={800}
                                                                width={800}
                                                                className={`w-full h-full object-cover transition-opacity ${imagePreviewLoaded ? 'opacity-100' : 'opacity-0'}`}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </FormItem>
                                        )}
                                    />

                                    {/* Capacity & Price */}
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="capacity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Capacity</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                                            <Input
                                                                type="number"
                                                                placeholder="e.g., 100"
                                                                className="pl-10 focus-visible:ring-lime-500"
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Price (USD)</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                                            <Input
                                                                type="number"
                                                                step="0.01"
                                                                placeholder="0.00"
                                                                className="pl-10 focus-visible:ring-lime-500"
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormDescription>
                                                        Leave as 0 for free events
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            onClick={form.handleSubmit(onSubmit)}
                                            disabled={isSubmitting}
                                            className="flex-1 bg-lime-500 text-white hover:bg-lime-600 font-semibold cursor-pointer!"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    {'Creating...'}
                                                </>
                                            ) : (
                                                <>{'Create Event'}</>
                                            )}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="border-zinc-300 cursor-pointer! dark:border-zinc-700"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}