package com.shaowei.restaurant.web.rest.vm;

import java.math.BigDecimal;

public class OrdreVM {
	
	private String name;
	private BigDecimal price;
	private Long stage;
	
	public OrdreVM() {
		
	}
	
	public OrdreVM(String name, BigDecimal price, Long stage) {
		super();
		this.name = name;
		this.price = price;
		this.stage = stage;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public Long getStage() {
		return stage;
	}
	public void setStage(Long stage) {
		this.stage = stage;
	}
}
