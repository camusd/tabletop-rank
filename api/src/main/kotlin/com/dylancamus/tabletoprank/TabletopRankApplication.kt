package com.dylancamus.tabletoprank

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@SpringBootApplication
internal class TabletopRankApplication {

    @Bean
    fun bCryptPasswordEncoder(): BCryptPasswordEncoder = BCryptPasswordEncoder()
}

fun main(args: Array<String>) {
    SpringApplication.run(TabletopRankApplication::class.java, *args)
}
