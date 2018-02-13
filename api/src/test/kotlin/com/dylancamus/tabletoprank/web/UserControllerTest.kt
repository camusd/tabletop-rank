package com.dylancamus.tabletoprank.web

import com.dylancamus.tabletoprank.domain.user.UserDto
import com.dylancamus.tabletoprank.service.user.UserService
import com.jayway.restassured.module.mockmvc.RestAssuredMockMvc
import org.junit.Test

import org.hamcrest.CoreMatchers.*
import org.junit.Before
import org.junit.runner.RunWith
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.HttpStatus
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import java.util.Arrays.asList

@RunWith(SpringRunner::class)
@WebMvcTest(UserController::class)
internal class UserControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var userService: UserService

    @Before
    fun setUp() {
        RestAssuredMockMvc.mockMvc(mockMvc)
    }

    @Test
    fun `'getUsers' returns json array of expected size`() {
        given(userService.getUsers()).willReturn(asList(
                UserDto(1L, "apple", "banana"),
                UserDto(2L, "pear", "mango")))
        RestAssuredMockMvc
                .given().auth().with(user("user").password("password"))
                .`when`().get("/api/user").then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("size()", `is`(2))
    }

    @Test
    fun `'getUsers' returns empty json array`() {
        given(userService.getUsers()).willReturn(emptyList())
        RestAssuredMockMvc
                .given().auth().with(user("user").password("password"))
                .`when`().get("/api/user").then()
                .statusCode(HttpStatus.OK.value())
                .assertThat().body("size()", `is`(0))
    }
}