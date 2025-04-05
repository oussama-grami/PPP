package com.ppp.Ecopilot.Mappers;

public interface EntityMapper<E, D> {

    E toEntity(D dto);

    D toDto(E entity);

}
