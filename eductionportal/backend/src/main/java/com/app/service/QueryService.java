package com.app.service;

import java.util.List;

import com.app.dto.QueryDTO;
import com.app.dto.ResolveQueryDTO;
import com.app.pojos.Query;

public interface QueryService {
Query saveQuery(QueryDTO query);
Query getQueryById(Long id);
List<Query> getAllQueries();
List<Query> getResolvedQueries();
List<Query> getNonResolvedQueries();
Query resolveQuery(Long id, ResolveQueryDTO resolvedQuery);
void deleteQuery(Long id);
}
