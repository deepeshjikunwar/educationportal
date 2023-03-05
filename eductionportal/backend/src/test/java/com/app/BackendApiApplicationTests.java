package com.app;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.app.dao.UserRepository;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.service.IUserService;

@SpringBootTest
class BackendApiApplicationTests {

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private IUserService userService;
	@Test
	void contextLoads() {
		List<User> allUsers = userService.getAllUsers();
		System.out.println(allUsers);
		assertEquals(0,allUsers.size());
	}
	//add a test case to insert user data
	@Test
	public void testSaveUser()throws Exception
	{
		//firstName,lastName,userName,age,role
		User user = new User("Deepesh","Kunwar","djk","pass",27,Role.ADMIN);
		User persistentUser = userRepo.save(user);
		assertEquals(2, persistentUser.getId());
	}

}
