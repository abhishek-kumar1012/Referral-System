To run the server : node server.js
End points :
flow:
api->users->register

api->earnings->purchase
api->earnings->report
 example:
 http://localhost:{PORT}/api/users/register
 for gettting earning details 
 example:
GET : http://localhost:{PORT}/api/earnings/{userid}/report
