package com.dylancamus.tabletoprank.domain.user

import org.hibernate.validator.constraints.Email
import javax.persistence.*

@Entity
@Table(indexes = [Index(name = "IDX_EMAIL", columnList = "email")])
internal data class UserEntity(
        @Id @GeneratedValue(strategy = GenerationType.AUTO) val id: Long = 0,
        @Email @Column(unique = true) val email: String,
        val password: String,
        val firstName: String,
        val lastName: String) {

    fun toDto(): UserDto = UserDto(
            id = this.id,
            email = this.email,
            firstName = this.firstName,
            lastName = this.lastName)

    companion object {

        fun fromDto(dto: CreateUserDto) = UserEntity(
                email = dto.email,
                password = dto.password,
                firstName = dto.firstName,
                lastName = dto.lastName)

        fun fromDto(dto: UpdateUserDto, user: UserEntity) = UserEntity(
                id = user.id,
                email = dto.email ?: user.email,
                password = dto.password ?: user.password,
                firstName = dto.firstName ?: user.firstName,
                lastName = dto.lastName ?: user.lastName)
    }
}
