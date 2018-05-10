request = function()
   path = "/api/restaurants/" .. math.random(10000000) 
   return wrk.format(nil, path)
end
