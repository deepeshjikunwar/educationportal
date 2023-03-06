package com.app.exception;

@SuppressWarnings("serial")
public class EntityNotFound extends RuntimeException {
	public EntityNotFound(String message) {
		super(message);
	}
}
