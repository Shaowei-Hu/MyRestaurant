package com.shaowei.restaurant.service.dto;

import java.math.BigDecimal;

public class OrderDTO {
	
	private String name;
	private BigDecimal price;
	private Long desk;
	
	public OrderDTO() {
		
	}
	
	public OrderDTO(String name, BigDecimal price, Long desk) {
		super();
		this.name = name;
		this.price = price;
		this.desk = desk;
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
	public Long getDesk() {
		return desk;
	}
	public void setDesk(Long desk) {
		this.desk = desk;
	}
	
	

}
