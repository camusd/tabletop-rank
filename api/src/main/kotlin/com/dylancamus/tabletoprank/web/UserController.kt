package com.dylancamus.tabletoprank.web

import com.dylancamus.tabletoprank.domain.user.UserDto
import com.dylancamus.tabletoprank.service.user.UserService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/user")
class UserController(val service: UserService) {

    @GetMapping("")
    fun getUsers(): List<UserDto> = service.getUsers()

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: Long) = service.getUser(id)
}