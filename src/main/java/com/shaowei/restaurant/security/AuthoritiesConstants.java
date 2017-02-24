package com.shaowei.restaurant.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

	public static final String ROOT = "ROLE_ROOT";
	
	public static final String SYSTEM = "ROLE_SYSTEM";
	
    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";
    
    public static final String CASHIER = "ROLE_CASHIER";
    
    public static final String SERVER = "ROLE_SERVER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    private AuthoritiesConstants() {
    }
}
