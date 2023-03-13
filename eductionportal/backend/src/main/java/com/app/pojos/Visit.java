package com.app.pojos;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
	
@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
//@OnDelete(action = OnDeleteAction.CASCADE)
@JsonIgnore
private User user;

@ManyToOne(fetch = FetchType.EAGER)
@JsonIgnore
private Content content;

private boolean isVisited;

}
