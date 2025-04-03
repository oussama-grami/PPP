package org.dhouibi.mohamedaziz.testchatmodel.Models;

public class CarbonResponse {
    public String status;
    public CarbonOutput[] recommendations;

    public CarbonResponse(String status, CarbonOutput[] carbonOutputs) {
        this.status = status;
        this.recommendations = carbonOutputs;
    }
}
