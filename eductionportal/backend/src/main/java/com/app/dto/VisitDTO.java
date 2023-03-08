package com.app.dto;


import com.app.pojos.Content;
import com.app.pojos.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VisitDTO {
	
	private User user;
	private Content content;
	private boolean isVisited;
}
