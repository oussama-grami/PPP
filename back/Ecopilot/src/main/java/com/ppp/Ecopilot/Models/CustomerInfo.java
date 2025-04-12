package com.ppp.Ecopilot.Models;

import lombok.Data;

@Data
public class CustomerInfo {
    private String email;
    private String phone;
    private String address;
    private String postalCode;
    private String city;
    private String province;
    private String country;
}
