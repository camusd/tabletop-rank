package com.dylancamus.tabletoprank.service.user

import com.dylancamus.tabletoprank.domain.user.AuthorizationDto
import com.dylancamus.tabletoprank.repository.UserRepository
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
@Transactional
internal class JpaAuthorizationService(val repository: UserRepository) : AuthorizationService {

    override fun login(dto: AuthorizationDto) = repository.findByEmail(dto.email).toDto()
}