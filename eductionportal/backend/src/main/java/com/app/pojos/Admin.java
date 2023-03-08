package com.app.pojos;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

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
@Table(name="admin")
public class Admin extends BaseEntity {
	@Column(length=20)
	private String firstName;
	@Column(length=20)
	private String lastName;
	@Column(length=20, unique=true)
	private String email;
	@Column(length=20)
	private String password;
	
	@OneToMany(mappedBy = "admin",cascade=CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
	private List<Course> courses;
	
	public Course addCourse(Course course) {
		courses.add(course);
		course.setAdmin(this);
		return course;
	}
	
}
