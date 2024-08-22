package com.app.entities;
public class LoginResponse {
    private String message; // For error or status messages
    private Login login;    // For holding login details

    // Default constructor
    public LoginResponse() {}

    // Constructor for error messages
    public LoginResponse(String message) {
        this.message = message;
    }

    // Constructor for successful login
    public LoginResponse(Login login) {
        this.login = login;
    }

    // Getter and setter for message
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // Getter and setter for login
    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }
}
