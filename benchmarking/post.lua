wrk.method = "POST"
wrk.body = '{"stores_id":1,"author_name":"Spongebob Squarepants","profile_photo_url":"https://s3.amazonaws.com/uifaces/faces/twitter/scottkclark/128.jpg","rating":4,"relative_time_description":"3 days ago","text":"Check check check it out! This is an example review because it is what it is!"}'
wrk.headers["Content-Type"] = "application/json"

request = function()
   path = "/api/restaurants/" .. math.random(10000000) 
   return wrk.format(nil, path)
end

