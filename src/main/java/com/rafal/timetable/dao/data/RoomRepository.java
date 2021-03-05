package com.rafal.timetable.dao.data;

import com.rafal.timetable.entity.data.Group;
import com.rafal.timetable.entity.data.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    List<Room> findByIdNotIn(Collection<Integer> ids);
}
