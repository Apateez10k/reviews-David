request = function()
   path = "/api/restaurants/" .. math.random(10000000) 

   if math.random(100) == 1 then
     wrk.method = "POST"
     wrk.body = '{"stores_id":1,"author_name":"Spongebob Squarepants","profile_photo_url":"https://s3.amazonaws.com/uifaces/faces/twitter/scottkclark/128.jpg","rating":4,"relative_time_description":"3 days ago","text":"Check check check it out! This is an example review because it is what it is!"}'
     wrk.headers["Content-Type"] = "application/json"
   else
     wrk.method = "GET"
     wrk.body = nil
     wrk.headers["Content-Type"] = nil
   end

   return wrk.format(nil, path)
end

