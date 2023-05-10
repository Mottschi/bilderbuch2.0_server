import app from './app';

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
