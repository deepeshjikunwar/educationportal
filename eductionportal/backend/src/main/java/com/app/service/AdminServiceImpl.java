package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.AdminRepository;
import com.app.dto.AdminSignup;
import com.app.pojos.Admin;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminRepository adminRepo;

	@Override
	public Admin authenticateAdmin(String email, String password) {
		return adminRepo.findByEmailAndPassword(email, password);
	}

	@Override
	public Admin addAdmin(AdminSignup transientAdmin) {
		Admin admin = new Admin();
		admin.setFirstName(transientAdmin.getFirstName());
		admin.setLastName(transientAdmin.getLastName());
		admin.setEmail(transientAdmin.getEmail());
		admin.setPassword(transientAdmin.getPassword());
		return adminRepo.save(admin);
	}

}
