const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//signup
app.post("/signup",async(req,res)=>{
    try {
        const formInfo = req.body;
        const username = formInfo.username;
        const password = formInfo.password;
        const type = formInfo.type;
        const nationality = formInfo.nationality;
        const gender = formInfo.gender;
        const date_of_birth = formInfo.date_of_birth;


        console.log(formInfo);

        //const {username, password, type} = formInfo;

        const {rows} = await pool.query(
            `
            INSERT INTO user_info (username, password, type, nationality, gender, date_of_birth)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;`,
            [username,password,type,nationality,gender,date_of_birth]
        )

        console.log(rows[0]);
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})



//login

app.post("/login",async(req,res)=>{
    try {
        const formInfo = req.body;
        console.log(formInfo);

        //const [username,password,type] = formInfo;

        const {rows} = await pool.query(
            `SELECT *
            FROM LOGIN_CREDENTIALS
            WHERE USERNAME = $1 AND PASSWORD = $2 AND TYPE = $3;`,
            [formInfo.username,formInfo.password,formInfo.role]
        )

        if (rows.length == 0){
            const errMsg = `user does not exist`;
            throw new Error(errMsg);
        }
        else{
            console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
        
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})

//show all movie

app.get("/movies", async(req,res)=>{
    try {
        const {rows} = await pool.query(
            `select *
            from movies m 
            join director_movie dm on (m.id = dm.movie_id)
            join director_name dn on (dm.director_id = dn. director_id)
            join producer_movie pm on (m.id = pm.movie_id)
            join producer_name pn on (pm.producer_id = pn.producer_id);`
        )
        
       
        res.status(200).json(rows);
        
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})


//show specific movie

app.get("/movies/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        
        //console.log(id)
        const {rows} = await pool.query(
            
            `select *
            from movies m 
            join director_movie dm on (m.id = dm.movie_id)
            join director_name dn on (dm.director_id = dn. director_id)
            join producer_movie pm on (m.id = pm.movie_id)
            join producer_name pn on (pm.producer_id = pn.producer_id)
            where m.id = $1;`,
            [id]
        )
        

            res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})

app.get("/director/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const {rows} = await pool.query(
            `select dm.director_id as director_id ,
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
            join director_birthdate dbb on (da.director_id = dbb.director_id)            
            where dm.director_id = $1;`,
            [id]
        )
        console.log(rows);
        if (rows.length === 0){
            const message = "no such director found";
            throw new Error(message);
        }
        else{
            res.status(200).json(rows[0]);
        }

    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})

app.get("/producer/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const {rows} = await pool.query(
            `select 
            pn.producer_id as producer_id,
            pn.producer_name as producer_name,
            pa.producer_awards as producer_awards,
            pd.producer_birthdate as producer_birthdate,
            pc.producer_country as producer_country,
            pe.producer_email as producer_email,
            pg.producer_gender as producer_gender,
            pnat.producer_nationality as producer_nationality
            from producer_name pn
            join producer_awards pa on (pn.producer_id = pa.producer_id)
            join producer_birthdate pd on (pa.producer_id = pd.producer_id)
            join producer_country pc on (pd.producer_id = pc.producer_id)
            join producer_email pe on (pc.producer_id = pe.producer_id)
            join producer_gender pg on (pe.producer_id = pg.producer_id)
            join producer_nationality pnat on (pg.producer_id = pnat.producer_id)
            where pn.producer_id = $1;`,
            [id]
        )
        console.log(rows[0]);
        if (rows.length === 0){
            const message = "no such producer found";
            throw new Error(message);
        }
        else{
            res.status(200).json(rows[0]);
        }

    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})





