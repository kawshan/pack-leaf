package com.packleaf.packleaf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PackleafApplication {

	public static void main(String[] args) {
		SpringApplication.run(PackleafApplication.class, args);
		System.out.println("application started ✔");
	}

}
