package fr.synthese.marketplace.service.controller;

import fr.synthese.marketplace.service.core.entity.lineCart.LineCart;
import fr.synthese.marketplace.service.core.service.LineCartService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/line-carts")
public class LineCartController {

    private final LineCartService lineCartService;

    public LineCartController(LineCartService service) {
        this.lineCartService = service;
    }

    @GetMapping
    public List<LineCart> findAll() {
        return this.lineCartService.findAll();
    }

}
