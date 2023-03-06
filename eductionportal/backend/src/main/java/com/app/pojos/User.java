package com.app.pojos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name="users")
public class User extends BaseEntity {
	@Column(length=20)
	private String firstName;
	@Column(length=20)
	private String lastName;
	@Column(length=20, unique=true)
	private String email;
	private String password;
	
	@ManyToMany
	@JoinTable(name = "student_course",
	joinColumns = @JoinColumn(name="student_id"),
	inverseJoinColumns = @JoinColumn(name = "course_id"))
	@JsonIgnore
	private List<Course> enrolledCourses;
	
	public User enrollIntoCurrentCourse(Course course) {
		enrolledCourses.add(course);
		course.addUsertoCourse(this);
		return this;
	}
	@OneToMany(mappedBy = "user",cascade=CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
	private List<Visit> visits;
}

