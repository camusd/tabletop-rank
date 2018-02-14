package com.dylancamus.tabletoprank.service.user

import com.dylancamus.tabletoprank.domain.user.*
import com.dylancamus.tabletoprank.repository.UserRepository
import org.springframework.stereotype.Service
import javax.persistence.EntityNotFoundException
import javax.transaction.Transactional

@Service
@Transactional
internal class JpaUserService(val userRepository: UserRepository) : UserService {

    override fun getUser(userId: Long): UserDto? {
        return userRepository.findOne(userId)?.toDto()
                ?: throw EntityNotFoundException("User with id: $userId not found")
    }

    override fun getUsers(): List<UserDto> {
        return userRepository.findAll().map { it.toDto() }
    }

    override fun createUser(user: CreateUserDto): UserDto {
        return userRepository.save(UserEntity.fromDto(user)).toDto()
    }

    override fun updateUser(userId: Long, user: UpdateUserDto): UserDto {
        val currentUser = userRepository.findOne(userId)
        return if (currentUser != null) userRepository.save(UserEntity.fromDto(user, currentUser)).toDto()
        else throw EntityNotFoundException("User with id: $userId not found")
    }
}
