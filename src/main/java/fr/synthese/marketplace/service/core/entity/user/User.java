package fr.synthese.marketplace.service.core.entity.user;

import fr.synthese.marketplace.service.core.entity.cart.Cart;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue
    private long idUser;

    private String email;
    // TODO Delete the `password` field and use SpringSecurity instead
    private String password;
    private String firstName;
    private String normedFirstName;
    private String lastName;
    private String normedLastName;
    private LocalDate birthDate;
    private String status;

    @OneToOne
    private Cart cart;

}
