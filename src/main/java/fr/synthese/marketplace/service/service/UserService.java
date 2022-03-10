package fr.synthese.marketplace.service.service;

import fr.synthese.marketplace.service.core.user.User;
import fr.synthese.marketplace.service.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserRepository repository;

    public UserService(UserRepository userRepository) {
        this.repository = userRepository;
    }

    public List<User> findAll() {
        return this.repository.findAll();
    }

}
