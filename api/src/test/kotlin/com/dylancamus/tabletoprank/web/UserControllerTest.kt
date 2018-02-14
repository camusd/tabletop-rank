package com.dylancamus.tabletoprank.web

import com.dylancamus.tabletoprank.domain.user.CreateUserDto
import com.dylancamus.tabletoprank.domain.user.UpdateUserDto
import com.dylancamus.tabletoprank.domain.user.UserDto
import com.dylancamus.tabletoprank.service.user.UserService
import com.jayway.restassured.http.ContentType
import com.jayway.restassured.module.mockmvc.RestAssuredMockMvc
import io.restassured.RestAssured
import org.junit.Test

import org.hamcrest.CoreMatchers.*
import org.junit.Before
import org.junit.runner.RunWith
import org.mockito.BDDMockito.given
import org.mockito.Matchers.anyLong
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.HttpStatus
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import java.util.Arrays.asList
import javax.persistence.EntityNotFoundException

@RunWith(SpringRunner::class)
@WebMvcTest(UserController::class)
internal class UserControllerTest {

    private val credentials = user("user").password("password")

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var userService: UserService

    @Before
    fun setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc)
    }

    @Test
    fun `'getUsers' should return json array of expected size`() {
        given(userService.getUsers()).willReturn(asList(
                UserDto(1L, "apple", "banana", "pineapple"),
                UserDto(2L, "pear", "mango", "watermelon")))
        RestAssuredMockMvc
                .given()
                .auth().with(credentials)
                .`when`()
                .get("/api/user")
                .then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("size()", `is`(2))
    }

    @Test
    fun `'getUsers' should return empty json array`() {
        given(userService.getUsers()).willReturn(emptyList())
        RestAssuredMockMvc
                .given()
                .auth().with(credentials)
                .`when`()
                .get("/api/user")
                .then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("size()", `is`(0))
    }

    @Test
    fun `'getUser' should return expected user`() {
        val expectedId = 1L
        val expectedEmail = "pear"
        val expectedFirstName = "apple"
        val expectedLastName = "banana"
        val dto = UserDto(expectedId, expectedEmail, expectedFirstName, expectedLastName)
        given(userService.getUser(anyLong())).willReturn(dto)
        RestAssuredMockMvc
                .given()
                .auth().with(credentials)
                .`when`()
                .get("/api/user/$expectedId")
                .then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("id", `is`(expectedId.toInt()))
                .assertThat().body("email", `is`(expectedEmail))
                .assertThat().body("firstName", `is`(expectedFirstName))
                .assertThat().body("lastName", `is`(expectedLastName))
    }

    @Test
    fun `'getUser' should format error if user doesn't exist`() {
        val expectedId = 1L
        given(userService.getUser(expectedId))
                .willThrow(EntityNotFoundException("User with id: $expectedId not found"))
        RestAssured
                .given()
                .auth().basic("user", "password")
                .`when`()
                .get("/api/user/$expectedId")
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value())
                .assertThat().body("status", `is`(HttpStatus.NOT_FOUND.name))
                .assertThat().body("message", `is`(notNullValue()))
                .assertThat().body("timestamp", `is`(notNullValue()))
    }

    @Test
    fun `'createUser' should return new user`() {
        val expectedId = 1L
        val expectedEmail = "pear"
        val expectedFirstName = "apple"
        val expectedLastName = "banana"
        val dto = CreateUserDto(expectedEmail,
                "mango", expectedFirstName, expectedLastName)
        given(userService.createUser(dto))
                .willReturn(UserDto(expectedId, expectedEmail,
                        expectedFirstName, expectedLastName))
        RestAssuredMockMvc
                .given()
                .auth().with(credentials)
                .contentType(ContentType.JSON).body(dto)
                .`when`()
                .post("/api/user/")
                .then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("id", `is`(expectedId.toInt()))
                .assertThat().body("email", `is`(expectedEmail))
                .assertThat().body("firstName", `is`(expectedFirstName))
                .assertThat().body("lastName", `is`(expectedLastName))
    }

    @Test
    fun `'createUser' should should format error if body is missing`() {
        RestAssuredMockMvc
                .given()
                .auth().with(credentials)
                .contentType(ContentType.JSON)
                .`when`()
                .post("/api/user/")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .assertThat().body("status", `is`(HttpStatus.BAD_REQUEST.name))
                .assertThat().body("message", `is`(notNullValue()))
                .assertThat().body("timestamp", `is`(notNullValue()))
    }

    @Test
    fun `'createUser' should should format error if body is malformed`() {
        RestAssuredMockMvc
                .given()
                .auth().with(credentials)
                .contentType(ContentType.JSON).body("aaa")
                .`when`()
                .post("/api/user/")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .assertThat().body("status", `is`(HttpStatus.BAD_REQUEST.name))
                .assertThat().body("message", `is`(notNullValue()))
                .assertThat().body("timestamp", `is`(notNullValue()))
    }

    @Test
    fun `'updateUser' should return updated user`() {
        val expectedId = 1L
        val expectedEmail = "pear"
        val expectedFirstName = "apple"
        val expectedLastName = "banana"
        val dto = UpdateUserDto(null, expectedLastName, null, null)
        given(userService.updateUser(expectedId, dto))
                .willReturn(UserDto(expectedId, expectedEmail, expectedFirstName, expectedLastName))
        RestAssuredMockMvc
                .given()
                .auth().with(credentials)
                .contentType(ContentType.JSON).body(dto)
                .`when`()
                .put("/api/user/$expectedId")
                .then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("id", `is`(expectedId.toInt()))
                .assertThat().body("email", `is`(expectedEmail))
                .assertThat().body("firstName", `is`(expectedFirstName))
                .assertThat().body("lastName", `is`(expectedLastName))
    }

    @Test
    fun `'updateUser' should format error if user doesn't exist`() {
        val expectedId = 1L
        val dto = UpdateUserDto("apple", null, null, null)
        given(userService.updateUser(expectedId, dto))
                .willThrow(EntityNotFoundException("User with id: $expectedId not found"))
        RestAssuredMockMvc
                .given()
                .auth().with(credentials)
                .contentType(ContentType.JSON).body(dto)
                .`when`()
                .put("/api/user/$expectedId")
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value())
                .assertThat().body("status", `is`(HttpStatus.NOT_FOUND.name))
                .assertThat().body("message", `is`(notNullValue()))
                .assertThat().body("timestamp", `is`(notNullValue()))
    }

    @Test
    fun `'updateUser' should should format error if body is missing`() {
        RestAssuredMockMvc
                .given()
                .auth().with(credentials)
                .contentType(ContentType.JSON)
                .`when`()
                .put("/api/user/1")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .assertThat().body("status", `is`(HttpStatus.BAD_REQUEST.name))
                .assertThat().body("message", `is`(notNullValue()))
                .assertThat().body("timestamp", `is`(notNullValue()))
    }

    @Test
    fun `'updateUser' should should format error if body is malformed`() {
        RestAssuredMockMvc
                .given()
                .auth().with(credentials)
                .contentType(ContentType.JSON).body("aaa")
                .`when`()
                .put("/api/user/1")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .assertThat().body("status", `is`(HttpStatus.BAD_REQUEST.name))
                .assertThat().body("message", `is`(notNullValue()))
                .assertThat().body("timestamp", `is`(notNullValue()))
    }
}
