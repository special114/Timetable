package com.rafal.timetable.dao.data;

import com.rafal.timetable.entity.data.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    List<Group> findByIdNotIn(Collection<Integer> ids);
}
