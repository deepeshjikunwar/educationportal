package com.app.service;

import com.app.dto.AdminSignup;
import com.app.pojos.Admin;

public interface AdminService {
Admin authenticateAdmin(String email, String password);
Admin addAdmin(AdminSignup transientAdmin);
}
