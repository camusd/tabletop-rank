package com.dylancamus.tabletoprank.repository

import com.dylancamus.tabletoprank.domain.user.UserEntity
import org.hibernate.validator.constraints.Email
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import javax.transaction.Transactional

@Repository
@Transactional
internal interface UserRepository : JpaRepository<UserEntity, Long> {

    fun findByEmail(@Email email: String): UserEntity
}
