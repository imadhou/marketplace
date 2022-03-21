package fr.synthese.marketplace.service.core.entity.cart;

import fr.synthese.marketplace.service.core.entity.user.User;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue
    private long idCart;

    private String status;
    private int itemCount;
    private double total;

    @OneToOne
    private User user;

}
