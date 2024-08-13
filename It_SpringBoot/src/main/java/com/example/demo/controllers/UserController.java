package com.example.demo.controllers;

import com.example.demo.Enum.Role;
import com.example.demo.dto.SignUpRequest;
import com.example.demo.models.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;
    @GetMapping("admin/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> user = userService.findAllUsers();
        return ResponseEntity.ok(user);
    }

    @PostMapping("admin/signup/{role}")
    public ResponseEntity<User> signUp(@PathVariable Role role, @RequestBody SignUpRequest signUpRequest) {
        User createdUser = userService.signUp(role, signUpRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("admin/technicians")
    public ResponseEntity<List<User>> getTechnicians() {
        List<User> technicians = userService.getTechnicians();
        return ResponseEntity.ok(technicians);
    }
    @GetMapping("findi")
    public Integer findId(@RequestParam String username){
        return userService.findIdUserByUsername(username);
    }

}
