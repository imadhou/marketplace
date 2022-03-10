package fr.synthese.marketplace.service.core.lineCart;

import fr.synthese.marketplace.service.core.cart.Cart;
import fr.synthese.marketplace.service.core.order.Order;
import fr.synthese.marketplace.service.core.product.Product;
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
