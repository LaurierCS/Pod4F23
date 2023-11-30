import os
import mysql.connector
import json

from collections import Counter
from datetime import datetime

import googlemaps
# import dotenv

# dotenv.load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

km_ratio = 111320.0 / 1000.0

def main(args):
              
    group_id = int(args['group_id'])
    
    db = mysql.connector.connect(user = DB_USER, 
                                password = DB_PASS, 
                                database='optimeet', 
                                host = DB_HOST, 
                                port = DB_PORT)	

    cursor = db.cursor()
    cursor.execute("SELECT * FROM groups_preferences WHERE group_id_id=%s", (group_id,))
    res = cursor.fetchall()
    
    date = overlapping_times(res)
    
    try:
        avg_lat, avg_lon, radius = find_meeting_area(res)
        radius = max((radius ** 2) * km_ratio, 0.5)
        
        radius = 3
    
    except TypeError: pass
    
    
    recommended_places = find_places(date, res, avg_lat, avg_lon, radius)
    
    sql_insert = f"INSERT INTO groups_recommendations (activity_id, place_name, place_url, times, loc_lat, loc_long, group_id_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    sql_remove = f"DELETE FROM groups_recommendations WHERE group_id_id = {group_id} "
    
    cursor.execute(sql_remove)

    for place in recommended_places:
        cursor.execute(sql_insert, (recommended_places[place]['activity_id'], 
                                    recommended_places[place]['name'], 
                                    recommended_places[place]['maps_url'], 
                                    json.dumps(recommended_places[place]['times']), 
                                    recommended_places[place]['lat'],
                                    recommended_places[place]['lon'],
                                    group_id))
        
    db.commit()
    cursor.close()
    
    return recommended_places

def overlapping_times(preferences):
	
	times_list = []
	key_count = {}
	times = {}
	val_count = {}
	date = []
	temp = ''

	for x in range(len(preferences)):
		times_list.append(json.loads((preferences[x][3])))

	if len(times_list) <= 1:
		return {"body": [date]}

	for x in times_list:
		for key in x.keys():
			key_count[key] = key_count.get(key, 0) + 1

	repeated_keys = [key for key, count in key_count.items() if count > 1]

	for key in repeated_keys:
		for items in times_list:
			
			if key in items.keys():
				if key not in times:
					times[key] = items[key]
				else: 
						times[key].extend(items[key])
						
	for key, val in times.items():
		val_count = Counter(val)
		repeated_val = [value for value, count in val_count.items() if count > 1]
		times[key] = repeated_val

	for key, val in times.items():
		for item in val:
            
			temp = key + item
            
			date.append(f"{datetime.strptime(temp, '%Y%m%d%H:%M')}")
        
	return date

def find_places(date, preferences, avg_lat, avg_lon, radius):
      
    gmaps = googlemaps.Client(key="AIzaSyABQ4Pci5rnkud1UShQlNtU7iGG7waWghU")
    
    ac_list = []
    recommended_places = {}
    ac_list = []
    open_hours = ''
    close_hours = ''
      
      
    #   preferences = [
    #     (8, '567', ["cafe", "movie_theater", "restaurant"], '{"t2": "b", "subcat": "a"}', '{"20231120": ["13:00", "14:00"], "20231121": ["11:00", "16:00"]}', 43.477001, -80.538299, 0.03, '1134257095'),
    #     (9, '678', ["cafe", "movie_theater"], '{"t2": "b", "subcat": "a"}', '{"20231120": ["13:00", "15:00"], "20231121": ["11:00", "15:00"]}', 43.471974, -80.509794, 0.05, '1134257095'),
    #     (10, '123', ["cafe",  "restaurant"], '{"t2": "b", "subcat": "a"}', '{"20231120": ["13:00", "15:00"], "20231121": ["11:00", "15:00"]}', 43.432166, -80.537076, 0.2, '1134257095'),
    #     (11, '1223', ["cafe", "movie_theater"], '{"t2": "b", "subcat": "a"}', '{"20231120": ["13:00", "15:00"], "20231121": ["11:00", "15:00"]}', 43.4985, -80.5325, 0.08, '1134257095'),
    #   ]
      
      
    for x in range(len(preferences)):
        for item in json.loads(preferences[x][2]):
            ac_list.append(item)


    unique_elements = list(set(ac_list))

    element_counts = Counter(ac_list)

    unique_ac_sorted = sorted(unique_elements, key=lambda x: element_counts[x], reverse=True)

    
    for val in unique_ac_sorted:
        
        places = gmaps.places_nearby(location=(avg_lat, avg_lon), radius=radius*1000, type=val)['results']
        places = places[0:10]
        
        try:
            if len(places) > 0:
                for item in places: 
                    place = gmaps.place(place_id=item['place_id'])['result']
                    open_time = place['opening_hours']['periods']

                    for x in date:
                            
                        date_split = x.split(' ')[0]
                        date_split = date_split.split('-')
                        
                        time = x.split(' ')[1]
                        time = time.split(":")
                        time = time[0] + time[1]
                        
                        intDay = datetime(year=int(date_split[0]), 
                                            month=int(date_split[1]), 
                                            day=int(date_split[2])).date().weekday()

                        if intDay < 6: intDay += 1
                        else: intDay = 0
                            
                        for period in open_time:
                                
                            if period['open']['day'] == intDay:
                                open_hours = period['open']['time']
                                close_hours = period['close']['time']

                                
                            if time >= open_hours and time <= close_hours:
                                
                                open_hours = ''
                                close_hours = ''
                                
                                if place['name'] not in recommended_places:
                                    recommended_places[place['name']] = {
                                        "activity_id": val,
                                        "name": place['name'],
                                        "maps_url": place['url'], 
                                        "times": [x],
                                        "lat": place['geometry']['location']['lat'],
                                        
                                        "lon": place['geometry']['location']['lng']
                                        #"address": place['formatted_address']
                                    }
                                else:
                                    if x not in recommended_places[place['name']]['times']:
                                        
                                        recommended_places[place['name']]['times'].append(x)      
                                
                                # if x not in recommended_places:
                                #       recommended_places[x] = [{
                                #       "place_id": place['place_id'],
                                #       "name": place['name'],
                                #       "maps_url": place['url'], 
                                #       #"address": place['formatted_address']
                                #       }]

                                # else:                           
                                #       if all(rec_place['name'] != place['name'] for rec_place in recommended_places.get(x)) and len(recommended_places[x]) < 10:
                                #             recommended_places[x].append({
                                #                   "place_id": place['place_id'],
                                #                   "name": place['name'],
                                #                   "maps_url": place['url'], 
                                #                   #"address": place['formatted_address']
                                #                   })
        except KeyError: pass
        

            
    return recommended_places

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

def find_meeting_area(res):
    
    locs = [res[i][4:7] for i in range(len(res))]
    locs = [(locs[i][0], locs[i][1], (float(locs[i][2]) / km_ratio) ** 0.5) for i in range(len(locs))]  

    # locs = [
    # (42.82182858620692, -80.40036796551725, 5), 
    # (43.451384, -80.513597, 5),
    # (43.444951, -80.516802, 5), 
    # (43.454969, -80.529604, 5)] 
      
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

    return avg_lat, avg_lon, radius


# main({"group_id": 4509046376})

# gmaps = googlemaps.Client(key="AIzaSyABQ4Pci5rnkud1UShQlNtU7iGG7waWghU")
# places = gmaps.places_nearby(location=(43.454969, -80.529604), radius=5*1000, type="cafe")['results']
# place = gmaps.place(place_id=places[0]['place_id'])['result']
# print(place['geometry']['location']['lat'])