package com.shaowei.restaurant.domain;

import java.io.Serializable;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @Column(name = "ranking")
    private Integer ranking;
    
    @OneToOne
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Stage currentStage;

    @ManyToOne
    private Restaurant restaurant;

    @OneToMany(mappedBy = "desk")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Stage> stages = new HashSet<>();

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

    public Integer getRanking() {
        return ranking;
    }

    public Desk ranking(Integer ranking) {
        this.ranking = ranking;
        return this;
    }

    public void setRanking(Integer ranking) {
        this.ranking = ranking;
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

    public Set<Stage> getStages() {
        return stages;
    }

    public Desk stages(Set<Stage> stages) {
        this.stages = stages;
        return this;
    }

    public Desk addStage(Stage stage) {
        this.stages.add(stage);
        stage.setDesk(this);
        return this;
    }

    public Desk removeStage(Stage stage) {
        this.stages.remove(stage);
        stage.setDesk(null);
        return this;
    }

    public void setStages(Set<Stage> stages) {
        this.stages = stages;
    }
    
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    public Stage getCurrentStage() {
		return currentStage;
	}

	public void setCurrentStage(Stage currentStage) {
		this.currentStage = currentStage;
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
        if (desk.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), desk.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Desk{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", status='" + getStatus() + "'" +
            ", clientNumber='" + getClientNumber() + "'" +
            ", ranking='" + getRanking() + "'" +
            "}";
    }
}
