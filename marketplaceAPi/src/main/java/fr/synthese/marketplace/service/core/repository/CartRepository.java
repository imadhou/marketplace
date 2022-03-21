package fr.synthese.marketplace.service.core.repository;

import fr.synthese.marketplace.service.core.entity.cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
}
