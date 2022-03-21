package fr.synthese.marketplace.service.core.repository;

import fr.synthese.marketplace.service.core.entity.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
