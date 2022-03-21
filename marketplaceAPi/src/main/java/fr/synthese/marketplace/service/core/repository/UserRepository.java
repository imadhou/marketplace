package fr.synthese.marketplace.service.core.repository;

import fr.synthese.marketplace.service.core.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
