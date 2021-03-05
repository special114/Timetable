package com.rafal.timetable.dao.data;

import com.rafal.timetable.entity.data.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
}
