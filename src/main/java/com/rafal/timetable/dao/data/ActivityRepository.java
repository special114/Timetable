package com.rafal.timetable.dao.data;

import com.rafal.timetable.entity.data.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(path = "activities")
public interface ActivityRepository extends JpaRepository<Activity, Integer> {
    Optional<Activity> findByGroup_IdAndSlotId(int groupId, int slot);

    Optional<Activity> findByTeacher_IdAndSlotId(int teacherId, int slot);

    Optional<Activity> findByRoom_IdAndSlotId(int roomId, int slot);

    List<Activity> findBySlotIdAndGroup_IdNot(int slot, int id);

    List<Activity> findBySlotIdAndTeacher_IdNot(int slot, int id);

    List<Activity> findBySlotIdAndRoom_IdNot(int slot, int id);
}
