package fr.synthese.marketplace.service.core.service;

import fr.synthese.marketplace.service.core.entity.cart.Cart;
import fr.synthese.marketplace.service.core.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository repository;

    public CartService(CartRepository cartRepository) {
        this.repository = cartRepository;
    }

    public List<Cart> findAll() {
        return this.repository.findAll();
    }


}
