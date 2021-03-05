package com.rafal.timetable.models;

import com.rafal.timetable.entity.data.Group;
import com.rafal.timetable.entity.data.Room;
import com.rafal.timetable.entity.data.Subject;
import com.rafal.timetable.entity.data.Teacher;

import java.util.List;

public class QueryResultSet {
    private List<Group> groups;
    private List<Teacher> teachers;
    private List<Room> rooms;
    private List<Subject> subjects;

    public QueryResultSet() {
    }

    public QueryResultSet(List<Group> groups, List<Teacher> teachers, List<Room> rooms, List<Subject> subjects) {
        this.groups = groups;
        this.rooms = rooms;
        this.teachers = teachers;
        this.subjects = subjects;
    }

    public List<Group> getGroups() {
        return groups;
    }

    public void setGroups(List<Group> groups) {
        this.groups = groups;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public List<Teacher> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<Teacher> teachers) {
        this.teachers = teachers;
    }

    public List<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<Subject> subjects) {
        this.subjects = subjects;
    }
}
