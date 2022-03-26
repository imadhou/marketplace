package fr.synthese.marketplace.service.core.service;

import fr.synthese.marketplace.service.core.repository.BlockChainRepository;
import org.springframework.stereotype.Service;



@Service
public class BlockChainService {

    private final BlockChainRepository repository;

    public BlockChainService() {
        this.repository = new BlockChainRepository();
    }

    public String getAllTransactions(String URL){
        return repository.getAllTransactions(URL);
    }
}
