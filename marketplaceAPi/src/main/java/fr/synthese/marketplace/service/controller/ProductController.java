package fr.synthese.marketplace.service.controller;

import fr.synthese.marketplace.service.core.entity.product.Product;
import fr.synthese.marketplace.service.core.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService service) {
        this.productService = service;
    }

    @GetMapping
    public List<Product> findAll() {
        return this.productService.findAll();
    }

}
