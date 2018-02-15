package com.dylancamus.tabletoprank.integration

import com.dylancamus.tabletoprank.domain.user.CreateUserDto
import com.dylancamus.tabletoprank.domain.user.UpdateUserDto
import com.dylancamus.tabletoprank.domain.user.UserEntity
import com.dylancamus.tabletoprank.repository.UserRepository
import io.restassured.RestAssured
import io.restassured.RestAssured.given
import io.restassured.http.ContentType
import org.junit.Before
import org.junit.Test

import org.hamcrest.CoreMatchers.*
import org.junit.After
import org.junit.Assert.assertThat
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
        users.add(UserEntity(email = "jack.bauer@test.com",
                password = "password", firstName = "Jack", lastName = "Bauer"))
        users.add(UserEntity(email = "chloe.obrian@test.com",
                password = "hunter2", firstName = "Chloe", lastName = "O'Brian"))
        users.add(UserEntity(email = "kim.bauer@test.com",
                password = "password123", firstName = "Kim", lastName = "Bauer"))
        users.add(UserEntity(email = "david.palmer@test.com",
                password = "123456", firstName = "David", lastName = "Palmer"))
        users.add(UserEntity(email = "michelle.dessler@test.com",
                password = "password", firstName = "Michelle", lastName = "Dessler"))
        userRepository.save(users)
    }

    @After
    fun tearDown() {
        userRepository.deleteAll()
    }

    @Test
    fun getUsers() {
        given().auth().basic("user", "password")
                .`when`().get("/api/user/").then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("size()", `is`(users.size))
    }

    @Test
    fun getUser() {
        val user = users[0]
        given().auth().basic("user", "password")
                .`when`().get("/api/user/${user.id}").then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("firstName", `is`(user.firstName))
                .assertThat().body("lastName", `is`(user.lastName))
    }

    @Test
    fun createUser() {
        val dto = CreateUserDto("pear", "mango", "apple", "banana")
        given().auth().basic("user", "password")
                .contentType(ContentType.JSON).body(dto)
                .`when`().post("/api/user/").then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("firstName", `is`(dto.firstName))
                .assertThat().body("lastName", `is`(dto.lastName))
        assertThat(userRepository.findAll().size, `is`(users.size + 1))
    }

    @Test
    fun updateUser() {
        val user = users[0]
        val dto = UpdateUserDto(null, null, null,"banana")
        given().auth().basic("user", "password")
                .contentType(ContentType.JSON).body(dto)
                .`when`().put("/api/user/${user.id}").then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("firstName", `is`(user.firstName))
                .assertThat().body("lastName", `is`(dto.lastName))
        assertThat(userRepository.findAll().size, `is`(users.size))
    }
}
