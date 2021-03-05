package com.rafal.timetable;

public class ActivityResponse {
    private String dict1;
    private String dict2;
    private String dict3;
    private int slot;

    public ActivityResponse() {
    }

    public ActivityResponse(String dict1, String dict2, String dict3, int slot) {
        this.dict1 = dict1;
        this.dict2 = dict2;
        this.dict3 = dict3;
        this.slot = slot;
    }

    public String getDict1() {
        return dict1;
    }

    public void setDict1(String dict1) {
        this.dict1 = dict1;
    }

    public String getDict2() {
        return dict2;
    }

    public void setDict2(String dict2) {
        this.dict2 = dict2;
    }

    public String getDict3() {
        return dict3;
    }

    public void setDict3(String dict3) {
        this.dict3 = dict3;
    }

    public int getSlot() {
        return slot;
    }

    public void setSlot(int slot) {
        this.slot = slot;
    }
}
