package com.app.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AdminRepository;
import com.app.dao.QueryRepository;
import com.app.dao.UserRepository;
import com.app.dto.QueryDTO;
import com.app.dto.ResolveQueryDTO;
import com.app.exception.EntityNotFound;
import com.app.pojos.Admin;
import com.app.pojos.Query;
import com.app.pojos.User;

@Service
@Transactional
public class QueryServiceImpl implements QueryService {
    
    @Autowired
    private QueryRepository queryRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private AdminRepository adminRepo;
    
    public Query saveQuery(QueryDTO query,Long userId) {
    	User user = userRepo.findById(userId).orElseThrow(()->new EntityNotFound("User Not Found"));
    	Query newQuery = new Query();
    	newQuery.setQuestion(query.getQuestion());
    	newQuery.setRaisedAt(LocalDateTime.now());
    	return user.addNewQuery(newQuery);
        //return queryRepo.save(newQuery);
    }
    
    public Query getQueryById(Long id) {
        return queryRepo.findById(id).orElse(null);
    }
    
    public List<Query> getAllQueries() {
        return queryRepo.findAll();
    }
    
    public List<Query> getResolvedQueries() {
        return queryRepo.findByResolved(true);
    }
    
    public List<Query> getNonResolvedQueries() {
        return queryRepo.findByResolved(false);
    }
    
    public Query resolveQuery(Long adminId, Long queryId, ResolveQueryDTO resolvedQuery) {
    	Admin admin = adminRepo.findById(adminId).orElseThrow(()-> new EntityNotFound("Entity Not Found"));
        Query query = queryRepo.findById(queryId).orElseThrow(()-> new EntityNotFound("Entity Not Found"));
        if(query != null) {
            query.setAnswer(resolvedQuery.getAnswer());
            query.setResolved(true);
            query.setResolvedAt(LocalDateTime.now());
            return admin.resolveQuery(query);
            //return queryRepo.save(query);
        }
        return null;
    }
    
    public void deleteQuery(Long id) {
        queryRepo.deleteById(id);
    }
    
    @Override
    public List<Query> getQueriesByUserId(Long userId) {
        return queryRepo.findByUserId(userId);
    }
}
