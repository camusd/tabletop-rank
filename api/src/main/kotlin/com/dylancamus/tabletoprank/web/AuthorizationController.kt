package com.dylancamus.tabletoprank.web

import com.dylancamus.tabletoprank.domain.user.AuthorizationDto
import com.dylancamus.tabletoprank.service.authorization.AuthorizationService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthorizationController(val service: AuthorizationService) {

    @PostMapping("")
    fun login(@RequestBody dto: AuthorizationDto) = service.login(dto)
}