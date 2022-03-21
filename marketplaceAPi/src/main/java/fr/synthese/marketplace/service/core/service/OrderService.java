package fr.synthese.marketplace.service.core.service;

import fr.synthese.marketplace.service.core.entity.order.Order;
import fr.synthese.marketplace.service.core.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository repository;

    public OrderService(OrderRepository orderRepository) {
        this.repository = orderRepository;
    }

    public List<Order> findAll() {
        return this.repository.findAll();
    }

}
