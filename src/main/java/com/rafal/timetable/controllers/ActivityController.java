package com.rafal.timetable.controllers;

import com.rafal.timetable.entity.data.Activity;
import com.rafal.timetable.entity.data.Group;
import com.rafal.timetable.models.QueryResultSet;
import com.rafal.timetable.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping()
    public List<Activity> getActivities(@RequestParam int ver, @RequestParam int id) {
        return activityService.getActivities(ver, id);
    }

    @GetMapping("/{ver}")
    public Activity getActivity(@PathVariable int ver, @RequestParam int id, @RequestParam int slot) {
        return activityService.getActivity(ver, id, slot);
    }

    @GetMapping("/available")
    public QueryResultSet getAvailable(@RequestParam int ver, @RequestParam int id, @RequestParam int slot) {
        return activityService.getAvaliable(ver, id, slot);
    }

    @PostMapping()
    @PreAuthorize("hasRole('USER')")
    public Activity saveActivity(@RequestBody Activity activity) {
        activity.setId(0);
        activityService.save(activity);

        return activity;
    }

    @PutMapping()
    @PreAuthorize("hasRole('USER')")
    public Activity updateActivity(@RequestBody Activity activity) {
        activityService.save(activity);

        return activity;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public int deleteActivity(@PathVariable int id) {
        activityService.deleteById(id);
        return id;
    }
}
