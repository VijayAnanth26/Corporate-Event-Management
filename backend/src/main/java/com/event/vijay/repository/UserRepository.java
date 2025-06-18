package com.event.vijay.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.event.vijay.model.User;


public interface UserRepository extends JpaRepository<User,String>{
    Optional<User> findByEmail(String email);
}
