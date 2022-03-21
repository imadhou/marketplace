package fr.synthese.marketplace.service.core.entity.lineCart;

import fr.synthese.marketplace.service.core.entity.cart.Cart;
import fr.synthese.marketplace.service.core.entity.order.Order;
import fr.synthese.marketplace.service.core.entity.product.Product;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "line_cart")
public class LineCart {

    @Id
    @GeneratedValue
    private long idLineCart;

    private int quantity;
    private double total;

    @ManyToOne
    private Cart cart;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Order order;

}
