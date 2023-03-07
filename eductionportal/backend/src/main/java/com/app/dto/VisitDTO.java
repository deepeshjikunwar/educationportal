package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class VisitDTO {
	private boolean isVisited;
	
	public boolean isVisited() {
        return isVisited;
    }
    public void setVisited(boolean isVisited) {
        this.isVisited = isVisited;
    }
}
