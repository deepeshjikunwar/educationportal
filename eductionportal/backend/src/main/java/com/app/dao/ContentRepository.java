package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Admin;
import com.app.pojos.Content;

public interface ContentRepository extends JpaRepository<Content,Long> {
}
