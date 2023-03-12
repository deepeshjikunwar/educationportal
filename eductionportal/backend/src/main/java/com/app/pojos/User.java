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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "student_course",
	joinColumns = @JoinColumn(name="student_id"),
	inverseJoinColumns = @JoinColumn(name = "course_id"))
	private List<Course> enrolledCourses;
	
	@OneToMany(mappedBy = "user",cascade=CascadeType.ALL,orphanRemoval = true,fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Visit> visits;
	
	@OneToMany(mappedBy = "user",cascade=CascadeType.ALL,orphanRemoval = true,fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Query> queries;
	
	public User enrollIntoCurrentCourse(Course course) {
		enrolledCourses.add(course);
		course.setCountUser(course.getCountUser()+1);
		course.addUsertoCourse(this);
		return this;
	}
	
	public Query addNewQuery(Query query) {
		queries.add(query);
		query.setUser(this);
		return query;
	}
}

