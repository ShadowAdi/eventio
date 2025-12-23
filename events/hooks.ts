import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "@/utils/api";
import { CreateEventInput, UpdateEventInput } from "@/validators/event.validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useEvents = () => useQuery({
    queryKey: ["events"],
    queryFn: getEvents
})


export const useEvent = (id: number) => useQuery({
    queryKey: ["events", id],
    queryFn: () => getEventById(id),
    enabled: !!id,
})

export const useCreateEvent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventInput) => createEvent(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
};


export const useUpdateEvent = (id: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateEventInput) => updateEvent(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["events", id] });
    },
  });
};

export const useDeleteEvent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteEvent(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
