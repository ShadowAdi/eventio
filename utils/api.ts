import { ApiResponse, CreateEventInput, EventResponse, UpdateEventInput } from "@/types/Event.types";
import { apiClient } from "./apiClient";

export const getEvents = () => apiClient<{ response: ApiResponse<EventResponse[]> }>("/api/events")

export const getEventById = (id: number) =>
    apiClient<ApiResponse<EventResponse>>(`/api/events/${id}`);

export const createEvent = (data: CreateEventInput) =>
    apiClient<ApiResponse<EventResponse>>("/api/events", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const updateEvent = (id: number, data: UpdateEventInput) =>
    apiClient<Event>(`/api/events/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });

export const deleteEvent = (id: number) =>
    apiClient<void>(`/api/events/${id}`, {
        method: "DELETE",
    });