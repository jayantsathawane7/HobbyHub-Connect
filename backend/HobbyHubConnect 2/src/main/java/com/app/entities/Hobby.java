package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="hobbies")
public class Hobby {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String name;
    
    private String description;
    
    @Column(name = "is_active")
    private boolean isActive = true; // default to true
    
//    @ManyToOne
//    @JoinColumn(name="user_id")
//    User uid;
    
    @Column(name = "user_id")
    private Integer userId; // Add this field

	public Hobby(String name, String description) {
		super();
		this.name = name;
		this.description = description;
	}
    
}

