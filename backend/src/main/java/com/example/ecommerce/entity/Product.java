package com.example.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product")
@Data    // <-- THIS IS THE FIX
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private int stock;
    private String category;
    private String imageUrl;

}
