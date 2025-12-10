package com.example.ecommerce.controller;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // =========================
    // GET ALL PRODUCTS
    // =========================
    @GetMapping
    public List<Product> list() {
        return productService.listAll();
    }

    // GET ONE PRODUCT BY ID
    @GetMapping("/{id}")
    public Product get(@PathVariable Long id) {
        return productService.getById(id);
    }

    // =========================
    // FILTER BY CATEGORY
    // =========================
    @GetMapping("/category/{category}")
    public List<Product> byCategory(@PathVariable String category) {
        return productService.byCategory(category);
    }

    // =========================
    // FILTER + SORT
    // =========================
    @GetMapping("/filter")
    public List<Product> filter(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sort
    ) {
        List<Product> list;

        if (category != null && !category.isBlank()) {
            list = productService.byCategory(category);
        } else {
            list = productService.listAll();
        }

        // Sorting
        if ("low-high".equalsIgnoreCase(sort)) {
            list = list.stream()
                    .sorted(Comparator.comparingDouble(Product::getPrice))
                    .collect(Collectors.toList());
        } else if ("high-low".equalsIgnoreCase(sort)) {
            list = list.stream()
                    .sorted(Comparator.comparingDouble(Product::getPrice).reversed())
                    .collect(Collectors.toList());
        }

        return list;
    }

    // =========================
    // CREATE PRODUCT
    // =========================
    @PostMapping
    public Product create(@RequestBody Product p) {
        return productService.save(p);
    }

    // =========================
    // UPDATE PRODUCT
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Product updated) {

        Product existing = productService.getById(id);
        if (existing == null) {
            return ResponseEntity.badRequest().body("Product not found");
        }

        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPrice(updated.getPrice());
        existing.setStock(updated.getStock());
        existing.setCategory(updated.getCategory());
        existing.setImageUrl(updated.getImageUrl());

        productService.save(existing);

        return ResponseEntity.ok(existing);
    }

    // =========================
    // DELETE PRODUCT
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.ok("Deleted");
    }
}
