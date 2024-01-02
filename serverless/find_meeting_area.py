def get_prefs(group_id):
    prefs = [
        (8, '567', '{"t2": "b", "cat": "a"}', '{"t2": "b", "subcat": "a"}', '{"20231120": ["13:00", "14:00"], "20231121": ["11:00", "16:00"]}', 43.477001, -80.538299, 0.03, '1134257095'),
        (9, '678', '{"t2": "b", "cat": "a"}', '{"t2": "b", "subcat": "a"}', '{"20231120": ["13:00", "15:00"], "20231121": ["11:00", "15:00"]}', 43.471974, -80.509794, 0.05, '1134257095'),
        (10, '123', '{"t2": "b", "cat": "a"}', '{"t2": "b", "subcat": "a"}', '{"20231120": ["13:00", "15:00"], "20231121": ["11:00", "15:00"]}', 43.432166, -80.537076, 0.2, '1134257095'),
        (11, '1223', '{"t2": "b", "cat": "a"}', '{"t2": "b", "subcat": "a"}', '{"20231120": ["13:00", "15:00"], "20231121": ["11:00", "15:00"]}', 43.4985, -80.5325, 0.08, '1134257095'),
    ]

    return prefs

def find_intersection_pts(loc1, loc2):
    # Find intersection points of two circles
    # https://stackoverflow.com/questions/3349125/circle-circle-intersection-points
    # https://math.stackexchange.com/questions/256100/how-can-i-find-the-points-at-which-two-circles-intersect
    # https://stackoverflow.com/questions/55816902/finding-the-intersection-of-two-circles

    # Get distance between centers
    d = ((loc1[0] - loc2[0]) ** 2 + (loc1[1] - loc2[1]) ** 2) ** 0.5

    # Check if circles are too far apart
    if d > loc1[2] + loc2[2]:
        return None

    # Check if circles are too close together
    if d < abs(loc1[2] - loc2[2]):
        return None

    # Check if circles are the same
    if d == 0 and loc1[2] == loc2[2]:
        return None

    # Find a and h
    a = (loc1[2] ** 2 - loc2[2] ** 2 + d ** 2) / (2 * d)
    h = (loc1[2] ** 2 - a ** 2) ** 0.5

    # Find P2
    x2 = loc1[0] + a * (loc2[0] - loc1[0]) / d
    y2 = loc1[1] + a * (loc2[1] - loc1[1]) / d

    # Find intersection points
    x3 = x2 + h * (loc2[1] - loc1[1]) / d
    y3 = y2 - h * (loc2[0] - loc1[0]) / d
    x4 = x2 - h * (loc2[1] - loc1[1]) / d
    y4 = y2 + h * (loc2[0] - loc1[0]) / d

    return [(x3, y3), (x4, y4)]

km_ratio = 111320.0 / 1000.0
def find_meeting_area(locs):
    if len(locs) <= 1:
        print("Not enough locations")
        return
    
    # Find average of all locations
    avg_lat = sum([locs[i][0] for i in range(len(locs))]) / len(locs)
    avg_lon = sum([locs[i][1] for i in range(len(locs))]) / len(locs)
    
    if len(locs) == 2:
        inter_pts = find_intersection_pts(locs[0], locs[1])
        if inter_pts is None:
            print("Locations don't overlap")
            return
        else:
            # Find average of intersection points
            avg_lat = sum([inter_pts[i][0] for i in range(len(inter_pts))]) / len(inter_pts)
            avg_lon = sum([inter_pts[i][1] for i in range(len(inter_pts))]) / len(inter_pts)

            # Find radius of intersection points
            radius = ((inter_pts[0][0] - avg_lat) ** 2 + (inter_pts[0][1] - avg_lon) ** 2) ** 0.5
            
            return (avg_lat, avg_lon, radius)

    # Find intersection points between every pair of locations
    inter_pts = []
    for i in range(len(locs)):
        for j in range(i + 1, len(locs)):
            inter_pt = find_intersection_pts(locs[i], locs[j])
            if inter_pt is not None:
                inter_pts.append(inter_pt)
    
    # Find average of circles
    avg_lat = sum([locs[i][0] for i in range(len(locs))]) / len(locs)
    avg_lon = sum([locs[i][1] for i in range(len(locs))]) / len(locs)

    # Find closest intersection points to average center for each pair of locations
    closest_pts = []
    for i in range(len(inter_pts)):
        closest_pts.append(min(inter_pts[i], key=lambda x: (x[0] - avg_lat) ** 2 + (x[1] - avg_lon) ** 2))

    # Find points that are within the radius of every location
    for i in range(len(locs)):
        for j in range(len(closest_pts)):
            if closest_pts[j] is not None:
                if ((locs[i][0] - closest_pts[j][0]) ** 2 + (locs[i][1] - closest_pts[j][1]) ** 2) ** 0.5 > locs[i][2] + 0.0001:
                    closest_pts[j] = None

    closest_pts = [closest_pts[i] for i in range(len(closest_pts)) if closest_pts[i] is not None]
    if len(closest_pts) == 0:
        print("Locations don't overlap")
        return
    
    # Find average of intersection points
    avg_lat = sum([closest_pts[i][0] for i in range(len(closest_pts))]) / len(closest_pts)
    avg_lon = sum([closest_pts[i][1] for i in range(len(closest_pts))]) / len(closest_pts)

    # Find distance from average center to closest intersection point
    radius = ((closest_pts[0][0] - avg_lat) ** 2 + (closest_pts[0][1] - avg_lon) ** 2) ** 0.5

    return (avg_lat, avg_lon, radius)

def main(args):
    # Get from db
    res = get_prefs(args['group_id'])

    # Get locations (lat, lon, radius)
    locs = [res[i][5:8] for i in range(len(res))]
    locs = [(locs[i][0], locs[i][1], (locs[i][2] / km_ratio) ** 0.5) for i in range(len(locs))]

    area = find_meeting_area(locs)
    if area is None:
        return
    
    area = (area[0], area[1], max((area[2] ** 2) * km_ratio, 0.5))
    print(area)

main({'group_id': 1})