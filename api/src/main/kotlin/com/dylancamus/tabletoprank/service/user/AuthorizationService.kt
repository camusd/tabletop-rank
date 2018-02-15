package com.dylancamus.tabletoprank.service.user

import com.dylancamus.tabletoprank.domain.user.AuthorizationDto
import com.dylancamus.tabletoprank.domain.user.UserDto

interface AuthorizationService {

    fun login(dto: AuthorizationDto): UserDto
}