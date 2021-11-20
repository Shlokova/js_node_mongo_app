const express = require('express');
const expresshb = require('express-handlebars');
const mongoos = require('mongoose');
const todosRoutes = require('./routes/todos');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();
const hbs = expresshb.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(todosRoutes);
async function start() {
    try {
        await mongoos.connect(
            'mongodb+srv://shlokova:lisa1702@cluster0.hyvfs.mongodb.net/todos',
            {
                useNewUrlParser: true,
            }
        );
        app.listen(PORT, () => {
            console.log('Server has been started...');
        });
    } catch (e) {
        console.log(e);
    }
}

start();
