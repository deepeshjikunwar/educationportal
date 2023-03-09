package com.app.service;

import java.util.List;

import com.app.dto.AssignmentDTO;
import com.app.pojos.Assignment;

public interface AssignmentService {
	Assignment addAssignmentByCourseId(AssignmentDTO transientAssignment,Long courseId);
	List<Assignment> getAllAssignmentsByCourseId(Long courseId);
}
