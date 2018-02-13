package com.dylancamus.tabletoprank.service

import com.dylancamus.tabletoprank.domain.user.CreateUserDto
import com.dylancamus.tabletoprank.domain.user.UpdateUserDto
import com.dylancamus.tabletoprank.domain.user.UserEntity
import com.dylancamus.tabletoprank.repository.UserRepository
import com.dylancamus.tabletoprank.service.user.JpaUserService
import org.hamcrest.Matchers.*
import org.junit.Test

import org.junit.Assert.*
import org.junit.runner.RunWith
import org.mockito.*
import org.mockito.Matchers.any
import org.mockito.Matchers.eq
import org.mockito.Mockito.*
import org.mockito.runners.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
internal class JpaUserServiceTest {

    @InjectMocks
    private lateinit var subject: JpaUserService

    @Mock
    private lateinit var mockUserRepository: UserRepository

    @Captor
    private lateinit var userEntityArgumentCaptor: ArgumentCaptor<UserEntity>

    @Test
    fun `'getUsers' should return empty list if repository doesn't contain entities`() {
        `when`(mockUserRepository.findAll()).thenReturn(emptyList())
        assertThat(subject.getUsers(), `is`(empty()))
    }

    @Test
    fun `'getUsers' should return list of UserDtos if repository contains entities`() {
        `when`(mockUserRepository.findAll()).thenReturn(mutableListOf(
                UserEntity(firstName = "apple", lastName = "banana"),
                UserEntity(firstName = "pear", lastName = "mango")))
        assertThat(subject.getUsers().size, `is`(2))
    }

    @Test
    fun `'getUser' should return null if repository doesn't contain the entity`() {
        `when`(mockUserRepository.findOne(anyLong())).thenReturn(null)
        assertThat(subject.getUser(1L), `is`(nullValue()))
    }

    @Test
    fun `'getUser' should return UserDto if repository contains the entity`() {
        val expectedId = 1L
        val expectedUserEntity = UserEntity(expectedId, "apple", "pear")
        `when`(mockUserRepository.findOne(eq(expectedId)))
                .thenReturn(expectedUserEntity)
        assertThat(subject.getUser(expectedId), `is`(expectedUserEntity.toDto()))
    }

    @Test
    fun `'createUser' should persist the entity and return UserDto`() {
        val expectedFirstName = "apple"
        val expectedLastName = "banana"
        val expectedCreateUserDto = CreateUserDto(expectedFirstName, expectedLastName)
        `when`(mockUserRepository.save(any(UserEntity::class.java))).thenAnswer({
            it.getArgumentAt(0, UserEntity::class.java)
        })
        val actualUserDto = subject.createUser(expectedCreateUserDto)
        verify(mockUserRepository, times(1)).save(userEntityArgumentCaptor.capture())
        assertThat(actualUserDto, `is`(userEntityArgumentCaptor.value.toDto()))
    }

    @Test
    fun `'updateUser' should persist entity with updated properties and return UserDto`() {
        val expectedId = 1L
        val expectedFirstName = "apple"
        val expectedLastName = "banana"
        val updatedLastName = "pear"
        val expectedUpdateUserDto = UpdateUserDto(expectedFirstName, updatedLastName)
        val expectedUserEntity = UserEntity(expectedId, expectedFirstName, expectedLastName)
        `when`(mockUserRepository.findOne(eq(expectedId))).thenReturn(expectedUserEntity)
        `when`(mockUserRepository.save(any(UserEntity::class.java))).thenAnswer({
            it.getArgumentAt(0, UserEntity::class.java)
        })
        val actualUserDto = subject.updateUser(expectedId, expectedUpdateUserDto)
        verify(mockUserRepository, times(1)).save(userEntityArgumentCaptor.capture())
        assertThat(actualUserDto, `is`(userEntityArgumentCaptor.value.toDto()))
    }

    @Test
    fun `'updateUser' should return null if repository does not contain entity with given id`() {
        `when`(mockUserRepository.findOne(anyLong())).thenReturn(null)
        assertThat(subject.updateUser(1L, UpdateUserDto("apple", "banana")), `is`(nullValue()))
    }
}