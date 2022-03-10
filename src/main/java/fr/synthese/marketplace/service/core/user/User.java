package fr.synthese.marketplace.service.core.user;

import fr.synthese.marketplace.service.core.cart.Cart;
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
