package com.app.pojos;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
public class Content extends BaseEntity {

	@Column(length=20)
	private String contentName;
	@Column(length=200)
	private String link;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="course_id")
	@JsonIgnore
	private Course course;
	
	@OneToMany(mappedBy = "content",cascade=CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
	@JsonIgnore
	private List<Visit> visits;
	
}
