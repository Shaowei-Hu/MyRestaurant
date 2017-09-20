package com.shaowei.restaurant.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.shaowei.restaurant.domain.enumeration.AccountingType;

/**
 * A Accounting.
 */
@Entity
@Table(name = "accounting")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "accounting")
public class Accounting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private AccountingType type;

    @Column(name = "info")
    private String info;

    @Column(name = "start_time")
    private ZonedDateTime startTime;

    @Column(name = "end_time")
    private ZonedDateTime endTime;

    @Column(name = "card", precision=10, scale=2)
    private BigDecimal card;

    @Column(name = "cash", precision=10, scale=2)
    private BigDecimal cash;

    @Column(name = "jhi_check", precision=10, scale=2)
    private BigDecimal check;

    @Column(name = "ticket", precision=10, scale=2)
    private BigDecimal ticket;

    @Column(name = "other", precision=10, scale=2)
    private BigDecimal other;

    @Column(name = "total", precision=10, scale=2)
    private BigDecimal total;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @ManyToOne
    private Restaurant restaurant;

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

    public Accounting name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AccountingType getType() {
        return type;
    }

    public Accounting type(AccountingType type) {
        this.type = type;
        return this;
    }

    public void setType(AccountingType type) {
        this.type = type;
    }

    public String getInfo() {
        return info;
    }

    public Accounting info(String info) {
        this.info = info;
        return this;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public Accounting startTime(ZonedDateTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public Accounting endTime(ZonedDateTime endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public BigDecimal getCard() {
        return card;
    }

    public Accounting card(BigDecimal card) {
        this.card = card;
        return this;
    }

    public void setCard(BigDecimal card) {
        this.card = card;
    }

    public BigDecimal getCash() {
        return cash;
    }

    public Accounting cash(BigDecimal cash) {
        this.cash = cash;
        return this;
    }

    public void setCash(BigDecimal cash) {
        this.cash = cash;
    }

    public BigDecimal getCheck() {
        return check;
    }

    public Accounting check(BigDecimal check) {
        this.check = check;
        return this;
    }

    public void setCheck(BigDecimal check) {
        this.check = check;
    }

    public BigDecimal getTicket() {
        return ticket;
    }

    public Accounting ticket(BigDecimal ticket) {
        this.ticket = ticket;
        return this;
    }

    public void setTicket(BigDecimal ticket) {
        this.ticket = ticket;
    }

    public BigDecimal getOther() {
        return other;
    }

    public Accounting other(BigDecimal other) {
        this.other = other;
        return this;
    }

    public void setOther(BigDecimal other) {
        this.other = other;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public Accounting total(BigDecimal total) {
        this.total = total;
        return this;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public Accounting creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Accounting restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
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
        Accounting accounting = (Accounting) o;
        if (accounting.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accounting.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Accounting{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", info='" + getInfo() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", card='" + getCard() + "'" +
            ", cash='" + getCash() + "'" +
            ", check='" + getCheck() + "'" +
            ", ticket='" + getTicket() + "'" +
            ", other='" + getOther() + "'" +
            ", total='" + getTotal() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
