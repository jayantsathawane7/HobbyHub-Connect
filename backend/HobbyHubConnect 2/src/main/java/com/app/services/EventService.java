package com.app.services;

import com.app.entities.Event;
import com.app.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private NotificationService notificationService;

    public Event createEvent(Event event) {
        Event createdEvent = eventRepository.save(event);
        String message = "A new group has been created: " + createdEvent.getName();
        notificationService.sendNotificationToAllUsers(message);
        return createdEvent;
    }

    public List<Event> getActiveEvents() {
        return eventRepository.findByIsActiveTrue();
    }

    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }

    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    public Event getEventById(Long eventId) {
        return eventRepository.findById(eventId).orElse(null);
    }
}
