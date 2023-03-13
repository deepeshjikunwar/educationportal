package com.app.service;

import java.util.List;

import com.app.pojos.Visit;

public interface VisitService {
	public Visit markContentAsVisited(Long userId, Long contentId, boolean isVisited);
	Visit getVisited(Long userId, Long contentId);
	//List<Visit> getAllVisite(Long userId);
}
