package com.ppp.Ecopilot.Entities;

import java.io.Serializable;
import java.util.Objects;

// This is the composite key class
public class EsgResponseId implements Serializable {

    private Long companyOwner;
    private Long esgQuestion;

    // Default constructor
    public EsgResponseId() {}

    public EsgResponseId(Long companyOwner, Long esgQuestion) {
        this.companyOwner = companyOwner;
        this.esgQuestion = esgQuestion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EsgResponseId that = (EsgResponseId) o;
        return Objects.equals(companyOwner, that.companyOwner) &&
                Objects.equals(esgQuestion, that.esgQuestion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(companyOwner, esgQuestion);
    }
}
