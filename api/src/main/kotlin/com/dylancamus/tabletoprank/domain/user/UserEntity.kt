package com.dylancamus.tabletoprank.domain.user

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
internal data class UserEntity(
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long = 0,
    val firstName: String,
    val lastName: String) {

    fun toDto(): UserDto = UserDto(
            id = this.id,
            firstName = this.firstName,
            lastName = this.lastName)

    companion object {

        fun fromDto(dto: UserDto) = UserEntity(
                id = dto.id,
                firstName = dto.firstName,
                lastName = dto.lastName)

        fun fromDto(dto: CreateUserDto) = UserEntity(
                firstName = dto.firstName,
                lastName = dto.lastName)

        fun fromDto(dto: UpdateUserDto, user: UserEntity) = UserEntity(
                id = user.id,
                firstName = dto.firstName ?: user.firstName,
                lastName = dto.lastName ?: user.lastName)
    }
}