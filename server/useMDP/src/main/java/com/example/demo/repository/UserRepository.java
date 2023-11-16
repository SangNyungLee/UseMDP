package com.example.demo.repository;

import com.example.demo.model.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String Username);

    User findByUsernameAndPassword(String Username, String Password);
}
