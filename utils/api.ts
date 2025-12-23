import { ApiResponse, CreateEventInput, EventResponse, UpdateEventInput } from "@/types/Event.types";
import { apiClient } from "./apiClient";

export const getEvents = () =>
    apiClient<{ success: boolean; events: EventResponse[] }>("/api/events")

export const getEventById = (id: number) =>
    apiClient<{ success: boolean; event: EventResponse }>(`/api/events/${id}`);

export const createEvent = (data: CreateEventInput) =>
    apiClient<{ success: boolean; event: EventResponse }>("/api/events", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const updateEvent = (id: number, data: UpdateEventInput) =>
    apiClient<{ success: boolean; event: EventResponse }>(`/api/events/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });

export const deleteEvent = (id: number) =>
    apiClient<{ success: boolean; message: string }>(`/api/events/${id}`, {
        method: "DELETE",
    });