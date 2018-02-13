package com.dylancamus.tabletoprank.integration

import com.dylancamus.tabletoprank.domain.user.UserEntity
import com.dylancamus.tabletoprank.repository.UserRepository
import io.restassured.RestAssured
import io.restassured.RestAssured.given
import org.junit.Before
import org.junit.Test

import org.hamcrest.CoreMatchers.*
import org.junit.After
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.embedded.LocalServerPort
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpStatus
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
internal class UserIntegrationTest {

    @LocalServerPort
    private var port: Int = 0

    @Autowired
    private lateinit var userRepository: UserRepository

    private val users = mutableListOf<UserEntity>()

    @Before
    fun setUp() {
        RestAssured.port = port
        users.add(UserEntity(firstName = "Dylan", lastName = "Camus"))
        users.add(UserEntity(firstName = "Jack", lastName = "Bauer"))
        users.add(UserEntity(firstName = "Chloe", lastName = "O'Brian"))
        users.add(UserEntity(firstName = "Kim", lastName = "Bauer"))
        users.add(UserEntity(firstName = "David", lastName = "Palmer"))
        users.add(UserEntity(firstName = "Michelle", lastName = "Dessler"))
        userRepository.save(users)
    }

    @After
    fun tearDown() {
        userRepository.delete(users)
    }

    @Test
    fun getUsers() {
        given().auth().basic("user", "password")
                .`when`().get("/api/user/").then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("size()", `is`(6))
    }

    @Test
    fun getUser() {
        val user = users[0]
        given().auth().basic("user", "password")
                .`when`().get(String.format("/api/user/%d", user.id)).then().log().all()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("firstName", `is`(user.firstName))
                .assertThat().body("lastName", `is`(user.lastName))
    }
}
