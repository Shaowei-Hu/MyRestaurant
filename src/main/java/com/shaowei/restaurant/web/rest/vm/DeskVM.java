package com.shaowei.restaurant.web.rest.vm;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.shaowei.restaurant.domain.Desk;
import com.shaowei.restaurant.domain.Restaurant;
import com.shaowei.restaurant.domain.Stage;

/**
 * A Desk.
 */

public class DeskVM implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String name;

    private String status;

    private Integer clientNumber;

    private Integer ranking;
    
    private Stage currentStage;

    private Restaurant restaurant;

    private Set<Stage> stages = new HashSet<>();
    
    DeskVM() {}
    
    public DeskVM(Desk desk) {
    	this.id = desk.getId();
    	this.name = desk.getName();
    	this.status = desk.getStatus();
    	this.clientNumber = desk.getClientNumber();
    	this.ranking = desk.getRanking();
    	if(desk.getCurrentStage() != null){
        	Stage stage = new Stage();
        	stage.setId(desk.getCurrentStage().getId());
        	this.currentStage = stage;
    	}
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getClientNumber() {
		return clientNumber;
	}

	public void setClientNumber(Integer clientNumber) {
		this.clientNumber = clientNumber;
	}

	public Integer getRanking() {
		return ranking;
	}

	public void setRanking(Integer ranking) {
		this.ranking = ranking;
	}

	public Stage getCurrentStage() {
		return currentStage;
	}

	public void setCurrentStage(Stage currentStage) {
		this.currentStage = currentStage;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public Set<Stage> getStages() {
		return stages;
	}

	public void setStages(Set<Stage> stages) {
		this.stages = stages;
	}




}
