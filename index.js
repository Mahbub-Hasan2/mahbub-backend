const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose').set('strictQuery', true);;
const cors = require('cors');
const key = require('./config/keys.js');
const dotenv = require('dotenv');
const projectsRouter = require('./routes/projects.js');
const adminRouter = require('./routes/admin.js');
// const mostSellRouter = require('./routes/mostSell.js');
// const ordersRouter = require('./routes/orders.js');
// const couponRouter = require('./routes/coupon.js');
// const slidersRouter = require('./routes/sliders.js');
// const sslRoute = require('./routes/sslRoute.js');

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors({
  origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://localhost:5173',
      'http://mahbubdev1.vercel.app',
      'https://mahbubdev1.vercel.app',
      'http://mahbubdev2.vercel.app',
      'https://mahbubdev2.vercel.app',
  ],
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,PATCH',
}));

app.get('/', (req, res) => {
  res.send('Hello Mahbub I Love You 🥰');
});

app.use("/admin", adminRouter);
app.use("/projects", projectsRouter);
// app.use("/mostSelling", mostSellRouter);
// app.use("/orders", ordersRouter);
// app.use("/coupons", couponRouter);
// app.use("/sliders", slidersRouter);


const port = process.env.PORT || 5000


mongoose.connect(key.mongoURI)
  .then(() => app.listen(port, () => console.log(`Server started at port ${port}...`)))
  .catch(err => console.log(err))


  // require('crypto').randomBytes(64).toString('hex')