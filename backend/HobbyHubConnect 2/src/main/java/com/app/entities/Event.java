package com.app.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;

    @JsonFormat(pattern = "HH:mm:ss") // Define the format expected for eventTime
    @Column(name = "event_time", nullable = false)
    private LocalTime eventTime;

    @Column(nullable = false)
    private String location;

    @Column(name = "organizer_id", nullable = false)
    private Long organizerId; // ID of the user who organized the event

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "registration_start_date", nullable = false)
    private LocalDate registrationStartDate;

    @Column(name = "registration_end_date", nullable = false)
    private LocalDate registrationEndDate;

    @Column(nullable = false)
    private Double fees;

    @PrePersist
    @PreUpdate
    protected void checkActiveStatus() {
        if (LocalDate.now().isAfter(eventDate)) {
            this.isActive = false;
        }
    }
}
