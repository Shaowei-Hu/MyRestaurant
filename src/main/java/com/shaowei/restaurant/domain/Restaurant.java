package com.shaowei.restaurant.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Restaurant.
 */
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "restaurant")
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "content")
    private String content;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @OneToMany(mappedBy = "restaurant")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Desk> desks = new HashSet<>();

    @OneToMany(mappedBy = "restaurant")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "restaurant")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Accounting> accountings = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Restaurant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public Restaurant content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public Restaurant creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Set<Desk> getDesks() {
        return desks;
    }

    public Restaurant desks(Set<Desk> desks) {
        this.desks = desks;
        return this;
    }

    public Restaurant addDesk(Desk desk) {
        this.desks.add(desk);
        desk.setRestaurant(this);
        return this;
    }

    public Restaurant removeDesk(Desk desk) {
        this.desks.remove(desk);
        desk.setRestaurant(null);
        return this;
    }

    public void setDesks(Set<Desk> desks) {
        this.desks = desks;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Restaurant categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Restaurant addCategory(Category category) {
        this.categories.add(category);
        return this;
    }

    public Restaurant removeCategory(Category category) {
        this.categories.remove(category);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<Accounting> getAccountings() {
        return accountings;
    }

    public Restaurant accountings(Set<Accounting> accountings) {
        this.accountings = accountings;
        return this;
    }

    public Restaurant addAccounting(Accounting accounting) {
        this.accountings.add(accounting);
        accounting.setRestaurant(this);
        return this;
    }

    public Restaurant removeAccounting(Accounting accounting) {
        this.accountings.remove(accounting);
        accounting.setRestaurant(null);
        return this;
    }

    public void setAccountings(Set<Accounting> accountings) {
        this.accountings = accountings;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Restaurant restaurant = (Restaurant) o;
        if (restaurant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restaurant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", content='" + getContent() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
