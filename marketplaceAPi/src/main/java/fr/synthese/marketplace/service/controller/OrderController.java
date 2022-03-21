package fr.synthese.marketplace.service.controller;

import fr.synthese.marketplace.service.core.entity.order.Order;
import fr.synthese.marketplace.service.core.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService service) {
        this.orderService = service;
    }

    @GetMapping
    public List<Order> findAll() {
        return this.orderService.findAll();
    }

}
