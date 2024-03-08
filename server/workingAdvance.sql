select dm.director_id as director_id ,
dm.director_name as director_name, 
de.director_email as director_email, 
dc.director_country as director_country, 
dn.director_nationality as director_nationality, 
dg.director_gender as director_gender, 
da.director_awards as director_awards,
dbb.director_birthdate as director_birthdate
from director_name dm
join director_email de on (dm.director_id = de.director_id)
join director_country dc on (de.director_id = dc.director_id)
join director_nationality dn on (dc.director_id = dn.director_id)
join director_gender dg on (dn.director_id = dg.director_id)
join director_awards da on (dg.director_id = da.director_id)
join director_birthdate dbb on (da.director_id = dbb.director_id);



