package fr.synthese.marketplace.service.core.service;

import fr.synthese.marketplace.service.core.entity.lineCart.LineCart;
import fr.synthese.marketplace.service.core.repository.LineCartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LineCartService {

    private final LineCartRepository repository;

    public LineCartService(LineCartRepository lineCartRepository) {
        this.repository = lineCartRepository;
    }

    public List<LineCart> findAll() {
        return this.repository.findAll();
    }

}
