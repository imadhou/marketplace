package fr.synthese.marketplace.service.core.repository;

import fr.synthese.marketplace.service.core.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
