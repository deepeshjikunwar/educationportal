package com.app.service;

import java.util.List;

import com.app.dto.QueryDTO;
import com.app.dto.ResolveQueryDTO;
import com.app.pojos.Query;

public interface QueryService {
Query saveQuery(QueryDTO query,Long userId);
Query getQueryById(Long id);
List<Query> getAllQueries();
List<Query> getResolvedQueries();
List<Query> getNonResolvedQueries();
Query resolveQuery(Long adminId, Long queryId, ResolveQueryDTO resolvedQuery);
void deleteQuery(Long id);
List<Query> getQueriesByUserId(Long userId);
}
