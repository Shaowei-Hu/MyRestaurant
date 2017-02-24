package com.shaowei.restaurant.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Desk.
 */
@Entity
@Table(name = "desk")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "desk")
public class Desk implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "status")
    private String status;

    @Column(name = "client_number")
    private Integer clientNumber;

    @Column(name = "amount", precision=10, scale=2)
    private BigDecimal amount;

    @ManyToOne
    private Restaurant restaurant;

    @OneToMany(mappedBy = "desk")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ordre> ordres = new HashSet<>();

    @OneToMany(mappedBy = "desk")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Payment> payments = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Desk name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public Desk status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getClientNumber() {
        return clientNumber;
    }

    public Desk clientNumber(Integer clientNumber) {
        this.clientNumber = clientNumber;
        return this;
    }

    public void setClientNumber(Integer clientNumber) {
        this.clientNumber = clientNumber;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Desk amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Desk restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Set<Ordre> getOrdres() {
        return ordres;
    }

    public Desk ordres(Set<Ordre> ordres) {
        this.ordres = ordres;
        return this;
    }

    public Desk addOrdre(Ordre ordre) {
        this.ordres.add(ordre);
        ordre.setDesk(this);
        return this;
    }

    public Desk removeOrdre(Ordre ordre) {
        this.ordres.remove(ordre);
        ordre.setDesk(null);
        return this;
    }

    public void setOrdres(Set<Ordre> ordres) {
        this.ordres = ordres;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public Desk payments(Set<Payment> payments) {
        this.payments = payments;
        return this;
    }

    public Desk addPayment(Payment payment) {
        this.payments.add(payment);
        payment.setDesk(this);
        return this;
    }

    public Desk removePayment(Payment payment) {
        this.payments.remove(payment);
        payment.setDesk(null);
        return this;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Desk desk = (Desk) o;
        if (desk.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, desk.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Desk{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", status='" + status + "'" +
            ", clientNumber='" + clientNumber + "'" +
            ", amount='" + amount + "'" +
            '}';
    }
}
