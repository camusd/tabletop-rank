package com.dylancamus.tabletoprank.domain.user

import org.hibernate.validator.constraints.Email

data class AuthorizationDto(@Email val email: String, val password: String)
