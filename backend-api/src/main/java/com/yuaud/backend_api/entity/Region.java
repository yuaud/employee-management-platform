package com.yuaud.backend_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "regions")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Region {

    @Id
    @Column(name = "region_id", nullable = false)
    private Long regionId;

    @Column(name = "region_name", length = 100)
    private String regionName;

    @OneToMany(mappedBy = "region")
    private List<Country> countries;

}
