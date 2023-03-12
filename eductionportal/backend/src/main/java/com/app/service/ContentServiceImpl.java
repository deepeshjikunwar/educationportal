package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ContentRepository;
import com.app.dao.CourseRepository;
import com.app.exception.EntityNotFound;
import com.app.pojos.Content;
import com.app.pojos.Course;

@Service
@Transactional
public class ContentServiceImpl implements ContentService {

    @Autowired
    private ContentRepository contentRepo;
    @Autowired
    private CourseRepository courseRepo;

    @Override
    public void deleteContentById(Long courseId,Long contentId) {
    	Course course = courseRepo.findById(courseId).orElseThrow(()-> new EntityNotFound("Entity doesn't exist"));
    	Content content = contentRepo.findById(contentId).orElseThrow(()-> new EntityNotFound("Entity doesn't exist"));
    	Content markedcontent = course.deleteContentFromCourse(content);
    	contentRepo.delete(markedcontent);
        //contentRepo.deleteById(contentId);
    }
}