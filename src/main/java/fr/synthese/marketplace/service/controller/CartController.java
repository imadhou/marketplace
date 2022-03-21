package fr.synthese.marketplace.service.controller;

import fr.synthese.marketplace.service.core.entity.cart.Cart;
import fr.synthese.marketplace.service.core.service.CartService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService service) {
        this.cartService = service;
    }

    @GetMapping
    public List<Cart> findAll() {
        return this.cartService.findAll();
    }
}
