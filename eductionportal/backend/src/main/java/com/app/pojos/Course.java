package com.app.pojos;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name="courses")
public class Course extends BaseEntity{
	private String title;

	private LocalDate startDate;
	private LocalDate endDate;
	private int capacity;

	@OneToMany(mappedBy = "course",cascade=CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
	private List<Content> contents;

	@ManyToMany(mappedBy = "enrolledCourses")
	@JsonIgnore
	private List<User> enrolledUsers;
	
	public void addUsertoCourse(User user) {
		enrolledUsers.add(user);
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	private Admin admin;
	
//	@OneToMany(mappedBy = "course",cascade=CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
//	private List<Assignment> assignments;

}
