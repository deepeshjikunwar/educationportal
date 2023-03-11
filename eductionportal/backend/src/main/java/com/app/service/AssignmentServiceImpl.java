package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AssignmentRepository;
import com.app.dao.CourseRepository;
import com.app.dto.AssignmentDTO;
import com.app.exception.EntityNotFound;
import com.app.pojos.Assignment;
import com.app.pojos.Course;

@Service
@Transactional
public class AssignmentServiceImpl implements AssignmentService {

	@Autowired
	private CourseRepository courseRepo;
	@Autowired
	private AssignmentRepository assignmentRepo;
	@Override
	public Assignment addAssignmentByCourseId(AssignmentDTO transientAssignment, Long courseId) {
		Course existingCourse = courseRepo.findById(courseId).orElseThrow(()-> new EntityNotFound("No Such Course Exist with ID: " +courseId ));
		Assignment assignment = new Assignment();
		assignment.setTitle(transientAssignment.getTitle());
		assignment.setDescription(transientAssignment.getDescription());
		assignment.setDueDate(transientAssignment.getDueDate());
		return existingCourse.addAssignmentToCourse(assignment);
	}

	@Override
	public List<Assignment> getAllAssignmentsByCourseId(Long courseId) {
		return assignmentRepo.findAllAssignmentByCourseId(courseId);
	}

	@Override
	public void deleteAssignmentFromCourse(Long courseId, Long assignmentId) {
		Course course = courseRepo.findCourseById(courseId);
		Assignment assignment = assignmentRepo.findAssignmentById(assignmentId);
		course.getAssignments().remove(assignment);
		courseRepo.save(course);
	}

}
