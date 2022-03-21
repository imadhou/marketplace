package fr.synthese.marketplace.service.core.service;

import fr.synthese.marketplace.service.core.entity.product.Product;
import fr.synthese.marketplace.service.core.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository userRepository) {
        this.repository = userRepository;
    }

    public List<Product> findAll() {
        return this.repository.findAll();
    }

}
