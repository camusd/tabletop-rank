package com.dylancamus.tabletoprank.domain.user

data class UpdateUserDto(val email: String?, val password: String?,
                         val firstName: String?, val lastName: String?)
