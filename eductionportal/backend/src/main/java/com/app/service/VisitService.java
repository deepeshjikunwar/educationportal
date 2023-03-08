package com.app.service;

import com.app.pojos.Visit;

public interface VisitService {
	public Visit markContentAsVisited(Long userId, Long contentId, boolean isVisited);
}
