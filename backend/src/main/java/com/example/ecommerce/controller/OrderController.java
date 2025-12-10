package com.example.ecommerce.controller;

import com.example.ecommerce.dto.CreateOrderRequest;
import com.example.ecommerce.entity.Order;
import com.example.ecommerce.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateOrderRequest req) {
        try {

            if (req.getItems() == null || req.getItems().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("Order failed: No items provided"));
            }

            Order saved = orderService.createOrder(req);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();  // <-- IMPORTANT: show full error in console
            return ResponseEntity.internalServerError()
                    .body(new MessageResponse("Order failed: " + e.toString()));
        }
    }


    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(new MessageResponse("API working"));
    }


    // small POJO for clean JSON responses
    static class MessageResponse {
        public String message;

        public MessageResponse(String message) {
            this.message = message;
        }
    }
}
