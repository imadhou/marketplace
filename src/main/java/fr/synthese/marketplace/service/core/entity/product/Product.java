package fr.synthese.marketplace.service.core.entity.product;

import fr.synthese.marketplace.service.core.entity.lineCart.LineCart;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue
    private long idProduct;

    private String imageUrl;
    private double price;
    private ReductionStrategy reductionStrategy;
    private double reductionValue;
    private String name;
    private String description;
    private String brand;
    private Condition productCondition;

    @ManyToOne
    private LineCart lineCart;

}
