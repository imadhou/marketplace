package fr.synthese.marketplace.service.core.entity.order;

import fr.synthese.marketplace.service.core.entity.user.User;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "client_order")
public class Order {

    @Id
    @GeneratedValue
    private long idOrder;

    private OrderStatus status;
    private int itemCount;
    private double total;

    @ManyToOne
    private User user;

}
