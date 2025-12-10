package com.example.ecommerce.service;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepo;

    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    public List<Product> listAll() {
        return productRepo.findAll();
    }

    public Product getById(Long id) {
        return productRepo.findById(id).orElse(null);
    }

    public Product save(Product p) {
        return productRepo.save(p);
    }

    public List<Product> byCategory(String category) {
        return productRepo.findByCategoryIgnoreCase(category);
    }

    public void delete(Long id) {
        productRepo.deleteById(id);
    }
}
