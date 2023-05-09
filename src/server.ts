import app from "./app"

const PORT = process.env.PORT || 5005;

const server = app.listen(PORT, ()=> {
    console.log(`server listening on http://localhost:${PORT}`);
})