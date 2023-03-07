package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.AddContent;
import com.app.dto.AddCourse;
import com.app.dto.AdminSignup;
import com.app.dto.UserDTO;
import com.app.pojos.Admin;
import com.app.pojos.Content;
import com.app.pojos.Course;

public interface AdminService {
Admin authenticateAdmin(String email, String password);
Admin addAdmin(AdminSignup transientAdmin);
Course addCourse(AddCourse transientCourse, Long adminId);
Content addContent(AddContent transientContent, Long courseId);
Optional<Admin> findById(Long adminId);
List<Course> findAllCourseByAdminId(Long adminId);
List<UserDTO> getUsersEnrolledInCourseAddedByAdmin(Long adminId, Long courseId);
}
