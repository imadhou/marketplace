package fr.synthese.marketplace.service.core.repository;

import fr.synthese.marketplace.service.core.entity.lineCart.LineCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LineCartRepository extends JpaRepository<LineCart, Long> {
}
