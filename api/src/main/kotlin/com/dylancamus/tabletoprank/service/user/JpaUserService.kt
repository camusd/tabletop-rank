package com.dylancamus.tabletoprank.service.user

import com.dylancamus.tabletoprank.domain.user.*
import com.dylancamus.tabletoprank.repository.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import javax.persistence.EntityNotFoundException
import javax.transaction.Transactional

@Service
@Transactional
internal class JpaUserService(val userRepository: UserRepository,
                              val bCryptPasswordEncoder: BCryptPasswordEncoder) : UserService {

    override fun getUser(): UserDto {
        val authentication = SecurityContextHolder.getContext().authentication
        val email = authentication.principal.toString()
        return userRepository.findByEmail(email)?.toDto()
                ?: throw EntityNotFoundException("User with email: $email not found")
    }

    override fun createUser(user: CreateUserDto): UserDto {
        val userEncrypted = user.copy(password = bCryptPasswordEncoder.encode(user.password))
        return userRepository.save(UserEntity.fromDto(userEncrypted)).toDto()
    }

    override fun updateUser(user: UpdateUserDto): UserDto {
        val authentication = SecurityContextHolder.getContext().authentication
        val email = authentication.principal.toString()
        val currentUser = userRepository.findByEmail(email)
        return if (currentUser != null) userRepository.save(UserEntity.fromDto(user, currentUser)).toDto()
        else throw EntityNotFoundException("User with email: $email not found")
    }
}
