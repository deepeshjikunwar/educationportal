package com.app.service;

import com.app.dto.AddContent;
import com.app.dto.AddCourse;
import com.app.dto.AdminSignup;
import com.app.pojos.Admin;
import com.app.pojos.Content;
import com.app.pojos.Course;

public interface AdminService {
Admin authenticateAdmin(String email, String password);
Admin addAdmin(AdminSignup transientAdmin);
Course addCourse(AddCourse transientCourse);
Content addContent(AddContent transientContent, Long courseId);
}
