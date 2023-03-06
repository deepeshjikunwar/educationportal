package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Visit extends BaseEntity {
	
@ManyToOne(fetch = FetchType.EAGER)
@JsonIgnore
private User user;

@ManyToOne(fetch = FetchType.EAGER)
@JsonIgnore
private Content content;

private boolean isVisited;

}
