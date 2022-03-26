package fr.synthese.marketplace.service.controller;

import fr.synthese.marketplace.service.core.service.BlockChainService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/blockchain")
public class BlockChainController {

    private final BlockChainService service;

    public BlockChainController(BlockChainService service){
        this.service = service;

    }

    @GetMapping
    public String getAllTransactions(){
        return service.getAllTransactions("http://localhost:3000/api/transactions");
    }



}
