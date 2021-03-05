package com.rafal.timetable.config;

import com.rafal.timetable.entity.data.Activity;
import com.rafal.timetable.entity.data.Group;
import com.rafal.timetable.entity.data.Room;
import com.rafal.timetable.entity.data.Teacher;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Component
public class ExposeEntityIdRestConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Group.class, Room.class, Teacher.class, Activity.class);
    }
}
