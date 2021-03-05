package com.rafal.timetable.service;

import com.rafal.timetable.dao.data.*;
import com.rafal.timetable.entity.data.Activity;
import com.rafal.timetable.entity.data.ActivityContainer;
import com.rafal.timetable.entity.data.Group;
import com.rafal.timetable.exception.RequestParameterException;
import com.rafal.timetable.models.QueryResultSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final GroupRepository groupRepository;
    private final TeacherRepository teacherRepository;
    private final RoomRepository roomRepository;
    private final SubjectRepository subjectRepository;


    @Autowired
    public ActivityService(ActivityRepository activityRepository, GroupRepository groupRepository,
                           RoomRepository roomRepository, TeacherRepository teacherRepository,
                           SubjectRepository subjectRepository) {
        this.activityRepository = activityRepository;
        this.groupRepository = groupRepository;
        this.teacherRepository = teacherRepository;
        this.roomRepository = roomRepository;
        this.subjectRepository = subjectRepository;
    }

    public List<Activity> getActivities(int ver, int id) {
        JpaRepository currentRepository = null;
        switch (ver) {
            case 1:
                currentRepository = groupRepository;
                break;
            case 2:
                currentRepository = teacherRepository;
                break;
            case 3:
                currentRepository = roomRepository;
                break;
            default:
                throw new RequestParameterException("Wrong value of the request parameter 'ver'."
                        + " Value: " + ver + ".");
        }

        Optional o = currentRepository.findById(id);
        ActivityContainer g;
        if (o.isPresent())
            g = (ActivityContainer)o.get();
        else
            throw new RequestParameterException("Wrong value of the request parameter 'id'."
                    + " Value: " + id + ".");

        List<Activity> activities = g.getActivities();
        return activities;
    }

    public Activity getActivity(int ver, int id, int slot) {
        Optional<Activity> o;
        switch (ver) {
            case 1:
                o = activityRepository.findByGroup_IdAndSlotId(id, slot);
                break;
            case 2:
                o = activityRepository.findByTeacher_IdAndSlotId(id, slot);
                break;
            case 3:
                o = activityRepository.findByRoom_IdAndSlotId(id, slot);
                break;
            default:
                throw new RequestParameterException("Wrong value of the request parameter 'ver'."
                        + " Value: " + ver + ".");
        }
        return o.orElse(null);
    }

    public QueryResultSet getAvaliable(int ver, int id, int slot) {
        List<Activity> occupied;
        switch (ver) {
            case 1:
                occupied = activityRepository.findBySlotIdAndGroup_IdNot(slot, id);
                break;
            case 2:
                occupied = activityRepository.findBySlotIdAndTeacher_IdNot(slot, id);
                break;
            case 3:
                occupied = activityRepository.findBySlotIdAndRoom_IdNot(slot, id);
                break;
            default:
                throw new RequestParameterException("Wrong value of the request parameter 'ver'."
                        + " Value: " + ver + ".");
        }

        List<Integer> occGroupIds = new ArrayList<>();
        List<Integer> occTeacherIds = new ArrayList<>();
        List<Integer> occRoomIds = new ArrayList<>();

        if (!occupied.isEmpty()) {
            for (Activity act : occupied) {
                occGroupIds.add(act.getGroup().getId());
                occTeacherIds.add(act.getTeacher().getId());
                occRoomIds.add(act.getRoom().getId());
            }
        } else {
            occGroupIds.add(-1);
            occTeacherIds.add(-1);
            occRoomIds.add(-1);
        }

        return new QueryResultSet(
                groupRepository.findByIdNotIn(occGroupIds),
                teacherRepository.findByIdNotIn(occTeacherIds),
                roomRepository.findByIdNotIn(occRoomIds),
                subjectRepository.findAll()
        );
    }

    public void save(Activity activity) {
        activityRepository.save(activity);
    }

    public void deleteById(int id) {
        activityRepository.deleteById(id);
    }

}
