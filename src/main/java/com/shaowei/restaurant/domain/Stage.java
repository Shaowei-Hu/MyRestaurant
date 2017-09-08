package com.shaowei.restaurant.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * A Stage.
 */
@Entity
@Table(name = "stage")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "stage")
public class Stage implements Serializable {

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

    @Column(name = "amount_paid", precision=10, scale=2)
    private BigDecimal amountPaid;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @OneToMany(mappedBy = "stage")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ordre> ordres = new HashSet<>();

    @OneToMany(mappedBy = "stage")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Payment> payments = new HashSet<>();

    @ManyToOne
    private Desk desk;

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

    public Stage name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public Stage status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getClientNumber() {
        return clientNumber;
    }

    public Stage clientNumber(Integer clientNumber) {
        this.clientNumber = clientNumber;
        return this;
    }

    public void setClientNumber(Integer clientNumber) {
        this.clientNumber = clientNumber;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Stage amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getAmountPaid() {
        return amountPaid;
    }

    public Stage amountPaid(BigDecimal amountPaid) {
        this.amountPaid = amountPaid;
        return this;
    }

    public void setAmountPaid(BigDecimal amountPaid) {
        this.amountPaid = amountPaid;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public Stage creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Set<Ordre> getOrdres() {
        return ordres;
    }

    public Stage ordres(Set<Ordre> ordres) {
        this.ordres = ordres;
        return this;
    }

    public Stage addOrdre(Ordre ordre) {
        this.ordres.add(ordre);
        ordre.setStage(this);
        return this;
    }

    public Stage removeOrdre(Ordre ordre) {
        this.ordres.remove(ordre);
        ordre.setStage(null);
        return this;
    }

    public void setOrdres(Set<Ordre> ordres) {
        this.ordres = ordres;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public Stage payments(Set<Payment> payments) {
        this.payments = payments;
        return this;
    }

    public Stage addPayment(Payment payment) {
        this.payments.add(payment);
        payment.setStage(this);
        return this;
    }

    public Stage removePayment(Payment payment) {
        this.payments.remove(payment);
        payment.setStage(null);
        return this;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public Desk getDesk() {
        return desk;
    }

    public Stage desk(Desk desk) {
        this.desk = desk;
        return this;
    }

    public void setDesk(Desk desk) {
        this.desk = desk;
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
        Stage stage = (Stage) o;
        if (stage.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stage.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stage{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", clientNumber='" + getClientNumber() + "'" +
            ", amount='" + getAmount() + "'" +
            ", amountPaid='" + getAmountPaid() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
