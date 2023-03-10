package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.ContentRepository;
import com.app.dao.UserRepository;
import com.app.dao.VisitRepository;
import com.app.exception.EntityNotFound;
import com.app.pojos.Content;
import com.app.pojos.User;
import com.app.pojos.Visit;

@Service
@Transactional
public class VisitServiceImpl implements VisitService {

	@Autowired
	private VisitRepository visitRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ContentRepository contentRepo;

	@Override
	public Visit markContentAsVisited(Long userId, Long contentId, boolean isVisited){
		
		Visit visit = visitRepo.findByUserIdAndContentId(userId, contentId);
		System.out.println("in service of markasvisited");
		User user = userRepo.findById(userId).orElseThrow(()-> new EntityNotFound("No such entity"));
		Content content = contentRepo.findById(contentId).orElseThrow(()-> new EntityNotFound("No such entity"));
		if(visit==null) {
			visit = new Visit();
		}
		visit.setUser(user);
		visit.setContent(content);
		visit.setVisited(isVisited);
		return visitRepo.save(visit);
	}

	@Override
	public Visit getVisited(Long userId, Long contentId) {
		return visitRepo.findByUserIdAndContentId(userId, contentId);
	}
}
