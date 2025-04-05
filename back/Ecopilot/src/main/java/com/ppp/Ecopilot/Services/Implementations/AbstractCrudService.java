package com.ppp.Ecopilot.Services.Implementations;

import com.ppp.Ecopilot.Services.CRUDService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public abstract class AbstractCrudService<T, ID> implements CRUDService<T, ID> {

    protected abstract JpaRepository<T, ID> getRepository();

    protected abstract Class<T> getEntityClass();

    @Override
    public T save(T entity) {
        return getRepository().save(entity);
    }

    @Override
    public List<T> findAll() {
        return getRepository().findAll();
    }

    @Override
    public T findById(ID id) {
        return getRepository().findById(id).orElseThrow(() -> new EntityNotFoundException(getEntityClass().getSimpleName() + " with id " + id.toString() + " not found"));
    }

    @Override
    public void deleteById(ID id) {
        getRepository().deleteById(id);
    }

}