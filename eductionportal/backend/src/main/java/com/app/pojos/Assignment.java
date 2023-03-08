//package com.app.pojos;
//
//import java.time.LocalDate;
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.OneToMany;
//import javax.persistence.Table;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//@Entity
//@Table(name="assignments")
//public class Assignment extends BaseEntity{
//	private String title;
//	private String description;
//	private LocalDate dueDate;
//	private boolean isCompleted;
//
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "course_id", nullable = false)
//	@JsonIgnore
//	private Course course;
//
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "user_id", nullable = false)
//	@JsonIgnore
//	private User user;
//	
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "admin_id", nullable = false)
//	@JsonIgnore
//	private Admin admin;
//
//	public void markAsComplete() {
//		this.isCompleted = true;
//	}
//}
