package com.dylancamus.tabletoprank.service.user

import com.dylancamus.tabletoprank.domain.user.CreateUserDto
import com.dylancamus.tabletoprank.domain.user.UpdateUserDto
import com.dylancamus.tabletoprank.domain.user.UserDto
import org.springframework.stereotype.Service

interface UserService {

    fun getUser(userId: Long): UserDto

    fun getUsers(): List<UserDto>

    fun createUser(user: CreateUserDto): UserDto

    fun updateUser(userId: Long, user: UpdateUserDto): UserDto
}
