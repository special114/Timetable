export const Days = ['mon', 'tue', 'wed', 'thu', 'fri'];
export const Hours = [ "8:00-8:45", "8:55-9:40", "9:50-10:35",
    "10:55-11:40", "11:50-12:35", "12:45-13:30",
    "13:35-14:20", "14:25-15:10"
]
export const COLS = 5;
export const ROWS = 8;

export const getDicts = (ver) => {
    let dictBasic, dict1, dict2;
    switch (ver) {
        case 1:
            dictBasic = "group";
            dict1 = "teacher";
            dict2 = "room";
            break;
        case 2:
            dictBasic = "teacher";
            dict1 = "room";
            dict2 = "group";
            break;
        case 3:
            dictBasic = "room";
            dict1 = "group";
            dict2 = "teacher";
            break;
    }

    return { dictBasic, dict1, dict2 }
}