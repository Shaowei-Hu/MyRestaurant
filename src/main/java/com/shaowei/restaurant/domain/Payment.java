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
 * A Payment.
 */
@Entity
@Table(name = "payment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "payment")
public class Payment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "amount", precision=10, scale=2)
    private BigDecimal amount;

    @OneToMany(mappedBy = "payment")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ordre> ordres = new HashSet<>();

    @ManyToOne
    private Desk desk;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Payment type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Payment amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Set<Ordre> getOrdres() {
        return ordres;
    }

    public Payment ordres(Set<Ordre> ordres) {
        this.ordres = ordres;
        return this;
    }

    public Payment addOrdre(Ordre ordre) {
        this.ordres.add(ordre);
        ordre.setPayment(this);
        return this;
    }

    public Payment removeOrdre(Ordre ordre) {
        this.ordres.remove(ordre);
        ordre.setPayment(null);
        return this;
    }

    public void setOrdres(Set<Ordre> ordres) {
        this.ordres = ordres;
    }

    public Desk getDesk() {
        return desk;
    }

    public Payment desk(Desk desk) {
        this.desk = desk;
        return this;
    }

    public void setDesk(Desk desk) {
        this.desk = desk;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Payment payment = (Payment) o;
        if (payment.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, payment.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Payment{" +
            "id=" + id +
            ", type='" + type + "'" +
            ", amount='" + amount + "'" +
            '}';
    }
}
