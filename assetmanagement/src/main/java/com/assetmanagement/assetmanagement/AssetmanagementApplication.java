package com.assetmanagement.assetmanagement;

import com.assetmanagement.assetmanagement.entity.UserAccount;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AssetmanagementApplication {

	public static void main(String[] args) {

		SpringApplication.run(AssetmanagementApplication.class, args);
//		UserAccount test= new UserAccount();
//		test.setStatus("lock");
	}

}