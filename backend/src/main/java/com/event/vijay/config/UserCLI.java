package com.event.vijay.config;

import static com.event.vijay.enumerated.Role.ADMIN;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.event.vijay.model.User;
import com.event.vijay.repository.UserRepository;

@Component 
@SuppressWarnings("null")
public class UserCLI implements CommandLineRunner{

  @Autowired
  private UserRepository userRepository;
  
  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    if(userRepository.count() > 0){
      return;
    }
    
    User user = new User();
    user.setName("Admin");
    user.setEmail("admin123@gmail.com");
    user.setPassword(passwordEncoder.encode("admin@123"));
    user.setRole(ADMIN);

    userRepository.save(user);
  }
}
