package com.app.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.QueryRepository;
import com.app.dto.QueryDTO;
import com.app.dto.ResolveQueryDTO;
import com.app.pojos.Query;

@Service
@Transactional
public class QueryServiceImpl implements QueryService {
    
    @Autowired
    private QueryRepository queryRepo;
    
    public Query saveQuery(QueryDTO query) {
    	Query newQuery = new Query();
    	newQuery.setQuestion(query.getQuestion());
    	newQuery.setRaisedAt(LocalDateTime.now());
        return queryRepo.save(newQuery);
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
    
    public Query resolveQuery(Long id, ResolveQueryDTO resolvedQuery) {
        Query query = queryRepo.findById(id).orElse(null);
        if(query != null) {
            query.setAnswer(resolvedQuery.getAnswer());
            query.setResolved(true);
            query.setResolvedAt(LocalDateTime.now());
            return queryRepo.save(query);
        }
        return null;
    }
    
    public void deleteQuery(Long id) {
        queryRepo.deleteById(id);
    }
}
