package com.dylancamus.tabletoprank.web

import com.dylancamus.tabletoprank.domain.user.UserEntity
import com.dylancamus.tabletoprank.domain.user.UserRepository
import io.restassured.RestAssured
import io.restassured.RestAssured.`when`
import org.junit.Before
import org.junit.Test

import org.junit.Assert.*
import org.hamcrest.CoreMatchers.*
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.embedded.LocalServerPort
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import javax.transaction.Transactional

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class UserEntityControllerTest {

    @LocalServerPort
    private var port: Int = 0

    @Autowired
    private lateinit var repository: UserRepository

    private var expectedUserEntity: UserEntity? = null

    @Before
    fun setUp() {
        RestAssured.port = port
        expectedUserEntity = repository.save(UserEntity("Dylan", "Camus"))
        repository.save(UserEntity("Jack", "Bauer"))
        repository.save(UserEntity("Chloe", "O'Brian"))
        repository.save(UserEntity("Kim", "Bauer"))
        repository.save(UserEntity("David", "Palmer"))
        repository.save(UserEntity("Michelle", "Dessler"))
    }

    @Test
    fun findAll() {
        `when`().get("/api/user/").then().log().all().assertThat().body("size()", `is`(6))
    }

    @Test
    fun findById() {
        val actualUserEntity: UserEntity? = repository.findById(expectedUserEntity?.id ?: 1L)
        assertThat(actualUserEntity?.firstName, `is`(expectedUserEntity?.firstName))
        assertThat(actualUserEntity?.lastName, `is`(expectedUserEntity?.lastName))
    }
}