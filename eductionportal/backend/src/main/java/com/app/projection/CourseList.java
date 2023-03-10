package com.app.projection;

import java.time.LocalDate;
import java.util.List;

import com.app.pojos.Assignment;
import com.app.pojos.Content;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CourseList {
	private String title;
	private LocalDate startDate;
	private LocalDate endDate;
	private int capacity;
	private List<Content> contents;
	private List<Assignment> assignments;
}

