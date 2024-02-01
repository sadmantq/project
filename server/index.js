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

        console.log(formInfo);

        //const {username, password, type} = formInfo;

        const {rows} = await pool.query(
            `INSERT INTO 
            LOGIN_CREDENTIALS(USERNAME,PASSWORD,TYPE)
            VALUES ($1, $2, $3) RETURNING *;`,
            [formInfo.username,formInfo.password,formInfo.type]
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
            `SELECT * 
            FROM MOVIES;`
        )
        
        // const movieList = rows.map(movie =>{
        //     const {id,name,year,image,is_adult,genre,description} = movie;
        //     return {
        //         id,
        //         name,
        //         year,
        //         image,
        //         is_adult,
        //         genre,
        //         description
        //     }
        // })
        console.log(rows);
        res.status(200).json(rows);
        
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})


//show specific movie

app.get("/movies/:id", async(req,res)=>{
    try {
        const id = req.params;

        const {rows} = await pool.query(
            `SELECT M.*, DM.DIRECTOR_NAME,PM.PRODUCER_NAME
            FROM MOVIES M JOIN DIRECTOR_MOVIE DM
            ON(M.ID = DM.MOVIE_ID)
            JOIN PRODUCER_MOVIE PM
            ON (DM.MOVIE_ID = PM.MOVIE_ID)
            WHERE M.ID = $1;            
            `,
            [id]
        )
        console.log(rows);

        const movieInfo = rows.map(movie =>{ 
            const {id,name,year,image,is_adult,genre,description,director_name,producer_name} = movie;

            return({
                id,
                name,
                year,
                image,
                is_adult,
                genre,
                description,
                director_name,
                producer_name
            })});

            console.log(movieInfo);

            res.status(200).json(movieInfo);
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
        // const userData = rows.map(item => {
        //     const {username , password, type} = rows;
        //     return {
        //         username,
        //         password,
        //         type
        //     }
        // })
        //console.log(userData);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})





app.listen(5000, ()=>{
    console.log("server has started on port 5000");
})
