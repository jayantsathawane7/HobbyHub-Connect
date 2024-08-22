package com.app.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@JsonIgnoreProperties({"users"})
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
//@Table(name="groups")
@Table(name="hobby_groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="group_id")
    private int groupId;

    @Column(name="name", nullable=false)
    private String name;

    @Column(name="description")
    private String description;

    @ManyToMany(mappedBy = "groupList")
    private Set<User> users = new HashSet<>();
    
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true; 
    
    public Group(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