app.get("/users", async(req,res)=> {
    try {
        const {rows} = await pool.query(
            `SELECT * FROM LOGIN_CREDENTIALS;`
        )
        console.log(rows);
        
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})

app.get("/directors",async(req,res)=>{
    try {
        const {rows} = await pool.query(
            `select dm.director_id as director_id ,
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
            `
        )
        //console.log(rows);
        res.status(200).json(rows);

    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})

app.get("/producers",async(req,res)=>{
    try {
        const {rows} = await pool.query(
            `select 
            pn.producer_id as producer_id,
            pn.producer_name as producer_name,
            pa.producer_awards as producer_awards,
            pd.producer_birthdate as producer_birthdate,
            pc.producer_country as producer_country,
            pe.producer_email as producer_email,
            pg.producer_gender as producer_gender,
            pnat.producer_nationality as producer_nationality
            from producer_name pn
            join producer_awards pa on (pn.producer_id = pa.producer_id)
            join producer_birthdate pd on (pa.producer_id = pd.producer_id)
            join producer_country pc on (pd.producer_id = pc.producer_id)
            join producer_email pe on (pc.producer_id = pe.producer_id)
            join producer_gender pg on (pe.producer_id = pg.producer_id)
            join producer_nationality pnat on (pg.producer_id = pnat.producer_id);
            `
        )
        console.log(rows);
        res.status(200).json(rows);

    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})


app.delete("/user/:id", async(req,res)=>{
    try {
        const id = req.params;
        const {rows} =await pool.query(
            `DELETE FROM login_credentials WHERE id = $1;`,
            [id]
        )
        
        res.status(200).send("successfully deleted account");
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})


app.delete("movie/:id", async(req,res)=>{
    try {
        const id = req.params;
        const {rows} = pool.query(
            `DELETE FROM MOVIES WHERE ID = $1;`,
            [id]
        )

        res.status(200).json("the message has been deleted successfully");

    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})

app.delete("/directors/:id", async(req,res)=>{
    try 
    {

        const director_id = req.params.id;

        const {rows} = await pool.query(
            `
            DELETE FROM DIRECTOR_INFO
            WHERE
            DIRECTOR_ID = $1
            RETURNING *;
            `,
            [director_id]
        )

        if (rows.length == 0)
        {
            const errMsg = 'no such director';
            throw new Error(errMsg);
        }
        else
        {
            // console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
        
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

app.post("/like/:postid/:userid", async(req,res)=>{
    try 
    {
        const id = req.params.userid;
        const postId = req.params.postid;

        const {rows} = await pool.query(
            `INSERT INTO likes (user_id, movie_id) VALUES ($1, $2);`,
            [id,postId]
        )

        res.status(200).send("Like has been added");
    } 
    catch (err) 
    {
        console.error(err);
        res.status(400).send(err.message);
    }
})

//check if the post has been liked or not

app.get('/checkLike/:postId/:userId', async(req,res) => {
    try 
    {
        const postId = req.params.postId;
        const userId = req.params.userId;

        const {rows} = await pool.query(
            `
            SELECT *
            FROM LIKES
            WHERE 
            USER_ID = $1
            AND
            MOVIE_ID = $2;
            `,
            [userId,postId]
        )

        if (rows.length == 0)
        {
            throw new Error('not yet liked');
        }
        else
        {
            res.status(200).json(rows[0]);
        }
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

app.get('/checkDislike/:postId/:userId', async(req,res) => {
    try
    {
        const postId = req.params.postId;
        const userId = req.params.userId;

        const {rows} = await pool.query(
            `
            SELECT *
            FROM DISLIKES
            WHERE
            USER_ID = $1
            AND
            MOVIE_ID = $2;
            `,
            [userId,postId]
        )

        if (rows.length == 0)
        {
            throw new Error('no dislike');
        }
        else
        {
            res.status(200).json(rows[0]);
        }
    }
    catch (err)
    {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

//remove like from a post

app.delete("/removeLike/:postId/:userId", async(req,res)=>{
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;

        const {rows} = await pool.query(
            `DELETE FROM likes WHERE user_id = $1 AND movie_id = $2;`,
            [userId,postId]
        )

        res.status(200).send("like removed");
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

//add a dislike to a movie

app.post('/dislike/:movieId/:userId', async (req,res) => {
    try 
    {
        const movieId = req.params.movieId;
        const userId = req.params.userId;
        
        const {rows} = await pool.query(
            `
            INSERT INTO DISLIKES
            (USER_ID,MOVIE_ID)
            VALUES
            ($1,$2)
            RETURNING *;
            `,
            [userId,movieId]
        )

        if (rows.length == 0)
        {
            const errMsg = 'error inserting into dislikes';
            throw new Error(errMsg);
        }
        else
        {
            console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

//remove a dislike

app.delete('/removeDislike/:movieId/:userId', async(req,res) => {

    try 
    {
        const movieId = req.params.movieId;
        const userId = req.params.userId;

        const {rows} = await pool.query(
            
            `
            DELETE FROM DISLIKES
            WHERE
            USER_ID = $1
            AND
            MOVIE_ID = $2
            RETURNING *;
            `,
            [userId,movieId]
        )

        if (rows.length == 0)
        {
            const errMsg = 'error deleting';
            throw new Error(errMsg);
        }
        else
        {
            //console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
    } 
    catch (err) 
    {
       console.error(err.message);
       res.status(400).send(err.message); 
    }

})

//count the number of likes a movie has

app.get('/numberOfLikes/:movieId', async (req,res) => {

    try 
    {
        const movieId = req.params.movieId;

        const {rows} = await pool.query(
            `
            SELECT COUNT(*) AS like_num
            FROM LIKES
            WHERE
            MOVIE_ID = $1;
            `,
            [movieId]
        )

        if (rows.length == 0)
        {
            const errMsg = 'no result found';
            throw new Error(errMsg);
        }
        else
        {
            console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
    }
    catch (err) 
    {
        console.error(err.message);
        res.status(400).send(err.message);    
    }
})

app.get("/movieSpecific/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const {rows} = await pool.query(
            `
            SELECT M.*, DM.director_id, DM.director_name,PM.producer_id,PM.producer_name,GM.genre_id, GM.genre_name 
            FROM movies M 
            JOIN director_movie DM on M.id = DM.movie_id
            JOIN producer_movie PM on DM.movie_id = PM.movie_id
            JOIN genre_movie GM on PM.movie_id = GM.movie_id
            ;`,
            [id]
        )

        if (rows.length == 0){
            const message = 'no such movie found';
            throw  new Error(message); 
        }
        else{
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})


app.get('/movies/reviews/:movieId', async(req,res)=>{

    try 
    {
        const movieId = req.params.movieId;
        const {rows} = await pool.query(
            `select * from review where movie_id = $1;`,
            [movieId]
        )
        if (rows.length == 0)
        {
            throw new Error("No data found");
        } 
        else
        {
            console.log(rows);
            res.status(200).json(rows);
        }

    } 
    catch (err) 
    {
        console.error(err);
        res.status(400).send(err.message);
    }
})

app.post('/movies/reviewPost', async(req,res)=>{
    try {

        const movieId = req.body.movieId;
        const userId = req.body.userId;
        
        const review = req.body.review;

        const {rows} = await pool.query(
            `insert into review(movie_id,user_id,review_statement) values
            ($1, $2, $3)
            returning *;
            `,
            [movieId,userId,review]
        )
        
        
        res.status(200).send("Has been recorded successfully");

    } catch (err) {

        console.error(err.message);
        res.status(400).send(err.message);
    }
})

app.delete('/movies/deleteReviewPost', async(req,res)=>{
    try {
        const movieId = req.body.movieId;
        const userId = req.body.userId;

        const {rows} = await pool.query(
            `
            DELETE FROM REVIEW
            WHERE MOVIE_ID = $1
            AND USER_ID = $2
            RETURNING *;
            `,
            [movieId,userId]
        )
        
        if (rows.length == 0){
            throw new Error('No review to delete');
        }
        else{
            res.status(200).json(rows[0]);
        }

    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

//fetching the rating

app.get("/:movieId/getRating", async(req,res)=>{
    try {
        const movieId = req.params.movieId;

        const {rows} = await pool.query(
            `select calculate_average_rating($1);`,
            [movieId]
        )
        
        if (rows.length == 0){
            throw new Error('No rating found');
        }
        else{
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

//user gives rating

app.post('/:movieId/:userId/rate',async(req,res)=>{
    try {
        const movieId = req.params.movieId;
        const userId = req.params.userId;

        const rated = req.body.rated;

        const {rows} = await pool.query(
            `
            INSERT INTO RATING(USER_ID,MOVIE_ID,RATED)
            VALUES ($1,$2,$3)
            RETURNING *;
            `,
            [userId,movieId,rated]
        )

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

//user deletes his rating

app.delete('/:movieId/:userId/deleteRating', async(req,res)=>{
    try {
        const movieId = req.params.movieId;
        const userId = req.params.userId;

        const {rows} = await pool.query(
            `
            DELETE FROM RATING
            WHERE USER_ID = $1
            AND MOVIE_ID = $2
            RETURNING *;
            `,
            [userId,movieId]
        )

        if (rows.length == 0){
            throw new Error('No rating to delete');
        }
        else{
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

//user changes his review of a movie

app.post('/:movieId/:userId/updateReview',async(req,res)=>{
    try 
    {
        const movieId = req.params.movieId;
        const userId = req.params.userId;

        const newReview = req.body.newReview;

        const {rows} = await pool.query(
            `
            UPDATE review
            SET review_statement = $1
            WHERE movie_id = $2
            AND user_id = $3
            RETURNING *;
            `,
            [newReview,movieId,userId]
        )

        if (rows.length == 0)
        {
            throw new Error('No such row found to update');
        }
        else
        {
            res.status(200).json(rows[0]);
        }
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

//adding to watchlist

app.post("/addToWatchlist/:movieId/:userId", async(req,res)=>{
    try 
    {
        const movieId = req.params.movieId;
        const userId = req.params.userId;

        const {rows} = await pool.query(
            `
                INSERT INTO  WATCHLIST 
                (USER_ID,MOVIE_ID)
                VALUES
                ($1,$2)
                RETURNING *;  
            `,
            [userId,movieId]
        )

        if (rows.length == 0)
        {
            const errMsg = 'error inserting the data into watchlist';
            throw new Error(errMsg);
        }
        else
        {
            //console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
    } 
    catch (err) 
    {
        console.error(err);
        res.status(400).send(err.message);
    }
})

//check if its in watchliist

app.get('/checkWatchlist/:movieId/:userId', async (req,res) => {
    try
    {
        const movieId = req.params.movieId;
        const userId = req.params.userId;

        const {rows} = await pool.query(
            `
            SELECT *
            FROM WATCHLIST
            WHERE
            MOVIE_ID = $1 
            AND
            USER_ID = $2;
            `,
            [movieId,userId]
        )

        if (rows.length == 0)
        {
            throw new Error('not added');
        }
        else
        {
            res.status(200).json(rows[0]);
        }
    }
    catch(err)
    {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

//removing from watchlist

app.delete("/removeFromWatchlist/:userId/:movieId", async (req,res)=> {
    try 
    {
        const userId = req.params.userId;
        const movieId = req.params.movieId;

        

        const {rows} = await pool.query(
            `
            DELETE FROM WATCHLIST
            WHERE
            USER_ID = $1 
            AND
            MOVIE_ID = $2
            RETURNING *;
            `,
            [userId,movieId]
        )

        if (rows.length == 0)
        {
            const errMsg = 'could not delete the values from watchlist';
            throw new Error(errMsg);
        }
        else
        {
            console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(400).send(err.message);    
    }
})

//fetch the watchlist of a user


app.get("/fetchUserWatchlist/:userId", async (req,res) => {
    try 
    {
        const userId = req.params.userId;
        
        const {rows} = await pool.query(
            `
            SELECT M.*
            FROM WATCHLIST W JOIN MOVIES M
            ON
            (W.MOVIE_ID = M.ID)
            WHERE
            W.USER_ID = $1;
            `,
            [userId]
        )

        const len = rows.length;

        if(len == 0)
        {
            const errMsg = 'not_found';
            throw new Error(errMsg);
        }
        else
        {
            //console.log(rows);
            res.status(200).json(rows);
        }
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(400).send(err.message);    
    }
})

//used a function to get the number of users that have this movie in their watchlist

app.get("/numberOfUsersWatchlist/:movieId", async (req,res) => {
    try 
    {
        const movieId = req.params.movieId;

        const {rows} = await pool.query(
            `
            select get_favorite_users_count($1) as watchlist_num;
            `,
            [movieId]
        )

        if ( rows.length > 1 )
        {
            const errMsg = 'too_many_values';
            throw new Error(errMsg);
        }
        else
        {
            console.log(rows);
            res.status(200).json(rows);
        }
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(400).send(err.message);    
    }
})

//add to favourites

app.post('/addToFavourites/:movieId/:userId', async (req,res) => {
    
    try 
    {
        const movieId = req.params.movieId;
        const userId = req.params.userId;
        
        const {rows} = await pool.query(
            `
            INSERT INTO FAVOURITES
            (MOVIE_ID, USER_ID)
            VALUES
            ($1,$2)
            RETURNING *;
            `,
            [movieId,userId]
        )

        if (rows.length == 0)
        {
            const errMsg = 'insertion not possible';
            throw new Error(errMsg);
        }
        else
        {
            //console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(400).send(err.message);    
    }
})

//remove from favourites

app.delete('/removeFromFavourites/:movieId/:userId', async (req,res) => {

    try 
    {
        const movieId = req.params.movieId;
        const userId = req.params.userId;

        const {rows} = await pool.query(
            `
            DELETE FROM FAVOURITES
            WHERE
            MOVIE_ID = $1
            AND
            USER_ID = $2
            RETURNING *;
            `,
            [movieId,userId]
        )

        if (rows.length == 0)
        {
            const errMsg = 'could not delete';
            throw new Error(errMsg);
        }
        else
        {
            //console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
    } 
    catch (err)
    {
        console.error(err.message);
        res.status(400).send(err.message);    
    }

})


//number of users that made this their favourite
app.get("/noOfusersFavourite/:movieId", async(req,res) => {
    
    try 
    {
        const movieId = req.params.movieId;
        
        const {rows} = await pool.query(
            `
            SELECT COUNT(*)
            FROM FAVOURITES
            WHERE
            MOVIE_ID = $1;
            `,
            [movieId]
        )

        if (rows.length == 0)
        {
            const errMsg = 'not able to fetch';
            throw new Error(errMsg);
        }
        else
        {
            //console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(400).send(err.message);    
    }
})

//implement search

app.get('/Search/movieName/:name', async (req,res) => {

    try 
    {
        const search = req.params.name;

        console.log(search);
        
        const {rows} = await pool.query(
            `
            SELECT *
            FROM MOVIES
            WHERE 
            NAME ILIKE  $1;
            `,
            [`%${search}%`]
        )

        //console.log(rows);

        res.status(200).json(rows);
    } 
    catch (err)
    {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

app.get('/Search/:genre', async (req,res) => {

    try 
    {
        const search = req.params.genre;

        const {rows} = await pool.query(
            `
            SELECT *
            FROM MOVIES
            WHERE
            GENRE ILIKE $1;
            `,
            [`%${search}%`]
        )

        res.status(200).json(rows);
    } 
    catch (err) 
    {
       console.error(err.message);
       res.status(400).send(err.message); 
    }
})

//get trailer

app.get('/getTrailer/:movieId', async(req,res) => {
    try
    {
        const movieId = req.params.movieId;

        const {rows} = await pool.query(
            `
            SELECT MOVIE_TRAILER
            FROM TRAILERS
            WHERE 
            MOVIE_ID = $1;
            `,
            [movieId]
        )

        if (rows.length == 0)
        {
            throw new Error('No trailer available');
        }
        else
        {
            res.status(200).json(rows[0]);
        }
    }
    catch(err)
    {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

//add trailer to database

app.post('/admin/addTrailer/:movie_id/:movie_trailer', async (req,res) => {
    try
    {
        const movie_id = req.params.movie_id;
        const movie_trailer = req.params.movie_trailer;

        const {rows} = await pool.query(
            `
            INSERT INTO
            TRAILERS
            (MOVIE_ID, MOVIE_TRAILER)
            VALUES
            ($1, $2)
            RETURNING *;
            `,
            [movie_id,movie_trailer]
        )

        if (rows.length == 0)
        {
            const errMsg = 'insert failed';
            throw new Error(errMsg);
        }
        else
        {
            res.status(200).json(rows[0]);
        }
    }
    catch(err)
    {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})


//add a movie to the database and add a trailer

app.post('/admin/addMovie', async (req,res)=> {
    try
    {
        const name = req.body.name;
        const year = req.body.year;
        const image = req.body.image;
        const genre = req.body.genre;
        const description = req.body.description;
        const isAdult = req.body.isAdult;

        const {rows} = await pool.query(
            `
            INSERT INTO 
            MOVIES
            (NAME, YEAR, IMAGE, IS_ADULT, GENRE, DESCRIPTION)
            VALUES
            ($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `,
            [name,year,image,isAdult,genre,description]
        )

        if (rows.length == 0)
        {
            const errMsg = 'invalid insert';
            throw new Error(errMsg);
        }
        else
        {
            res.status(200).json(rows[0]);
        }
    }
    catch(err)
    {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})

//get number of dislikes 

app.get('/getDislikesss/:movieId', async(req,res)=> {

    try
    {
        const movieId = req.params.movieId;
        //console.log(movieId);

        const {rows} = await pool.query(
            `
            SELECT get_dislikes_count($1) AS dislikenum;
            `,
            [movieId]
        )
        
        if (rows.length == 0)
        {
            throw new Error("invalid")
        }
        else{

            console.log(rows[0]);
            res.status(200).json(rows[0]);
        }
    }
    catch(err)
    {
        console.error(err.message);
        res.status(400).send(err.message);
    }
})



//add movies to cloud and fetch and show to premium members





app.listen(5000, ()=>{
    console.log("server has started on port 5000");
})
