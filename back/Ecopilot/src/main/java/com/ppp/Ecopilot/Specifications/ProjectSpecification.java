package com.ppp.Ecopilot.Specifications;

import com.ppp.Ecopilot.Entities.Project;
import org.springframework.data.jpa.domain.Specification;

public class ProjectSpecification {

    public static Specification<Project> hasName(String name) {
        return (root, query, builder) -> name == null ? null : builder.equal(root.get("name"), name);
    }

    public static Specification<Project> hasCertified(Boolean certified) {
        return (root, query, builder) -> certified == null ? null : builder.equal(root.get("certified"), certified);
    }

    public static Specification<Project> hasCategory(String category) {
        return (root, query, builder) -> category == null ? null : builder.equal(root.get("category"), category);
    }

    public static Specification<Project> hasMechanism(String mechanism) {
        return (root, query, builder) -> mechanism == null ? null : builder.equal(root.get("mechanism"), mechanism);
    }

    public static Specification<Project> hasCost(Integer cost) {
        return (root, query, cb) -> {
            if (cost == null) {
                return cb.conjunction(); // No filtering on cost
            }
            return cb.lessThanOrEqualTo(root.get("cost"), cost);
        };
    }

    public static Specification<Project> hasCountry(String country) {
        return (root, query, builder) -> country == null ? null : builder.equal(root.get("country"), country);
    }
}

