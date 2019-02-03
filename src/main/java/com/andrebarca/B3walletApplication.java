package com.andrebarca;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class B3walletApplication {

  @PostConstruct
  void started() {
    TimeZone.setDefault(TimeZone.getTimeZone("TimeZone"));
  }

	public static void main(String[] args) {
		SpringApplication.run(B3walletApplication.class, args);
	}
}
