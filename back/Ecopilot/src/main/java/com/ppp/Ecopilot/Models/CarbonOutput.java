package com.ppp.Ecopilot.Models;

public class CarbonOutput {
    public String parameter;
    public String objective;
    public String advice;

    public CarbonOutput(String parameter, String objective, String interpretation) {
        this.parameter = parameter;
        this.objective = interpretation;
        this.advice = objective;
    }
}

