package com.dylancamus.tabletoprank.service

import com.dylancamus.tabletoprank.domain.user.CreateUserDto
import com.dylancamus.tabletoprank.domain.user.UpdateUserDto
import com.dylancamus.tabletoprank.domain.user.UserEntity
import com.dylancamus.tabletoprank.repository.UserRepository
import com.dylancamus.tabletoprank.service.user.JpaUserService
import com.nhaarman.mockito_kotlin.whenever
import org.hamcrest.Matchers.*
import org.junit.Test

import org.junit.Assert.*
import org.junit.Before
import org.junit.runner.RunWith
import org.mockito.*
import org.mockito.Matchers.any
import org.mockito.Mockito.*
import org.mockito.runners.MockitoJUnitRunner
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import javax.persistence.EntityNotFoundException

@RunWith(MockitoJUnitRunner::class)
internal class JpaUserServiceTest {

    private val expectedEmail = "apple"

    @InjectMocks
    private lateinit var subject: JpaUserService

    @Mock
    private lateinit var mockUserRepository: UserRepository

    @Mock
    private lateinit var mockBCryptPasswordEncoder: BCryptPasswordEncoder

    @Mock
    private lateinit var mockAuthentication: Authentication

    @Mock
    private lateinit var mockSecurityContext: SecurityContext

    @Captor
    private lateinit var userEntityArgumentCaptor: ArgumentCaptor<UserEntity>

    @Before
    fun setUp() {
        whenever(mockAuthentication.principal).thenReturn(expectedEmail)
        whenever(mockSecurityContext.authentication).thenReturn(mockAuthentication)
        SecurityContextHolder.setContext(mockSecurityContext)
    }

    @Test(expected = EntityNotFoundException::class)
    fun `'getUser' should throw exception if repository doesn't contain the entity`() {
        subject.getUser()
    }

    @Test
    fun `'getUser' should return UserDto if repository contains the entity`() {
        val expectedUserEntity = UserEntity(1L, expectedEmail,
                "banana", "pear", "mango")
        whenever(mockUserRepository.findByEmail(expectedEmail))
                .thenReturn(expectedUserEntity)
        assertThat(subject.getUser(), `is`(expectedUserEntity.toDto()))
    }

    @Test
    fun `'createUser' should persist the entity and return UserDto`() {
        val expectedUnEncryptedPassword = "banana"
        val expectedEncryptedPassword = "pineapple"
        val expectedFirstName = "pear"
        val expectedLastName = "mango"
        val expectedCreateUserDto = CreateUserDto(expectedEmail,
                expectedUnEncryptedPassword, expectedFirstName, expectedLastName)
        whenever(mockUserRepository.save(any(UserEntity::class.java))).thenAnswer({
            it.getArgumentAt(0, UserEntity::class.java)
        })
        whenever(mockBCryptPasswordEncoder.encode(anyString())).thenReturn(expectedEncryptedPassword)
        val actualUserDto = subject.createUser(expectedCreateUserDto)
        verify(mockUserRepository, times(1)).save(userEntityArgumentCaptor.capture())
        val capturedUser = userEntityArgumentCaptor.value;
        assertThat(actualUserDto, `is`(capturedUser.toDto()))
        assertThat(capturedUser.password, `is`(expectedEncryptedPassword))
    }

    @Test
    fun `'updateUser' should persist entity with updated properties and return UserDto`() {
        val expectedUpdateUserDto = UpdateUserDto(null,
                null, "pineapple", null)
        val expectedUserEntity = UserEntity(1L, "apple",
                "banana", "pear", "mango")
        whenever(mockUserRepository.findByEmail(expectedEmail)).thenReturn(expectedUserEntity)
        whenever(mockUserRepository.save(any(UserEntity::class.java))).thenAnswer({
            it.getArgumentAt(0, UserEntity::class.java)
        })
        val actualUserDto = subject.updateUser(expectedUpdateUserDto)
        verify(mockUserRepository, times(1)).save(userEntityArgumentCaptor.capture())
        assertThat(actualUserDto, `is`(userEntityArgumentCaptor.value.toDto()))
    }

    @Test(expected = EntityNotFoundException::class)
    fun `'updateUser' should throw exception if repository does not contain entity with given id`() {
        whenever(mockUserRepository.findOne(anyLong())).thenReturn(null)
        subject.updateUser(UpdateUserDto(null,
                null, "apple", "banana"))
    }
}
