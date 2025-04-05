package com.ppp.Ecopilot.Services;


import java.util.List;

public interface CRUDService<T, ID> {
    T save(T entity);

    List<T> findAll();

    T findById(ID id);

    void deleteById(ID id);
}