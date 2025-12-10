package com.example.ecommerce.service;

import com.example.ecommerce.dto.CreateOrderRequest;
import com.example.ecommerce.entity.Order;
import com.example.ecommerce.entity.OrderItem;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;

    public OrderService(OrderRepository orderRepo, ProductRepository productRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
    }

    @Transactional
    public Order createOrder(CreateOrderRequest req) {

        if (req.getItems() == null || req.getItems().isEmpty()) {
            throw new RuntimeException("Order has no items");
        }

        Order order = new Order();
        order.setCreatedAt(new Date());

        double total = 0;

        System.out.println("===== Processing Order Items =====");

        for (CreateOrderRequest.Item it : req.getItems()) {

            Product p = productRepo.findById(it.getProductId()).orElse(null);

            if (p == null) {
                throw new RuntimeException("Product not found: " + it.getProductId());
            }

            int qty = it.getQuantity();
            if (qty <= 0) {
                throw new RuntimeException("Invalid quantity for " + p.getName());
            }

            if (p.getStock() < qty) {
                throw new RuntimeException("Stock insufficient for " + p.getName() +
                        " (Available: " + p.getStock() + ")");
            }

            // VALID item → create entry
            OrderItem oi = new OrderItem();
            oi.setProductId(p.getId());
            oi.setProductName(p.getName());
            oi.setQuantity(qty);
            oi.setPrice(p.getPrice());
            oi.setOrder(order);

            order.getItems().add(oi);

            total += p.getPrice() * qty;

            p.setStock(p.getStock() - qty);
            productRepo.save(p);
        }

        System.out.println("===== Finished Processing Items =====");

        if (order.getItems().isEmpty()) {
            throw new RuntimeException("No valid items to place order");
        }

        order.setTotal(total);

        return orderRepo.save(order);
    }
}
