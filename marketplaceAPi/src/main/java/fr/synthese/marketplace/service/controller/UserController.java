package fr.synthese.marketplace.service.controller;

import fr.synthese.marketplace.service.core.entity.user.User;
import fr.synthese.marketplace.service.core.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService service) {
        this.userService = service;
    }

    @GetMapping
    public List<User> findAll() {
        return this.userService.findAll();
}

}
