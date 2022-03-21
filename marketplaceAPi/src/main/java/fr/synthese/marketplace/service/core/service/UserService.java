package fr.synthese.marketplace.service.core.service;

import fr.synthese.marketplace.service.core.entity.user.User;
import fr.synthese.marketplace.service.core.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository userRepository) {
        this.repository = userRepository;
    }

    public List<User> findAll() {
        return this.repository.findAll();
    }

}
