package com.rafal.timetable.dao.data;

import com.rafal.timetable.entity.data.Group;
import com.rafal.timetable.entity.data.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
    List<Teacher> findByIdNotIn(Collection<Integer> ids);
}
